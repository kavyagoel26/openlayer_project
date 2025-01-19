import { useState } from "react";
import "./App.css";
import MapComponent from "./components/MapComponent";
import MissionModal from "./components/MissionModal.jsx";


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [waypoints, setWaypoints] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
 
const handleDrawClick =() =>{
  setIsModalOpen(true);
  setIsDrawing(true);
};

  return (
    <>
      <h1>OpenLayer Map Application</h1>
      <button onClick={handleDrawClick} className="bg-green-500 hover:bg-green-600 text-white
      font-semibold px-6 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 
      focus:ring-green-400 mt-4">Draw</button>

      <MapComponent
       setWaypoints={setWaypoints}
       isDrawing={isDrawing}
        setIsDrawing ={setIsDrawing}
       />
      <MissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        waypoints={waypoints}
        isDrawing={isDrawing}
      />
    </>
  );
}

export default App;
