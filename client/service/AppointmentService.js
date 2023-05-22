import AxiosControl from "./_AxiosControl";

const Search = async () => {
  return await AxiosControl.get("/app");
};
const Create = async (data) => {
  return await AxiosControl.post("/app", data);
};
const SearchByID = async (id) => {
  return await AxiosControl.get("/app/", { id });
};
const Update = async (id, data) => {
  return await AxiosControl.post(`/app/update/${id}`, data);
};
const Delete = async (id) => {
  return await AxiosControl.post(`/app/delete/:id`, { id });
};

const AppointmentService = {
  Search,
  Create,
  Delete,
  Update,
  SearchByID,
};

export default AppointmentService;
