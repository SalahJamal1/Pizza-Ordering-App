import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { DECCART, DELETE, INCCART } from "../components/cart/cartSlice";

type Props = {
  id?: number;
  quantity?: number;
};

export default function ButtonOptions({ id, quantity }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const onClick = (type: string) => {
    if (type === "inc") {
      dispatch(INCCART(id!));
    } else if (type === "dec") {
      dispatch(DECCART(id!));
    } else {
      dispatch(DELETE(id!));
    }
  };
  return (
    <div className="space-x-2 flex items-center">
      <button
        className="bg-blue-900 text-slate-50 h-[27px] w-[27px]  rounded-full text-xl duration-150 transition-all hover:bg-blue-800 cursor-pointer font-semibold flex items-center justify-center"
        onClick={() => onClick("inc")}
      >
        +
      </button>
      <span className="text-2xl">{quantity}</span>
      <button
        className="bg-blue-900 text-slate-50 h-[27px] w-[27px]  rounded-full text-xl duration-150 transition-all hover:bg-blue-800 cursor-pointer font-semibold flex items-center justify-center"
        onClick={() => onClick("dec")}
      >
        -
      </button>
      <button
        className="bg-blue-900 text-slate-50  px-3 rounded-full text-base h-[30px] capitalize tracking-wider duration-150 transition-all hover:bg-blue-800 cursor-pointer font-semibold"
        onClick={() => onClick("del")}
      >
        delete
      </button>
    </div>
  );
}
