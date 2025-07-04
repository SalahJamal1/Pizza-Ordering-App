import { getOrder } from "../../service/apiRestaurant";
export async function orderLoader({ params }: { params: { id?: string } }) {
  const { id } = params;
  const data = await getOrder(id!);
  return data;
}
