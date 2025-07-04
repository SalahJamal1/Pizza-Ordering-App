import type { AppDispatch, RootState } from "../../store/store";
import ButtonOptions from "../../ui/ButtonOptions";
import { formatCurrency } from "../../utils/helpers";
import { ADDCART, type cartState } from "../cart/cartSlice";
import type { menuItem } from "./Menu";
import { useDispatch, useSelector } from "react-redux";
type Props = {
  pizza: menuItem;
};
function MenuItem({ pizza }: Props) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((store: RootState) => store.carts);
  const currentItem = cart?.find((item) => item.pizzaId === id);
  const onAdd = () => {
    const newItem: cartState = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    dispatch(ADDCART(newItem));
  };
  return (
    <li className="flex py-4 space-x-6">
      <img
        loading="eager"
        src={imageUrl}
        alt={name}
        className={`rounded-full h-[8rem] ${soldOut && "grayscale"}`}
      />
      <div className="space-y-4 flex-grow">
        <p className=" tracking-wider font-semibold text-slate-800">{name}</p>
        <p className=" tracking-wider font-medium text-slate-500 capitalize">
          {ingredients.join(", ")}
        </p>
        <div className="flex items-center justify-between">
          {!soldOut ? (
            <>
              <p className=" tracking-wider font-light text-slate-900">
                {formatCurrency(unitPrice)}
              </p>
              {currentItem ? (
                <ButtonOptions
                  id={currentItem.pizzaId}
                  quantity={currentItem.quantity}
                />
              ) : (
                <button
                  className="bg-blue-900 text-slate-50  px-3 rounded-full text-base h-[30px] capitalize tracking-wider duration-150 transition-all hover:bg-blue-800 cursor-pointer font-semibold"
                  onClick={onAdd}
                >
                  Add Cart
                </button>
              )}
            </>
          ) : (
            <p className=" tracking-wider font-extralight text-slate-500">
              Sold out
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
