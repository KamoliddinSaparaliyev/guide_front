import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Collapse,
  Container,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { AiOutlineEdit } from "react-icons/ai";
import instance from "../../helpers/inctance";
import { BsCheck2, BsCheck2All, BsFillReplyAllFill } from "react-icons/bs";

const ProfileMe = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [exist, setExist] = useState(false); //username
  const [formData, setFormData] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchUserData() {
      const res = await instance.get(`/users/me`);
      setData(res.data.data);
    }

    fetchUserData();
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  async function checkUsername(username) {
    if (username === "") return;

    const { data } = await instance.get(
      `/users?username=${username.toLowerCase()}`
    );

    if (data?.length > 0) {
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
    console.log(e);
    e.preventDefault();
    try {
      await instance.patch(`/users/me`, JSON.stringify(formData));
      const res = await instance.get(`/users/me`);
      setData(res.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
    e.target.reset;
  };

  return (
    <Container>
      <Card className="my-2">
        <div className="position-relative">
          <CardImg
            alt="Card image cap"
            src="https://img.freepik.com/free-vector/elegant-white-wallpaper-with-golden-details_23-2149095007.jpg?w=1380&t=st=1694348201~exp=1694348801~hmac=a4909bdcf1a958b8c3a732518692f2e5b57caa22b94ed88e78e87f44bdb64b4d"
            style={{
              objectFit: "cover",
            }}
            height={210}
            top
          />
          <div className="position-absolute border border-5 rounded rounded-circle top-50  start-50 translate-middle">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              alt="user image"
              width={200}
              className="rounded rounded-circle img-fluid"
              height={200}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <div className="d-flex align-items-center gap-1">
            <BsFillReplyAllFill />
            <Badge color="primary">{data?.total_guides}</Badge>{" "}
          </div>
          <div className="d-flex align-items-center gap-1">
            <BsCheck2 />
            <Badge color="danger">{data?.todo_guides}</Badge>{" "}
          </div>
          <div className="d-flex align-items-center gap-1">
            <BsCheck2All />
            <Badge color="success">{data?.read_guides}</Badge>{" "}
          </div>
        </div>
        <CardBody>
          <div className="d-flex align-items-center justify-content-between">
            <CardTitle tag="h5">
              {" "}
              {data?.first_name} {data?.last_name}{" "}
              <small className="text-muted">{data?.age}</small> y.o
            </CardTitle>
            <Button onClick={toggle} color="dark " outline>
              <AiOutlineEdit />
            </Button>
          </div>
          <div>
            <b>{data?.username}</b>{" "}
            <small className="text-muted">({data?.role})</small>
          </div>
        </CardBody>
        <Collapse className="px-2" isOpen={isOpen}>
          <Row className="mt-3">
            <Col className="p-3">
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
                  {data?.role === "admin" && (
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
                  )}
                </Row>
                <Row>
                  {data?.role === "admin" && (
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
                  )}
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
        </Collapse>
      </Card>
    </Container>
  );
};

export default ProfileMe;
