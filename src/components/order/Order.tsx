// Test ID: IIDSAT

import { useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import type { cartState } from "../cart/cartSlice";
import { updateOrder } from "../../service/apiRestaurant";
import { useEffect } from "react";
import type { menuItem } from "../menu/Menu";

export type orders = {
  cart: cartState[];
  customer: string;
  estimatedDelivery?: string;
  id?: string;
  orderPrice?: number;
  priority: boolean;
  phone: string;
  address: string;
  priorityPrice?: number;
  status?: "delivered" | "preparing";
};

function Order() {
  const order: orders = useLoaderData();
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const {
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery ?? "");

  const onUpdate = async () => {
    const data = { ...order, priority: true };
    await updateOrder(data.id!, data);
    navigate(".", { replace: true });
  };

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
    }
  }, [fetcher]);
  const menu: menuItem[] = fetcher.data ?? [];
  return (
    <div className="max-w-[700px] mx-auto space-y-8 py-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold tracking-wider">
          Order {order.id} Status
        </h2>

        <div className="space-x-3">
          {priority && (
            <span className="bg-green-600 text-slate-50 px-2 py-[3px] rounded-full font-semibold tracking-wider uppercase">
              Priority
            </span>
          )}
          <span className="bg-red-600 text-slate-50 px-2 py-[3px] rounded-full font-semibold tracking-wider uppercase">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between bg-slate-300 px-2 py-2">
        <p className="font-semibold tracking-wider">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery ?? "")} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery ?? "")})</p>
      </div>

      <ul className="divide-y divide-slate-400">
        {cart.map((item) => (
          <OrderItem
            item={item}
            ingredients={menu.find((el) => el.id === item.pizzaId)?.ingredients}
            isLoadingIngredients={fetcher.state === "loading"}
            key={item.pizzaId}
          />
        ))}
      </ul>

      <div className="bg-slate-300 px-2 py-4 font-semibold space-y-3">
        <p>
          Price pizza:
          <span className="font-normal ml-1">
            {formatCurrency(orderPrice ?? 0)}
          </span>
        </p>
        {priority && (
          <p>
            Price priority:{" "}
            <span className="font-normal ml-1">
              {formatCurrency(priorityPrice ?? 0)}
            </span>
          </p>
        )}
        <p>
          To pay on delivery:
          <span className="font-normal ml-1">
            {formatCurrency((orderPrice ?? 0) + (priorityPrice ?? 0))}
          </span>
        </p>
      </div>
      {!priority && (
        <button
          onClick={onUpdate}
          className="bg-blue-900 text-slate-50 rounded-full py-[9.5px] px-3 capitalize duration-150 hover:bg-blue-800 font-semibold  cursor-pointer block justify-self-end"
        >
          Make priority
        </button>
      )}
    </div>
  );
}

export default Order;
