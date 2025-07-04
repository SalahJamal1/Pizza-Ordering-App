import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../../store/store";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const { cart } = useSelector((store: RootState) => store.carts);
  const quantity = cart.reduce((a, b) => a + b.quantity, 0);
  const totalPrice = cart.reduce((a, b) => a + b.totalPrice, 0);
  if (cart.length > 0)
    return (
      <div className="flex items-center bg-blue-900 text-slate-50 px-6 justify-between font-semibold tracking-wider h-[9vh] shadow-lg">
        <p className="space-x-4 text-base capitalize">
          <span>{quantity} pizzas</span>
          <span>{formatCurrency(totalPrice)}</span>
        </p>
        <Link to="/cart" className="text-base capitalize">
          Open cart &rarr;
        </Link>
      </div>
    );
}

export default CartOverview;
