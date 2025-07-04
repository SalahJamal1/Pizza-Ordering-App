import { Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../components/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

export default function AppLayout() {
  const navigation = useNavigation();
  const loader: boolean = navigation.state === "loading";
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen bg-slate-100">
      <Header />
      {loader && <Loader />}
      <div className="overflow-y-scroll">
        <main className="h-100 py-12 max-w-[1200px] mx-auto">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}
