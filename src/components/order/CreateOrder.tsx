import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../store/store";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { orders } from "./Order";
import { createOrder } from "../../service/apiRestaurant";
import { useNavigate } from "react-router-dom";
import { CLEAR } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";
import EmptyCart from "../cart/EmptyCart";

function CreateOrder() {
  const {
    user,
    address: ad,
    loader,
    error,
  } = useSelector((store: RootState) => store.users);
  const { cart } = useSelector((store: RootState) => store.carts);
  const totalPrice = cart.reduce((a, b) => a + b.totalPrice, 0);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setData] = useState<orders>({
    customer: user,
    phone: "",
    address: ad ?? "",
    priority: false,
    cart,
  });
  const priorityPrice = formData.priority ? totalPrice * 0.2 : 0;
  const price = priorityPrice + totalPrice;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: name === "priority" ? checked : value,
    }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newOrder = await createOrder(formData);
    if (newOrder.id) {
      dispatch(CLEAR());
      navigate(`/order/${newOrder.id}`);
    }
  };
  const onClick = () => {
    dispatch(fetchAddress());

    setData((prev) => ({ ...prev, address: ad }));
  };
  useEffect(() => {
    if (ad === undefined) return;
    setData((prev) => ({ ...prev, address: ad }));
  }, [ad]);
  if (cart.length <= 0) return <EmptyCart />;
  return (
    <div className="space-y-6 max-w-[600px] mx-auto">
      <h2>Ready to order? Let's go!</h2>

      <form className=" text-base font-semibold" onSubmit={onSubmit}>
        <div className="space-y-2 mb-6">
          <label className="block">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="bg-slate-50 w-full border-blue-800 border-2 px-3 rounded-2xl py-[9px] outline-none  text-black placeholder:text-slate-600 transition-all duration-150 focus:ring-2 focus:ring-blue-800"
            value={formData.customer}
            onChange={onChange}
          />
        </div>

        <div className="space-y-2 mb-6">
          <label className="block">Phone number</label>
          <div>
            <input
              type="tel"
              name="phone"
              required
              className="bg-slate-50 px-3 w-full border-blue-800 border-2 rounded-2xl py-[9px] outline-none  text-black placeholder:text-slate-600 transition-all duration-150 focus:ring-2 focus:ring-blue-800"
              value={formData.phone}
              onChange={onChange}
            />
          </div>
        </div>

        <div className="space-y-2 mb-7">
          <label className="block">Address</label>
          <div className="relative">
            <input
              type="text"
              name="address"
              required
              className="bg-slate-50 w-full px-3 border-blue-800 border-2 rounded-2xl py-[9px] outline-none  text-black placeholder:text-slate-600 transition-all duration-150 focus:ring-2 focus:ring-blue-800"
              value={formData.address}
              onChange={onChange}
            />
            {ad == "" && (
              <button
                onClick={onClick}
                className="bg-blue-900 text-slate-50 rounded-2xl py-[10px] px-[9px] capitalize duration-150 hover:bg-blue-800 font-semibold  cursor-pointer block justify-self-end absolute top-0 right-0"
              >
                {loader ? "Loading..." : "get address"}
              </button>
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="flex items-center justify-between">
          <div className="space-x-2 flex items-center">
            <input
              type="checkbox"
              name="priority"
              id="priority"
              className="h-6 w-6 accent-blue-700 transition-all duration-150 border-none outline-none"
              checked={formData.priority}
              onChange={onChange}
            />
            <label htmlFor="priority">
              Want to yo give your order priority?
            </label>
          </div>

          <div>
            <button className="bg-blue-900 text-slate-50 rounded-full py-[9.5px] px-3 capitalize duration-150 hover:bg-blue-800 font-semibold cursor-pointer">
              Order now {formatCurrency(price ?? 0)}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateOrder;
