import { useState } from "react";

const WaypointDropdown = ({ onInsertBefore, onInsertAfter }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setIsOpen(false);
    if (option === "before") {
      onInsertBefore();
    } else if (option === "after") {
      onInsertAfter();
    }
  };

  return (
    <div className="relative">
      <button
        className="text-gray-500 hover:text-gray-700"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <i className="ri-more-2-fill"></i>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-1 bg-white border border-gray-300 rounded shadow-md w-32 text-left z-10">
          <button
            className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-xs"
            onClick={() => handleOptionClick("before")}
          >
            Insert Polygon Before
          </button>
          <button
            className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-xs"
            onClick={() => handleOptionClick("after")}
          >
            Insert Polygon After
          </button>
        </div>
      )}
    </div>
  );
};

export default WaypointDropdown;