import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div>
      <Link
        to="/menu"
        className="text-base border-b pb-1 text-blue-600 font-semibold  block w-fit transition-all duration-150 hover:border-transparent mb-4"
      >
        &larr; Back to menu
      </Link>

      <p>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
