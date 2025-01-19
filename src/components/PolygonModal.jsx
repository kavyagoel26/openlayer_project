import Modal from "react-modal";

const PolygonModal = ({ isOpen, onClose, polygonCoordinates, onImportPoints }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="polygon-modal">

    <div className=" w-full h-18 border-b-2 border-slate-200 shadow-sm flex justify-between items-center">
    <div className="flex item-center justify-start">
    <i className ="ri-arrow-left-line"></i>
    <h5 className="text-xl font-semibold text-gray-800 mb-4">
       Mission Planner</h5>
    </div>
      
      
      <h2>Polygon Tool</h2>
  </div>
      {polygonCoordinates.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300 text-left text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">WP</th>
              <th className="border border-gray-300 px-4 py-2">Coordinates</th>
              <th className="border border-gray-300 px-4 py-2">Distance (m)</th>
            </tr>
          </thead>
          <tbody>
            {polygonCoordinates.map((coord, idx) => {
              const distance = idx < polygonCoordinates.length - 1
                ? getLength(new LineString([coord, polygonCoordinates[idx + 1]]))
                : getLength(new LineString([coord, polygonCoordinates[0]])); // Last to first point distance
              return (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{idx + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{coord.join(", ")}</td>
                  <td className="border border-gray-300 px-4 py-2">{distance.toFixed(2)} m</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="w-full h-18 bg-gray-200 border-2 border-slate-300 border-dashed">
      <p className="text-sm text-center text-gray-700 m-2.5">
        {" "}
        Click on the map to mark points of the polygon's perimeter, then press{" "}
        <i className="ri-corner-down-left-line"></i> to close and complete the polygon.
      </p>
      </div>
      )}

      {/* <p className="text-sm text-gray-600 mt-2">Total Distance: {polygonDistance.toFixed(2)} meters</p> */}

      <div className="flex items-center justify-between w-full h-18 border-t-2 border-slate-200 shadow-sm mt-6">
      <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
          Discard
        </button>
        <button onClick={onImportPoints} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          Import Points
        </button>
        
      </div>
    </Modal>
  );
};

export default PolygonModal;