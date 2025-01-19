import Modal from "react-modal";

const PolygonModal = ({ isOpen, onClose, polygonCoordinates, onImportPoints }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white shadow-xl rounded-lg w-2/5 mx-auto relative"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="w-full h-18 border-b-2 border-slate-200 shadow-sm flex justify-between items-center">
        <h2 className="text-lg font-semibold pb-2 text-gray-800">Polygon Tool</h2>
        <div className="flex justify-end hover:bg-gray-200" onClick={onClose}>
          <i className="ri-close-line"></i>
        </div>
      </div>

      {polygonCoordinates.length > 0 ? (
        <table className="table-auto w-full border-collapse border-b-2 border-gray-300 text-left text-xs">
          <thead>
            <tr className="bg-gray-50">
              <th className="border-b border-gray-300 px-2 py-1">WP</th>
              <th className="border-b border-gray-300 px-2 py-1">Coordinates</th>
            </tr>
          </thead>
          <tbody>
            {polygonCoordinates.map((coord, idx) => (
              <tr key={idx} className="bg-neutral-100 hover:bg-gray-50">
                <td className="border-b border-gray-300 px-2 py-1">{idx + 1}</td>
                <td className="border-b border-gray-300 px-2 py-1">
                  {coord.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-sm text-center text-gray-700 m-2.5">
          No polygon points available. Please draw a polygon on the map.
        </p>
      )}

      <div className="flex justify-end border-t-2 border-slate-200 shadow-sm mt-4">
        <button
          onClick={onImportPoints}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-3 text-xs"
          disabled={!polygonCoordinates.length} // Disable if no points available
        >
          Import Points
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg text-xs"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default PolygonModal;