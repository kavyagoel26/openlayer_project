import { useRef, useEffect } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Draw from "ol/interaction/Draw";
import "./../App.css"; 


const MapComponent = ({ setWaypoints, isDrawing, setIsDrawing }) => {
    const mapRef = useRef(null);
    const drawRef = useRef(null);
    const mapInstance = useRef(null);

  
    useEffect(() => {
      // Initialize the map
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
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
  
    useEffect(() => {
      const map = mapInstance.current;
  
      if (isDrawing && map) {
        if (drawRef.current) {
          map.removeInteraction(drawRef.current); // Remove existing interaction
        }
  
        // Add a new Draw interaction
        const draw = new Draw({
             type: 'LineString' });
        map.addInteraction(draw);
        drawRef.current = draw;

        draw.on("drawmove", (event) =>{
            const coordinates = event.feature.getGeometry().getCoordinates();
            setWaypoints(coordinates);//update waypoints as the line is being drawn
        })
  
        // Capture coordinates on draw end
        draw.on("drawend", (event) => {
          const coordinates = event.feature.getGeometry().getCoordinates();
          console.log("Coordinates:", coordinates);
          setWaypoints((prev) => [...prev, ...coordinates]);
          setIsDrawing(false); // Disable drawing after the line is drawn
        });
      } else if (map && drawRef.current) {
        map.removeInteraction(drawRef.current); // Remove interaction if drawing is disabled
      }
    }, [isDrawing, setWaypoints, setIsDrawing]);
    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === "Enter") {
            setIsDrawing(false); // Disable drawing when Enter is pressed
          }
        };
      
        window.addEventListener("keydown", handleKeyDown);
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, [setIsDrawing]);
  
    return (
      <div
        ref={mapRef}
        className="map-container"
        style={{ width: "100%", height: "500px", overflow: "hidden" }}
      ></div>
      




    );
  };

export default MapComponent;
