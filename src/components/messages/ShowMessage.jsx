import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import "./messages.css";
import { useFetchData } from "../../helpers/api";
import { VscSend } from "react-icons/vsc";
import { BiArrowBack } from "react-icons/bi";
import "./messages.css";

const ShowMessage = () => {
  const { id } = useParams();

  const { data } = useFetchData(`/user-guides/${id}`);
  const user = useFetchData("/users/me");

  return (
    <Container className="bg-light shadow-sm position-relative">
      <div className="message-box overflowy-auto">
        <Link to="/messages">
          <Button color="white" className="shadow-sm py-1 ">
            {" "}
            <BiArrowBack />
          </Button>
        </Link>
        <div className="h-100 overflow-auto">
          {/* <Row className="px-md-5 px-sm-1">
            <Col></Col>
            <Col className="float-end d-flex align-items-end gap-1" sm={8}>
              <Alert className="px-2 py-1 shadow-sm" color="primary">
                <b>{data?.data?.guide?.title}</b>
                <p>{data?.data?.guide?.content}</p>
              </Alert>
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  alt="user image"
                  width={40}
                  height={40}
                  className="rounded rounded-circle border border-3"
                />
              </div>
            </Col>
          </Row> */}

          <Row className="pt-2  px-md-5 px-sm-1">
            <Col className="float-start d-flex align-items-end gap-1" sm={8}>
              <div>
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  alt="user image"
                  width={40}
                  height={40}
                  className="rounded rounded-circle border border-3"
                />
              </div>
              <Alert className="px-2 py-1 shadow-sm" color="light">
                <b>{data?.data?.guide?.title}</b>
                <p>{data?.data?.guide?.content}</p>
              </Alert>
            </Col>
          </Row>

          <Form className="position-fixed bottom-0 start-50 translate-middle-x w-50 mb-3">
            <FormGroup className="d-flex mt-4 justify-content-center align-items-center">
              <Input
                type="text"
                className="shadow-sm"
                placeholder="Write a message..."
              />
              <Button color="primary" className="shadow-sm">
                <VscSend />
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default ShowMessage;
