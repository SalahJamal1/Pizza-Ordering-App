import { useState, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { SET_USER } from "./userSlice";
import { Link, useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((store: RootState) => store.users);
  const navigate = useNavigate();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!username) return;
    dispatch(SET_USER(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-fit text-center">
      <p>👋 Welcome! Please start by telling us your name:</p>

      {user !== "" ? (
        <div>
          <Link
            to="/menu"
            className="bg-blue-900 text-slate-50 rounded-full py-[9.5px] px-3 capitalize duration-150 hover:bg-blue-800 font-semibold  cursor-pointer block mt-2 w-fit mx-auto"
          >
            Start ordering
          </Link>
        </div>
      ) : (
        <input
          type="text"
          placeholder="Your full name"
          value={username}
          className="bg-slate-50 border-blue-800 border-2 rounded-2xl text-center py-[9px] outline-none  text-black placeholder:text-slate-600 transition-all duration-150 focus:ring-2 focus:ring-blue-800"
          onChange={(e) => setUsername(e.target.value)}
        />
      )}
    </form>
  );
}

export default CreateUser;
