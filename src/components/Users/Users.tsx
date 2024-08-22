import { useState } from "react";
import UserCard from "../Base/UserCard";
import { useQuery } from "react-query";
import { UserService } from "../../services/User/user.services";
import useUserStore from "../../../store/userStore";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Switch from "../Base/Switch";
import SelectBox from "../Base/SelectBox";
import SearchInput from "../Base/SearchInput";
import { User } from "../../types/backend";

import { downloadCSV } from "../../utils";
import Button from "../Base/Button";
const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [countryFound, setCountryFound] = useState(true);
  const user = new UserService();
  const store = useUserStore();
  const users = store.usersData;

  const url = import.meta.env.VITE_COUNTRY_URL;
  const { data } = useQuery({
    queryKey: ["country"],
    queryFn: async () => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch location data: ${response.status}`);
      }
      const data = await response.json();

      return data.map((item: any) => item.name.common).sort();
    },
  });
  const {} = useQuery(
    ["users", currentPage],
    () => user.fetchUser(currentPage),
    {
      onSuccess: (data: { results: User[] }) => {
        store.updateUserData(data?.results);
        store.updateOriginalData(data?.results);
      },
    }
  );
  const increaseCurrentPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const decreaseCurrentPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleSelect = (option: string) => {
    const filtered = users.filter((user) => {
      const userCountry = user.location.country.toLowerCase();

      return userCountry.includes(option.toLowerCase());
    });
    store.updateUserData(filtered);
    if (filtered.length === 0) {
      setCountryFound(false);
      return;
    }
  };
  const handleSwitch = () => {
    store.updateShowCountry();
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
  const reloadUser = () => {
    store.updateUserData(store.originalData);
    setCountryFound(true);
  };
  const handleDownload = () => {
    downloadCSV(store.usersData, "users.csv");
  };

  return (
    <div className="lg:w-[90%] w-full mx-auto ">
      <p className="text-[22px] font-bold">All Users</p>
      <p className="text-xs mb-4">Filter by</p>
      <section className="flex flex-col lg:flex-row flex-wrap lg:flex-nowrap items-center gap-4 ">
        <SearchInput
          className="text-white w-full lg:w-1/2 bg-[#EFEFEF] rounded-[28px] pl-5  "
          contentClass="bg-[#EFEFEF]"
          onChange={handleChange}
        />
        <span className="flex gap-4 flex-wrap lg:flex-nowrap">
          <SelectBox label="country" options={data} onSelect={handleSelect} />
          <Switch onClick={handleSwitch} label="Show Country" />
        </span>
      </section>
      <div className="flex flex-col gap-8 mt-8  justify-center ">
        {users?.map((user: any, index: number) => {
          return (
            <div key={index}>
              <UserCard user={user} index={index} />
            </div>
          );
        })}
        {!countryFound && (
          <div>
            <p className="text-red-500">No users found with this country</p>
            <button onClick={reloadUser}>reload users</button>
          </div>
        )}
      </div>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between mt-8 ">
        <Button
          className="w-full items-center gap-2 bg-[#7945C0] text-white flex rounded-[28px] py-4 px-10 hover:bg-[#9965E0]"
          onClick={handleDownload}
        >
          <FaCloudDownloadAlt className="text-white" />
          <p>Download Results</p>
        </Button>
        <span className="flex  items-center gap-2">
          <Button
            onClick={decreaseCurrentPage}
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
            onClick={increaseCurrentPage}
            className="bg-[#262A40] hover:bg-[#404660] p-4 px-5 rounded-[10px] drop-shadow-sm"
          >
            <IoIosArrowForward className="text-white" />
          </Button>
        </span>
      </div>
    </div>
  );
};

export default Users;
