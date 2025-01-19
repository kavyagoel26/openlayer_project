import Modal from "react-modal";
import "remixicon/fonts/remixicon.css";
import calculateDistance from "../utils/calculateDistance";
import WaypointDropdown from "./WaypointDropdown";

const MissionModal = ({
  isOpen,
  onClose,
  waypoints,
  isDrawing,
  setWaypoints,
}) => {

    const handleInsertBefore = (index) => {
        const newWaypoints = [...waypoints];
        newWaypoints.splice(index, 0, [0, 0]); // Example coordinates
        setWaypoints(newWaypoints);
      };
    
      const handleInsertAfter = (index) => {
        const newWaypoints = [...waypoints];
        newWaypoints.splice(index + 1, 0, [0, 0]); // Example coordinates
        setWaypoints(newWaypoints);
      }

  const handleClose = () => {
    if (!isDrawing) {
      onClose();
    }
  };

  const handleCheckboxChange = (idx) => {
    setWaypoints((prevWaypoints) =>
      prevWaypoints.map((wp, i) => {
        i === idx ? { ...wp, checked: !wp.checked } : wp;
      })
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white shadow-xl rounded-lg w-2/5  mx-auto  relative"
      overlayClassName="fixed insert-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className=" w-full h-18 border-b-2 border-slate-200 shadow-sm flex justify-between items-center">
        <h2 className="text-lg font-semibold font-semibold pb-2 text-gray-800">
          Mission Creation
        </h2>
        <div
          className="flex justify-end hover:bg-gray-200"
          onClick={handleClose}
        >
          <i className="ri-close-line"></i>
        </div>
      </div>
      {/* <p className="font-bold m-0 p-0">Waypoints Navigation</p> */}
     

      {waypoints && waypoints.length > 0 ? (
        <div className="overflow-x-auto mb-4">
          <table className="table-auto w-full border-collapse border-b-2 border-gray-300 text-left text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className=" border-b border-gray-300 px-2 py-1">
                <input type=" checkbox"
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
                <th className="border-b text-blue border-gray-300 px-2 py-1">
                <i className="ri-upload-2-line"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {waypoints.map((wp, idx) => {
                const distance = idx>0 ? 
                calculateDistance(waypoints[idx-1], wp).toFixed(2)
                :"--";
                return(
                <tr key={idx} className=" bg-neutral-100 hover:bg-gray-50">
                  <td className="border-b border-gray-300 px-2 py-1">
                <input type=" checkbox"
                    checked={wp.checked || false}
                    onChange={() => handleCheckboxChange(idx)}
                    className="form-checkbox w-2 h-2"
                />
            </td>
                  <td className="border-b border-gray-300 px-2 py-1">
                    {idx + 1}
                  </td>
                  <td className="border-b border-gray-300 px-2 py-1">
                    {wp.join(", ")}
                  </td>
                  <td className="border-b border-gray-300 px-2 py-1">{distance} </td>
                  <td className="border-b border-gray-300 px-2 py-1 font-bold "
                   > <WaypointDropdown 
                    index={idx}
                    onInsertBefore={handleInsertBefore}
                    onInsertAfter ={handleInsertAfter}

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
        {" "}
        Click on the map to mark points of the route and then press{" "}
        <i className="ri-corner-down-left-line"></i> complete the route.
      </p>
      </div>
      )}

      
      <div className="flex w-full h-18 border-t-2 border-slate-200 shadow-sm justify-end">
        <button
          onClick={() => console.log("Generate data clicked")}
          className="bg-blue-500 hover:bg-blue-600 mt-2.5 text-white px-4 py-2 rounded-lg mr-3 text-xs"
        >
          {" "}
          Generate Data
        </button>
      </div>
    </Modal>
  );
};

export default MissionModal;
