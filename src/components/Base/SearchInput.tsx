import React from "react";
import { IoSearch } from "react-icons/io5";
import useUserStore from "../../../store/UserStore";
interface ISearchInput {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  contentClass?: string;
}
const SearchInput = ({ onChange, className, contentClass }: ISearchInput) => {
  const store = useUserStore();
  return (
    <div
      className={`flex items-center gap-2  p-2 rounded-2xl h-16 bg-[#7C7F8D] ${className}`}
    >
      <IoSearch className="text-[#454856] text-2xl" />
      <input
        type="text"
        placeholder="Find a user"
        className={`w-full h-12 bg-[#7C7F8D] border-none outline-none placeholder-[#454856] text-[#454856] ${contentClass}`}
        onChange={onChange}
        value={store.searchValue}
      />
    </div>
  );
};

export default SearchInput;
