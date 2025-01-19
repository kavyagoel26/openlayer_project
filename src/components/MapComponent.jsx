import { useRef, useEffect } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import Draw from "ol/interaction/Draw";
import { Style, Stroke, Fill } from "ol/style";
import "./../App.css";

const MapComponent = ({
  setWaypoints,
  isDrawing,
  setIsDrawing,
  drawType,
  setPolygonCoordinates,
}) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const vectorSourceRef = useRef(new VectorSource());
  const drawRef = useRef(null);

  // Initialize the map
  useEffect(() => {
    const vectorLayer = new VectorLayer({
      source: vectorSourceRef.current,
      style: new Style({
        stroke: new Stroke({ color: "#0000FF", width: 2 }),
        fill: new Fill({ color: "rgba(0, 0, 255, 0.1)" }),
      }),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        vectorLayer,
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    mapInstance.current = map;

    return () => {
      map.setTarget(null); // Cleanup on unmount
    };
  }, []);

  // Handle drawing interactions
  useEffect(() => {
    const map = mapInstance.current;

    if (isDrawing && map) {
      if (drawRef.current) {
        map.removeInteraction(drawRef.current); // Remove existing interaction
      }

      const draw = new Draw({
        source: vectorSourceRef.current,
        type: drawType,
      });

      map.addInteraction(draw);
      drawRef.current = draw;

      // Handle drawend event
      draw.on("drawend", (event) => {
        const coordinates = event.feature.getGeometry().getCoordinates();

        if (drawType === "LineString") {
          setWaypoints((prev) => [...prev, ...coordinates]);
        } else if (drawType === "Polygon") {
          setPolygonCoordinates(coordinates[0]); // Store only the perimeter for polygons
        }

        setIsDrawing(false); // Exit drawing mode after completion
      });

      // Handle Enter key for drawing completion
      const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          draw.finishDrawing(); // Manually trigger drawing completion
          setIsDrawing(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isDrawing, drawType, setWaypoints, setPolygonCoordinates]);

  return (
    <div
      ref={mapRef}
      className="map-container"
      style={{ width: "100%", height: "500px", overflow: "hidden" }}
    ></div>
  );
};

export default MapComponent;