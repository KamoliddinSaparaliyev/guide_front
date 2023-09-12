import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import instance from "../../helpers/inctance";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Container,
  Row,
} from "reactstrap";
import { BiArrowBack } from "react-icons/bi";
import { BsCheck2, BsCheck2All, BsFillReplyAllFill } from "react-icons/bs";

const ShowUser = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await instance.get(`/users/${id}`);
        setData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [id]);
  return (
    <Container>
      <Row>
        <Link to="/users">
          <Button
            className="bg-white shadow-sm border border-1 border-muted"
            color="white"
          >
            <BiArrowBack /> <span>back</span>
          </Button>
        </Link>
      </Row>
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
          </div>
          <div>
            <b>{data?.username}</b>{" "}
            <small className="text-muted">({data?.role})</small>
          </div>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ShowUser;
