import axios from "axios";

export async function getAddress(latitude: number, longitude: number) {
  const res = await axios.get(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
  );
  return res.data;
}
