import AxiosControl from "./_AxiosControl";

const SignIn = async (data) => {
  return await AxiosControl.post("/auth/sing-in", data);
};

const SignOut = async (data) => {
  return await AxiosControl.post("/auth/sing-out", data);
};

const AuthService = {
    SignIn,
    SignOut,
};

export default AuthService;
