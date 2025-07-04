import { useSelector } from "react-redux";
import ButtonOptions from "../../ui/ButtonOptions";
import { formatCurrency } from "../../utils/helpers";
import type { cartState } from "./cartSlice";
import type { RootState } from "../../store/store";

type Props = {
  item: cartState;
};
function CartItem({ item }: Props) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const { cart } = useSelector((store: RootState) => store.carts);
  const currentItem = cart?.find((it) => it.pizzaId === pizzaId);
  return (
    <li className="flex items-center justify-between py-4 font-semibold tracking-wider">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center space-x-8">
        <ButtonOptions id={pizzaId} quantity={currentItem?.quantity} />
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default CartItem;
