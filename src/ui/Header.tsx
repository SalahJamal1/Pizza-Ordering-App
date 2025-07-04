import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";
import { useState, type ChangeEvent, type FormEvent } from "react";

export default function Header() {
  const { user } = useSelector((store: RootState) => store.users);
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
  };
  return (
    <header className="flex items-center justify-between bg-blue-900 text-slate-50 h-[9vh] px-6 font-semibold shadow-lg">
      <Link to="/" className="tracking-widest">
        FAST REACT PIZZA CO.
      </Link>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="#order"
          className="bg-blue-100 rounded-2xl px-2 py-[6px] outline-none border-none text-black placeholder:text-slate-500 transition-all duration-150 max-w-[7rem] focus:max-w-[12rem]"
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />
      </form>
      {user && <span className="uppercase">{user}</span>}
    </header>
  );
}
