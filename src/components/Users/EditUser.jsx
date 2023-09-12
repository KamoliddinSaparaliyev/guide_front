import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import instance from "../../helpers/inctance";
import { BiArrowBack } from "react-icons/bi";

const EditUser = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [username, setUsername] = useState("");
  const [exist, setExist] = useState(false); //username
  const [formData, setFormData] = useState({});

  useEffect(() => {
    async function fetchUserData() {
      const res = await instance.get(`/users/${id}`);
      setData(res.data.data);
    }

    fetchUserData();
  }, [id]);

  async function checkUsername(username) {
    if (username === "") return;

    const { data } = await instance.get(
      `/users?username=${username.toLowerCase()}`
    );

    if (data?.data?.length > 0) {
      setExist(true);
    } else {
      setUsername(username);
      setExist(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trim(),
      username,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance.patch(`/users/${id}`, JSON.stringify(formData));
      const res = await instance.get(`/users/${id}`);
      setData(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <Row className="bg-light p-3">
        <Link to="/users">
          <Button
            className="bg-white mb-3 shadow-sm border border-1 border-muted"
            color="white"
          >
            <BiArrowBack /> <span>back</span>
          </Button>
        </Link>
        <Col>
          {" "}
          <form onSubmit={handleSubmit}>
            <Row>
              <Col lg={6}>
                <FormGroup>
                  <Label for="first_name">First name</Label>
                  <Input
                    type="text"
                    defaultValue={data?.first_name}
                    name="first_name"
                    id="first_name"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label for="last_name">Last name</Label>
                  <Input
                    defaultValue={data?.last_name}
                    type="text"
                    name="last_name"
                    id="last_name"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <FormGroup className="position-relative">
                  <Label for="username">Username</Label>
                  <Input
                    defaultValue={data?.username}
                    invalid={exist ? true : false}
                    type="text"
                    name="username"
                    id="username"
                    onChange={(e) => checkUsername(e.target.value.trim())}
                  />
                  <FormFeedback tooltip>
                    Oh noes! that username is already taken
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label for="passowrd">Passowrd</Label>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    id="password"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <FormGroup>
                  <Label for="role">Role</Label>
                  <select
                    className="form-select"
                    type="select"
                    name="role"
                    id="role"
                    onChange={(e) => handleChange(e)}
                    defaultValue={data?.role}
                  >
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                  </select>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label for="age">Age</Label>
                  <Input
                    defaultValue={data?.age}
                    type="number"
                    min={0}
                    name="age"
                    id="age"
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button
              disabled={exist}
              className="float-end"
              color="primary"
              type="submit"
            >
              Save
            </Button>
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default EditUser;
