import { useState, useRef, useEffect } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
interface ISelectBox {
  label: string;
  options: string[];
  onSelect: (option: string) => void;
}
const SelectBox = ({ label, options, onSelect }: ISelectBox) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className="relative w-48 lg:w-60">
      {/* <label className="block text-gray-700 text-sm mb-2">{label}</label> */}
      <div
        className="flex items-center justify-between border border-gray-300 p-3 rounded-[28px] cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className="text-gray-700">
          {selectedOption ? selectedOption : `Select ${label.toLowerCase()}`}
        </span>
        {isOpen ? (
          <FaCaretUp className="text-gray-700" />
        ) : (
          <FaCaretDown className="text-gray-700" />
        )}
      </div>
      {isOpen && (
        <ul className="absolute left-0 right-0 mt-1 border border-gray-300 rounded bg-white max-h-60 overflow-auto z-10">
          <li className="px-4 py-2 text-gray-500">{label}</li>
          {options.map((option, index) => (
            <li
              key={index}
              className={`px-4 py-2 hover:bg-gray-200 cursor-pointer ${
                selectedOption === option ? "bg-gray-100 font-semibold" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
