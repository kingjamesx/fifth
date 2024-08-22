import { useState } from "react";
import useUserStore from "../../../store/UserStore";
import { FaArrowLeft, FaCloudDownloadAlt } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import SearchInput from "../Base/SearchInput";
import SelectBox from "../Base/SelectBox";
import Switch from "../Base/Switch";
import Button from "../Base/Button";
import { formatDate } from "../../utils";
const UserDetails = () => {
  const store = useUserStore();
  const index = store.detailsIndex;
  const data = store.usersData[index];
  const [currentPage] = useState(1);
  const handleClick = () => {
    store.updateDetailsPage();
  };
  const handleChange = () => {};
  const handleSelect = () => {};
  const handleSwitch = () => {};
  return (
    <div className="w-[90%] mx-auto">
      <p className="text-[22px] font-bold">User List</p>
      <p className="text-xs mb-4">Filter by</p>

      <section className="flex flex-col lg:flex-row flex-wrap lg:flex-nowrap items-center gap-4 ">
        <SearchInput
          className="text-white w-full lg:w-1/2 bg-[#EFEFEF] rounded-[28px] pl-5 -ml-10 lg:ml-0"
          contentClass="bg-[#EFEFEF]"
          onChange={handleChange}
        />
        <span className="flex gap-4">
          <SelectBox label="country" options={[]} onSelect={handleSelect} />
          <Switch onClick={handleSwitch} label="Show Country" />
        </span>
      </section>
      <Button
        className=" hover:bg-[#EFEFEF] px-5 rounded py-2 flex items-center gap-2 mt-8 text-[14px]"
        onClick={handleClick}
      >
        <FaArrowLeft className="text-[#75d6d1]" />
        RESULTS
      </Button>
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-6 lg:gap-12 lg:items-start">
        <section className="mt-8">
          <img
            src={data.picture.large}
            alt={data.name.first}
            className="border-[7px] border-[#75d6d1] rounded-full w-44 h-44"
          />
        </section>
        <section className="flex flex-col items-center lg:items-start gap-[14px] mb-14 mt-8 text-[#262a41]">
          <p className="text-[23px] font-bold">
            {`${data.name.title} ${data.name.first} ${data.name.last} `}
            <span className="font-light">{data.dob.age}</span>
          </p>
          <p className="text-[15px]">{`${data.location.street.number}, ${data.location.city}, ${data.location.state}`}</p>
          <Button className="flex items-center gap-2 text-[14px] bg-[#D9D9DF] p-2 rounded-[28px]">
            <MdOutlineEmail /> {data.email}
          </Button>
          <Button className="bg-[#FFDDF5] hover:bg-[#F7D9F1] p-2 rounded-[28px] text-[12px]">{`JOINED:${formatDate(
            data.registered.date
          )}`}</Button>
          <p className="flex items-center gap-2 text-xs text-[#babdd1]">
            <MdOutlineWifiCalling3 />
            {data.phone}
          </p>
          <p className="text-xs text-[#babdd1]">{data.cell}</p>
        </section>
      </div>
      <div className="flex flex-col-reverse lg:flex-row  items-center justify-between  opacity-[0.27]">
        <Button
          disabled
          className="w-full items-center gap-2 bg-[#7945C0] text-white flex rounded-[28px] py-4 px-10 hover:bg-[#9965E0]"
        >
          <FaCloudDownloadAlt className="text-white" />
          <p>Download Results</p>
        </Button>
        <span className="flex items-center gap-2 ">
          <Button
            disabled
            className={`${
              currentPage === 1
                ? "bg-[#E2E3EC] hover:bg-[#D2D3DD] "
                : "bg-[#262A40]"
            } hover:bg-[#404660]  p-4 px-5 rounded-[10px] drop-shadow-sm`}
          >
            <IoIosArrowBack
              className={`${
                currentPage === 1 ? "text-[#262A40]" : "text-white"
              }`}
            />
          </Button>
          <Button
            disabled
            className="bg-[#262A40] hover:bg-[#404660] p-4 px-5 rounded-[10px] drop-shadow-sm"
          >
            <IoIosArrowForward className="text-white" />
          </Button>
        </span>
      </div>
    </div>
  );
};

export default UserDetails;
