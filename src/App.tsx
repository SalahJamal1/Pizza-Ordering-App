import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Error from "./ui/Error";
import { Suspense } from "react";
import AppLayout from "./ui/AppLayout";
import Cart from "./components/cart/Cart";
import Menu from "./components/menu/Menu";
import { menuLoader } from "./components/menu/menuLoader";
import Order from "./components/order/Order";
import CreateOrder from "./components/order/CreateOrder";
import { orderLoader } from "./components/order/orderLoader";
import Loader from "./ui/Loader";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:id",
        element: <Order />,
        loader: orderLoader,
      },
    ],
  },
]);
export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
