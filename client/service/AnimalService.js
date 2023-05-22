import AxiosControl from "./_AxiosControl";

const Search = async () => {
  return await AxiosControl.get("/animal");
};
const Create = async (data) => {
  return await AxiosControl.post("/animal", data);
};
const SearchByID = async (id) => {
  return await AxiosControl.get("/animal/", { id });
};
const Update = async (id, data) => {
  return await AxiosControl.post(`/animal/update/${id}`, data);
};
const Delete = async (id) => {
  return await AxiosControl.post(`/animal/delete/:id`, { id });
};

const AnimalService = {
  Search,
  Create,
  Delete,
  Update,
  SearchByID,
};

export default AnimalService;
