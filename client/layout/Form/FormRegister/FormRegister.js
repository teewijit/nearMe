import React, { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import UserService from "@/service/UserService";
import { Button, Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const FormRegister = () => {
  const [role, setRole] = useState("user");
  const [sex, setSex] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const valueRegister = Object.fromEntries(formData.entries());

    if (valueRegister.password !== valueRegister.confirmPassword) {
      Swal.fire({
        text: "Password and confirm password do not match.",
        icon: "error",
      });
    } else {
      const valueFinal = {
        username: valueRegister.username,
        password: valueRegister.password,
        first_name: valueRegister.firstName,
        last_name: valueRegister.lastName,
        brithday: valueRegister.birthday,
        sex: valueRegister.sex,
        email: valueRegister.user_email,
        tel: valueRegister.user_tel,
        role_id: valueRegister.role,
      };

      let result = await UserService.Create(valueFinal);
      if (result.status) {
        window.location.href = `/login`;
      }
    }
  };

  const handleSexChange = (event) => {
    setSex(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="sex">Role</Form.Label>
          <div>
            <Form.Check
              inline
              label="User"
              type="radio"
              value="2"
              name="role"
              onChange={handleSexChange}
              click={true}
            />
            <Form.Check
              inline
              label="Clinic"
              type="radio"
              value="3"
              name="role"
              onChange={handleRoleChange}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control type="text" id="username" name="username" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <div className="input-group">
            <Form.Control
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
            />
            <span className="input-group-text">
              {showPassword ? (
                <i
                  className="bi bi-eye-slash"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <i className="bi bi-eye" onClick={togglePasswordVisibility} />
              )}
            </span>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <div className="input-group">
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              required
            />
            <span className="input-group-text">
              {showConfirmPassword ? (
                <i
                  className="bi bi-eye-slash"
                  onClick={toggleConfirmPasswordVisibility}
                />
              ) : (
                <i
                  className="bi bi-eye"
                  onClick={toggleConfirmPasswordVisibility}
                />
              )}
            </span>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="firstName">First Name</Form.Label>
          <Form.Control type="text" id="firstName" name="firstName" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="lastName">Last Name</Form.Label>
          <Form.Control type="text" id="lastName" name="lastName" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="sex">Sex</Form.Label>
          <div>
            <Form.Check
              inline
              label="Male"
              type="radio"
              id="maleRadio"
              value="Male"
              name="sex"
              onChange={handleSexChange}
            />
            <Form.Check
              inline
              label="Female"
              type="radio"
              id="femaleRadio"
              value="Female"
              name="sex"
              onChange={handleSexChange}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" name="birthday" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" name="user_tel" maxLength="10" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" name="user_email" required />
        </Form.Group>

        <Form.Group className="mb-3 text-center">
          <Form.Text className="text-muted">
            You are member ?
            <Link href="/" className="text-primary">
              {" "}
              Login
            </Link>
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 text-center">
          <Button variant="success" size="lg" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default FormRegister;
