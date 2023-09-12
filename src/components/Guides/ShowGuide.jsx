import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import instance from "../../helpers/inctance";
import {
  Button,
  Card,
  CardHeader,
  CardText,
  CardTitle,
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

const ShowGuide = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [notify, setNotify] = useState(true);
  const [formData, setFormData] = useState({});

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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleEdit() {
    setOpen(!open);
  }

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
        <Col className="bg-white p-4 pt-3 shadow" sm={11}>
          <Link to="/guides">
            <Button
              className="bg-white shadow-sm border border-1 border-muted mb-3"
              color="white"
            >
              <BiArrowBack /> <span>back</span>
            </Button>
          </Link>
          <Row>
            <Col className="bg-light pb-5">
              <Card className="h-75" body>
                <CardHeader className="bg-white">
                  <CardTitle tag="h5">{data.title}</CardTitle>
                </CardHeader>
                <CardText className="m-2">{data.content}</CardText>
              </Card>
              <Row>
                <Col className="d-flex align-items-start my-2">
                  <p>
                    Send to <b>{data.revisions}</b>
                  </p>
                </Col>
              </Row>
              <Button
                onClick={handleEdit}
                className="float-end"
                outline
                color="primary"
              >
                {open ? "Cancel" : "Edit"}
              </Button>
            </Col>
            <Collapse className="bg-light" isOpen={open}>
              {" "}
              <h2>
                Edit <b>Guide</b>
              </h2>
              <Form onSubmit={(e) => handleSubmit(e)}>
                <FormGroup>
                  <Label for="edit_title">Title</Label>
                  <Input
                    onChange={(e) => handleChange(e)}
                    type="text"
                    id="edit_title"
                    name="title"
                    placeholder="Title"
                    defaultValue={data?.title}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="content">Content</Label>
                  <Input
                    onChange={(e) => handleChange(e)}
                    type="textarea"
                    id="content"
                    name="content"
                    placeholder="Content"
                    defaultValue={data?.content}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    onChange={toggleChange}
                    className="me-2"
                    type="checkbox"
                    name="notify"
                    id="edit_notify"
                  />
                  <Label for="edit_notify">Send all</Label>
                </FormGroup>
                <Button color="primary" className="float-end">
                  Save
                </Button>
              </Form>
            </Collapse>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ShowGuide;
