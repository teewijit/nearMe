import axios from "axios";

export const register = async (value) =>
  await axios.post("http://localhost:5000/api/auth", value);
// await axios.post(process.env.NEXT_PUBLIC_SERVER_ENDPOINT+'/')

export const getAllStore = async () =>
  await axios.post("http://localhost:5000/api/store");
// await axios.post(process.env.NEXT_PUBLIC_SERVER_ENDPOINT+'/')
