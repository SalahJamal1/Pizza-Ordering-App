import { formatCurrency } from "../../utils/helpers";
import type { cartState } from "../cart/cartSlice";

type Props = {
  item: cartState;
  isLoadingIngredients?: boolean;
  ingredients?: string[];
};

function OrderItem({ item, isLoadingIngredients, ingredients }: Props) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-4 font-semibold tracking-wider">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p>
            <span>{quantity}&times;</span> {name}
          </p>
          <span className=" tracking-wider font-medium text-slate-500 capitalize">
            {isLoadingIngredients ? "Loading..." : ingredients?.join(",")}
          </span>
        </div>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
