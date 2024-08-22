import { useState } from "react";
interface ISwitch {
  onClick: () => void;
  label: string;
}
const Switch = ({ onClick, label }: ISwitch) => {
  const [isOn, setIsOn] = useState(true);

  const toggleSwitch = () => {
    setIsOn((prevState) => !prevState);
    onClick();
  };

  return (
    <div className="flex items-center gap-2">
      <div
        onClick={toggleSwitch}
        className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
          isOn ? "bg-[#30bbb5]" : "bg-gray-400"
        }`}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
            isOn ? "translate-x-7 lg:translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
      <p className=" text-[10px] md:text-[14px] ">{label}</p>
    </div>
  );
};

export default Switch;
