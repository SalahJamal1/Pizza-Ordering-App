import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";

export type menuItem = {
  id: number;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
};

function Menu() {
  const menu: menuItem[] = useLoaderData();
  return (
    <ul className=" divide-slate-400 divide-y">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export default Menu;
