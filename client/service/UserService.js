import AxiosControl from "./_AxiosControl";

const getProfile = async () => {
  return await AxiosControl.get("/user/profile");
};

const getAll = async () => {
  return await AxiosControl.get("/user");
};

const CheckPass = async (id, data) => {
  return await AxiosControl.post(`/user/checkPass/${id}`, data);
};

const Update = async (id, data) => {
  return await AxiosControl.post(`/user/update/${id}`, data);
};

const Create = async (data) => {
  try {
    const response = await AxiosControl.post("/register/", data);
    return response;
  } catch (error) {
    return error.response;
  }
};
const Delete = async (id) => {
  return await AxiosControl.post(`/user/delete/:id`, { id });
};

const UserService = {
  getProfile,
  Create,
  getAll,
  Update,
  Delete,
  CheckPass,
};

export default UserService;
