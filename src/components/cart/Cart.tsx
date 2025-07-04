import { Link } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../store/store";
import { CLEAR } from "./cartSlice";

function Cart() {
  const { cart } = useSelector((store: RootState) => store.carts);
  const { user } = useSelector((store: RootState) => store.users);
  const dispatch = useDispatch<AppDispatch>();
  if (cart.length <= 0) return <EmptyCart />;
  return (
    <div className="space-y-8">
      <Link
        to="/menu"
        className="text-base border-b pb-1 text-blue-600 font-semibold  block w-fit transition-all duration-150 hover:border-transparent"
      >
        &larr; Back to menu
      </Link>

      <h2 className="block capitalize tracking-wide">Your cart, {user}</h2>
      <ul className="divide-y divide-slate-400  overflow-y-scroll h-[40vh] rounded-2xl">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="space-x-4 tracking-wide">
        <Link
          to="/order/new"
          className="bg-blue-900 text-slate-50 rounded-full py-3 px-3 capitalize duration-150 hover:bg-blue-800 font-semibold w-[120px]"
        >
          Order pizzas
        </Link>
        <button
          className="bg-blue-900 text-slate-50 rounded-full py-[9.5px] px-3 capitalize duration-150 hover:bg-blue-800 font-semibold w-[120px] cursor-pointer"
          onClick={() => dispatch(CLEAR())}
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
