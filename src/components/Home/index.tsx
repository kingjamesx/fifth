import { useState } from "react";
import { HiUserGroup } from "react-icons/hi2";
import { BiMale } from "react-icons/bi";
import { FaFemale } from "react-icons/fa";
import UserButton from "../Base/Button";
import SearchInput from "../Base/SearchInput";
import Users from "../Users/Users";
import useUserStore from "../../../store/UserStore";
import UserDetails from "../Users/UserDetails";
import { useQuery } from "react-query";
import { UserService } from "../../services/User/user.services";
import { User } from "../../types/backend";
const Home = () => {
  const store = useUserStore();
  const user = new UserService();
  const users = store.usersData;
  const [currentGender, setCurrentGender] = useState("");
  const {} = useQuery(
    ["usergender", currentGender],
    () => user.fetchGenderUser(currentGender),
    {
      onSuccess: (data: { results: User[] }) => {
        store.updateUserData(data?.results);
        store.updateOriginalData(data?.results);
      },
      enabled: currentGender !== "",
    }
  );

  const handleMale = () => {
    if (store.detailsPage) {
      return;
    }
    setCurrentGender("male");
  };
  const handleFemale = () => {
    if (store.detailsPage) {
      return;
    }
    setCurrentGender("female");
  };
  const handleAllUsers = () => {
    location.reload();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    store.updateSearchValue(e.target.value);
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm === "") {
      // If the search term is empty, reload the page
      store.updateUserData(store.originalData);
      return;
    }

    const filtered = users.filter((user) => {
      const firstName = user.name.first.toLowerCase();
      const lastName = user.name.last.toLowerCase();

      return firstName.includes(searchTerm) || lastName.includes(searchTerm);
    });

    store.updateUserData(filtered);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center mt-12  lg:mt-24  w-full  lg:max-w-[1300px] mx-auto  ">
      <section className="mx-5 lg:w-1/2     lg:max-w-[520px] lg:mx-auto lg:mt-28  ">
        <p className="text-[30px]">
          Hello, <strong>Emerald</strong>
        </p>
        <p className="text-xs text-white font-thin my-4">
          Welcome to your dashboard, kindly sort through the user base
        </p>
        <SearchInput onChange={handleChange} />
        <p className="mt-5 text-sm">Show Users</p>
        <div className="flex flex-wrap items-center gap-2 lg:gap-20 mt-4">
          <UserButton
            color="rgb(249, 53, 169)"
            text="All Users"
            className="rounded-[20px] h-[82px] w-[92px]  lg:h-[92px] lg:w-[110px]"
            onClick={handleAllUsers}
          >
            <HiUserGroup className="text-white text-2xl" />
          </UserButton>
          <UserButton
            color="rgb(48, 187, 181)"
            text="Male"
            className="rounded-[20px] h-[82px] w-[92px]  lg:h-[92px] lg:w-[110px]"
            onClick={handleMale}
          >
            <BiMale className="text-white text-2xl" />
          </UserButton>
          <UserButton
            color="rgb(121, 70, 193)"
            text="Female"
            className="rounded-[20px] h-[82px] w-[92px] lg:h-[92px] lg:w-[110px] "
            onClick={handleFemale}
          >
            <FaFemale className="text-white text-2xl" />
          </UserButton>
        </div>
      </section>
      <section className="rounded-[17px] bg-white py-16 text-black  lg:w-1/2 mt-8 px-5 lg:px-0">
        {store.detailsPage ? <UserDetails /> : <Users />}
      </section>
    </div>
  );
};

export default Home;
