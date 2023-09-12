import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { BiArrowBack } from "react-icons/bi";
import instance from "../../helpers/inctance";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [exist, setExist] = useState(false); //username
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trim(),
      username,
    });
  };

  async function checkUsername(username) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const user = await instance.post("/users", JSON.stringify(formData));
      console.log(user);
    } catch (error) {
      console.error("Error:", error);
    }
    e.target.reset();
  };

  return (
    <div className="container-sm">
      <Row>
        <Col className="bg-white px-3 py-4">
          <Row>
            <Col lg={2}>
              <Link to="/users">
                <Button
                  className="bg-white shadow-sm  border border-1 border-muted"
                  color="white"
                >
                  <BiArrowBack /> <span>back</span>
                </Button>
              </Link>
            </Col>
            <Col>
              <h2>
                Create <b>User</b>
              </h2>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              {" "}
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col lg={6}>
                    <FormGroup>
                      <Label for="first_name">First name</Label>
                      <Input
                        required
                        type="text"
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
                        required
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
                        required
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
                        required
                        type="password"
                        name="password"
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
                      <Input
                        required
                        type="select"
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={(e) => handleChange(e)}
                      >
                        <option value="" selected disabled>
                          Role
                        </option>
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label for="age">Age</Label>
                      <Input
                        required
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
        </Col>
      </Row>
    </div>
  );
};

export default CreateUser;
