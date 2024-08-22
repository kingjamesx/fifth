import { FaArrowRight } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineWifiCalling3 } from "react-icons/md";

import Button from "./Button";
import useUserStore from "../../../store/UserStore";
import { User } from "../../types/backend";
interface IUserCard {
  user: User;
  index: number;
}
const UserCard = ({ user, index }: IUserCard) => {
  const store = useUserStore();
  const handleClick = () => {
    store.updateDetailsIndex(index);
    store.updateDetailsPage();
  };
  const isCountry = store.showCountry;
  return (
    <div className="bg-white rounded-[10px] text-black flex flex-col lg:flex-row lg:items-start items-center justify-center gap-8 shadow py-5 lg:pt-4  px-5 ">
      <section>
        <img
          src={user.picture.large}
          alt=""
          className="border-8 border-[#75d6d1] rounded-full w-24 h-24"
        />
      </section>
      <section className=" w-[80%]">
        <p className="text-xl font-bold text-center lg:text-left lg:mt-4">{`${user.name.first} ${user.name.last}`}</p>
        <p className="mt-2 text-[15px] italic font-thin text-center lg:text-left">{`${
          user.location.street.number
        }, ${user.location.city}, ${user.location.state}, ${
          isCountry ? user.location.country : ""
        }`}</p>
        <div className="flex flex-col lg:flex-row mt-3 justify-between items-center  w-full">
          <Button className="flex gap-1 items-center text-xs">
            <MdOutlineEmail className="text-lg" />
            {user.email}
          </Button>
          <Button className="flex gap-1 items-center text-xs">
            <MdOutlineWifiCalling3 className="text-lg" />
            {user.cell}
          </Button>
          <Button
            className="p-4 px-6 rounded-[14px] btn-shadow bg-[#75d6d1] hover:bg-[#61C2BD]"
            onClick={handleClick}
          >
            <FaArrowRight className="text-white" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default UserCard;
