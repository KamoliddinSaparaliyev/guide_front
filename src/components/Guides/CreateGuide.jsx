import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Collapse,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { BiArrowBack } from "react-icons/bi";
import instance from "../../helpers/inctance";
import "./users.css";
import Multiselect from "multiselect-react-dropdown";

const CreateGuide = () => {
  const [usersData, setUserData] = useState([]);
  const [notify, setNotify] = useState(false);
  const [selected, setSelected] = useState([]);
  const [users, setUsers] = useState([]);

  async function handleChange(e) {
    setUserData([]);

    setNotify(!notify);
  }

  useEffect(() => {
    async function fetchUsersData() {
      try {
        const res = await instance.get("/users");
        const userData = res.data?.data?.map((user) => ({
          key: `${user.first_name} ${user.first_name}`,
          cat: user._id,
        }));
        setUserData(userData);
      } catch (error) {
        console.log(error);
      }
    }

    if (!notify) {
      fetchUsersData();
    }
  }, [notify]);

  const usersIds = (arr) => {
    const user_ids = arr.map((e) => e._id);
    setUsers(user_ids);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    usersIds(selected);

    const guideData = {
      title: e.target[0].value,
      content: e.target[1].value,
      notify,
    };

    try {
      if (notify) {
        const res = await instance.post("/guides", guideData);
        console.log(res);
      } else if (!notify && users.length > 0) {
        const guide = await instance.post("/guides", guideData);
        console.log(guide);
        if (guide.data?._id) {
          const bulkData = {
            guide_id: guide.data._id,
            user_ids: users,
          };
          const res = await instance.post("/user-guides/bulk", bulkData);
          console.log(res);
        }
      } else {
        await instance.post("/guides", guideData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    e.target.reset();
  };

  return (
    <Container>
      <Row className="bg-light p-3 rounded rounded-4">
        <Col className="d-flex mt-3 gap-2">
          <Link to="/guides">
            <Button
              className="bg-white shadow-sm border border-1 border-muted"
              color="white"
            >
              <BiArrowBack /> <span>back</span>
            </Button>
          </Link>
          <h2>
            Create <b>Guide</b>
          </h2>
        </Col>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <FormGroup>
            <Label for="add_title">Title</Label>
            <Input
              type="text"
              name="title"
              id="add_title"
              required
              placeholder="Title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="add_content">Content</Label>
            <Input
              type="textarea"
              id="add_content"
              name="content"
              placeholder="Content"
            />
          </FormGroup>
          <FormGroup className="d-flex gap-1">
            <Input
              type="checkbox"
              defaultValue={notify}
              name="notify"
              id="add_notify"
              onChange={(e) => handleChange(e)}
            />
            <Label for="add_notify"> Send all</Label>
          </FormGroup>

          <Collapse isOpen={!notify}>
            <Multiselect
              className="bg-white"
              onSelect={(selectedList) => {
                setSelected(selectedList);
              }}
              displayValue="key"
              options={usersData}
            />
          </Collapse>
          <Button type="submit" color="primary" className="mt-2 float-end">
            Create
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default CreateGuide;
