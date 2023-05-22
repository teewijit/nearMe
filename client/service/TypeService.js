import AxiosControl from "./_AxiosControl";

const Search = async () => {
  return await AxiosControl.get("/type");
};

const TypeService = {
    Search,
};

export default TypeService;
