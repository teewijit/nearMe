import AxiosControl from "./_AxiosControl";

const Search = async () => {
  return await AxiosControl.get("/store");
};
const Create = async (data) => {
  return await AxiosControl.post("/store", data);
};
const SearchByID = async (id) => {
  return await AxiosControl.get("/store/", { id });
};
const Update = async (id, data) => {
  return await AxiosControl.post(`/store/update/${id}`, data);
};
const Delete = async (id) => {
  return await AxiosControl.post(`/store/delete/:id`,{id});
};

const StoreService = {
  Search,
  Create,
  Delete,
  Update,
};

export default StoreService;
