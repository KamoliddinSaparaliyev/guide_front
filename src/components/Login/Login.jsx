import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../../helpers/inctance";
import LoaderPage from "../Loader/loader";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSuccessfulLogin = (token) => {
    setLogin(true);
    localStorage.setItem("token", token);
    const expires_date = new Date();
    expires_date.setDate(expires_date.getDate() + 1);
    localStorage.setItem("expires_date", expires_date);

    toast.success("You have successfully logged in.", {
      autoClose: 3000,
    });

    setTimeout(() => {
      navigate("/messages");
      setLogin(false);
    }, 3000);
  };

  const handleLoginError = (error) => {
    toast.error(
      error?.response?.data?.error ||
        "Login failed. Please check your credentials.",
      {
        autoClose: 3000,
      }
    );
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await instance.post("/users/login", formData);
      if (res?.data?.data?.token) {
        handleSuccessfulLogin(res?.data?.data?.token);
      } else {
        handleLoginError();
      }
    } catch (error) {
      handleLoginError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Container>
        <Row
          className={`justify-content-center align-items-center ${
            login || loading ? "opacity-50" : ""
          }`}
        >
          {
            <Col
              md={6}
              className={`form-box p-4 rounded rounded-4 position-relative`}
            >
              {(loading || login) && (
                <div className="position-relative z-2">
                  {" "}
                  <LoaderPage />
                </div>
              )}
              <Form onSubmit={loginUser}>
                <FormGroup>
                  <Input
                    required
                    onChange={handleChange}
                    type="text"
                    name="username"
                    placeholder="Username"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    required
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    autoComplete="current-password"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    className="me-2"
                    type="checkbox"
                    onChange={handleShowPassword}
                    placeholder="Password"
                    id="show"
                  />
                  <Label for="show">Show password</Label>
                </FormGroup>
                <Button
                  className="float-end"
                  color="primary"
                  outline
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log in"}
                </Button>
              </Form>
            </Col>
          }
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Login;
