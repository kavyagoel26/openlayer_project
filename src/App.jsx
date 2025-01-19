import { useState } from "react";
import "./App.css";
import MapComponent from "./components/MapComponent";
import MissionModal from "./components/MissionModal";
import PolygonModal from "./components/PolygonModal";

function App() {
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);
  const [isPolygonModalOpen, setIsPolygonModalOpen] = useState(false);
  const [waypoints, setWaypoints] = useState([]); // Waypoints for LineString
  const [polygonCoordinates, setPolygonCoordinates] = useState([]); // Coordinates for Polygon
  const [isDrawing, setIsDrawing] = useState(false); // Drawing mode state
  const [drawType, setDrawType] = useState("LineString"); // Current draw type
  const [polygonInsertionIndex, setPolygonInsertionIndex] = useState(null); // Track where the polygon is inserted

  // Open Mission Modal and start LineString drawing
  const handleDrawClick = () => {
    setIsMissionModalOpen(true);
  };

  // Close Mission Modal and start LineString drawing
  const handleMissionModalClose = () => {
    setIsMissionModalOpen(false); // Close modal
    setIsDrawing(true);          // Enable drawing mode
    setDrawType("LineString");   // Set drawing type to LineString
  };

  // Open Polygon Modal and start Polygon drawing
  const handleInsertPolygon = (index) => {
    setPolygonInsertionIndex(index); // Track where the polygon is inserted
    setIsPolygonModalOpen(true);    // Open Polygon Modal
    setIsDrawing(true);             // Enable drawing mode
    setDrawType("Polygon");         // Set drawing type to Polygon
  };

  // Import Polygon into LineString and connect them
  const handlePolygonImport = () => {
    if (polygonInsertionIndex !== null) {
      setWaypoints((prev) => {
        const newWaypoints = [...prev];
        const polygonStartPoint = polygonCoordinates[0];

        // Insert the polygon's starting point at the insertion index
        newWaypoints.splice(polygonInsertionIndex + 1, 0, polygonStartPoint);

        // Add the rest of the polygon points
        newWaypoints.splice(
          polygonInsertionIndex + 2,
          0,
          ...polygonCoordinates.slice(1)
        );

        return newWaypoints;
      });
    }

    setPolygonCoordinates([]);     // Clear polygon coordinates
    setIsPolygonModalOpen(false);  // Close Polygon Modal
    setIsDrawing(false);           // Disable drawing mode
    setPolygonInsertionIndex(null); // Reset insertion index
  };

  return (
    <>
      <h1>OpenLayers Map Application</h1>
      <button
        onClick={handleDrawClick}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 mt-4"
      >
        Draw
      </button>

      {/* Map Component */}
      <MapComponent
        setWaypoints={setWaypoints}
        isDrawing={isDrawing}
        setIsDrawing={setIsDrawing}
        drawType={drawType}
        setPolygonCoordinates={setPolygonCoordinates}
      />

      {/* Mission Modal */}
      <MissionModal
        isOpen={isMissionModalOpen}
        onClose={handleMissionModalClose}
        waypoints={waypoints}
        setWaypoints={setWaypoints}
        onInsertPolygon={handleInsertPolygon}
      />

      {/* Polygon Modal */}
      <PolygonModal
        isOpen={isPolygonModalOpen}
        onClose={() => {
          setIsPolygonModalOpen(false);
          setIsDrawing(false); // Disable drawing mode if the user cancels
        }}
        polygonCoordinates={polygonCoordinates}
        onImportPoints={handlePolygonImport}
      />
    </>
  );
}

export default App;