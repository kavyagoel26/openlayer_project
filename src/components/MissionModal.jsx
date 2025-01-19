
import Modal from "react-modal";
import "remixicon/fonts/remixicon.css";
import calculateDistance from "../utils/calculateDistance";
import WaypointDropdown from "./WaypointDropdown";

const MissionModal = ({
  isOpen,
  onClose,
  waypoints,
  setWaypoints,
  onInsertPolygon, // Function to handle polygon insertion
}) => {
  // Inserts a waypoint before the current index
  const handleInsertBefore = (index) => {
    const newWaypoints = [...waypoints];
    const newPoint = [...waypoints[index]]; // Duplicate the current waypoint
    newWaypoints.splice(index, 0, newPoint);
    setWaypoints(newWaypoints);
  };

  // Inserts a waypoint after the current index
  const handleInsertAfter = (index) => {
    const newWaypoints = [...waypoints];
    const currentPoint = waypoints[index];
    const nextPoint = waypoints[index + 1] || currentPoint; // Use current point if no next point exists
    const midPoint = [
      (currentPoint[0] + nextPoint[0]) / 2,
      (currentPoint[1] + nextPoint[1]) / 2,
    ];
    newWaypoints.splice(index + 1, 0, midPoint);
    setWaypoints(newWaypoints);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white shadow-xl rounded-lg w-2/5 mx-auto relative"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="w-full h-18 border-b-2 border-slate-200 shadow-sm flex justify-between items-center">
        <h2 className="text-lg font-semibold pb-2 text-gray-800">
          Mission Creation
        </h2>
        <div
          className="flex justify-end hover:bg-gray-200"
          onClick={onClose}
        >
          <i className="ri-close-line"></i>
        </div>
      </div>

      {waypoints && waypoints.length > 0 ? (
        <div className="overflow-x-auto mb-4">
          <table className="table-auto w-full border-collapse border-b-2 border-gray-300 text-left text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="border-b border-gray-300 px-2 py-1">
                  <input
                    type="checkbox"
                    className="form-checkbox w-2 h-2 border-1 border-gray-400"
                  />
                </th>
                <th className="border-b border-gray-300 px-2 py-1">WP</th>
                <th className="border-b border-gray-300 px-2 py-1">
                  Coordinates
                </th>
                <th className="border-b border-gray-300 px-2 py-1">
                  Distance (m)
                </th>
                <th className="border-b border-gray-300 px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {waypoints.map((wp, idx) => {
                const distance =
                  idx > 0
                    ? calculateDistance(waypoints[idx - 1], wp).toFixed(2)
                    : "--";
                return (
                  <tr key={idx} className="bg-neutral-100 hover:bg-gray-50">
                    <td className="border-b border-gray-300 px-2 py-1">
                      <input
                        type="checkbox"
                        checked={wp.checked || false}
                        onChange={() =>
                          setWaypoints((prev) =>
                            prev.map((waypoint, i) =>
                              i === idx
                                ? { ...waypoint, checked: !waypoint.checked }
                                : waypoint
                            )
                          )
                        }
                        className="form-checkbox w-2 h-2"
                      />
                    </td>
                    <td className="border-b border-gray-300 px-2 py-1">
                      {idx + 1}
                    </td>
                    <td className="border-b border-gray-300 px-2 py-1">
                      {wp.join(", ")}
                    </td>
                    <td className="border-b border-gray-300 px-2 py-1">
                      {distance}
                      </td>
                    <td className="border-b border-gray-300 px-2 py-1">
                      <WaypointDropdown
                        index={idx}
                        onInsertBefore={() => {
                          handleInsertBefore(idx); // Insert waypoint before
                          onInsertPolygon(idx); // Activate polygon tool
                        }}
                        onInsertAfter={() => {
                          handleInsertAfter(idx); // Insert waypoint after
                          onInsertPolygon(idx); // Activate polygon tool
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full h-18 bg-gray-200 border-2 border-slate-300 border-dashed">
          <p className="text-sm text-center text-gray-700 m-2.5">
            Click on the map to mark points of the route and then press{" "}
            <i className="ri-corner-down-left-line"></i> to complete the route.
          </p>
        </div>
      )}

      <div className="flex w-full h-18 border-t-2 border-slate-200 shadow-sm justify-end">
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 mt-2.5 text-white px-4 py-2 rounded-lg mr-3 text-xs"
        >
          Close
        </button>
        <button
          onClick={() => console.log("Generate data clicked")}
          className="bg-green-500 hover:bg-green-600 mt-2.5 text-white px-4 py-2 rounded-lg mr-3 text-xs"
        >
          Generate Data
        </button>
      </div>
    </Modal>
  );
};

export default MissionModal;