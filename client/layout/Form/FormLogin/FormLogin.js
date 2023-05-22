import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import AuthService from "../../../service/AuthService";
import { setData } from "@/store/slices/usersSlice";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const loginValue = { username, password };
    let result = await AuthService.SignIn(loginValue);
    if (result.status) {
      dispatch(setData(result.data));
        window.location.href = `/manage/`;
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" required />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" required />
        </Form.Group>

        <Form.Group className="mb-3 text-center">
          <Form.Text className="text-muted">
            Not a member ?
            <Link href="/register" className="text-primary">
              {" "}
              Register
            </Link>
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 text-center">
          <Button variant="primary" size="lg" type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default Login;
