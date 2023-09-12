import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import instance from "../../helpers/inctance";
import { BiArrowBack } from "react-icons/bi";

const EditGuide = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({});
  const [notify, setNotify] = useState(false);
  useEffect(() => {
    async function fetchGuideData() {
      const res = await fetch(`/api/guides/${id}`);
      setData(res?.data);
    }

    fetchGuideData();
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await instance.get(`/guides/${id}`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setNotify(!notify);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.trim(),
    });
  };

  function toggleChange() {
    setNotify(!notify);
    setFormData({
      ...formData,
      notify,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance.patch(`/guides/${id}`, JSON.stringify(formData));
      const { data } = await instance.get(`/guides/${id}`);
      setData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col className="bg-light p-3">
          <Link to="/guides">
            <Button
              className="gap-1 bg-white shadow-sm mb-3 border border-1 border-muted"
              color="white"
            >
              <BiArrowBack />
              <span className="text-decoration-none">back</span>
            </Button>
          </Link>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                defaultValue={data?.title}
                name="title"
                id="title"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="content">Content</Label>
              <Input
                type="textarea"
                defaultValue={data?.content}
                name="content"
                id="content"
                value={formData.content}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Input
                onChange={toggleChange}
                className="me-2"
                defaultValue={notify}
                type="checkbox"
                name="notify"
                id="edit_notify"
              />
              <Label for="edit_notify">Send all</Label>
            </FormGroup>
            <Button className="float-end" color="primary" type="submit">
              Save
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditGuide;
