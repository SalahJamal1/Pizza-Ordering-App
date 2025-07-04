import axios from "axios";
import type { orders } from "../components/order/Order";
const api = axios.create({
  baseURL: "https://react-fast-pizza-api.onrender.com/api",
});

export async function getMenu() {
  try {
    const res = await api.get(`/menu`);
    return res.data.data;
  } catch {
    throw Error("Failed getting menu");
  }
}

export async function getOrder(id: string) {
  try {
    const res = await api.get(`/order/${id}`);
    return res.data.data;
  } catch {
    throw Error(`Couldn't find order #${id}`);
  }
}

export async function createOrder(newOrder: orders) {
  try {
    const res = await api.post(
      `/order`,

      newOrder
    );
    return res.data.data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(id: string, updateObj: orders) {
  try {
    await api.patch(`/order/${id}`, updateObj);
  } catch {
    throw Error("Failed updating your order");
  }
}
