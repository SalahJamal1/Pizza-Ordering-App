import { getMenu } from "../../service/apiRestaurant";
import type { menuItem } from "./Menu";
export async function menuLoader() {
  const data: menuItem[] = await getMenu();
  return data;
}
