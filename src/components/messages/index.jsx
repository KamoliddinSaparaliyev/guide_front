import React, { useEffect, useState } from "react";
import instance from "../../helpers/inctance";
import { ListGroup, ListGroupItem, Container, Card } from "reactstrap";
import { Link } from "react-router-dom";

const ListMessages = () => {
  const [notCompleted, setNotCompleted] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [notCompletedResponse, completedResponse, allRes] =
          await Promise.all([
            instance.get("/user-guides?filters[completed]=false"),
            instance.get("/user-guides?filters[completed]=true"),
            instance.get("/user-guides"),
          ]);

        setData(allRes.data.data);
        setNotCompleted(notCompletedResponse.data.data);
        setCompleted(completedResponse.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const markAsCompleted = async (userGuideId) => {
    try {
      await instance.patch(`/user-guides/${userGuideId}`);

      setNotCompleted((prevNotCompleted) =>
        prevNotCompleted.filter((guide) => guide._id !== userGuideId)
      );
    } catch (error) {
      console.error(`Error marking UserGuide as completed: ${error}`);
    }
  };

  return (
    <Container>
      <h2>
        <b>Messages</b>
      </h2>
      <div className="shadow rounded rounded-4 p-3 bg-light">
        <Card style={{ height: "89vh", overflow: "auto" }}>
          {data.length > 0 ? (
            <ListGroup>
              {notCompleted.map((m) => (
                <Link
                  onClick={() => markAsCompleted(m._id)}
                  to={`/messages/${m._id}`}
                  key={m._id}
                  className="text-decoration-none"
                >
                  <ListGroupItem
                    action={true}
                    className="d-flex align-items-center m-0 gap-2"
                  >
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                      alt="user image"
                      width={50}
                      height={50}
                      className="rounded rounded-circle border border-3"
                    />
                    <div>
                      <b className="">Admin</b>
                      <div>
                        <b className="mb-1 ms-1">{m.guide?.title}</b>
                      </div>
                    </div>
                  </ListGroupItem>
                </Link>
              ))}
              {completed.map(
                (m) =>
                  m.guide && (
                    <Link
                      to={`/messages/${m._id}`}
                      key={m._id}
                      className="text-decoration-none"
                    >
                      <ListGroupItem
                        action={true}
                        className="d-flex align-items-center m-0 gap-2"
                      >
                        <img
                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                          alt="user image"
                          width={50}
                          height={50}
                          className="rounded rounded-circle border border-3"
                        />
                        <div className="d-flex flex-column">
                          <p className="mb-0">Admin</p>
                          <p className="mb-1 ms-1">{m.guide.title}</p>
                        </div>
                      </ListGroupItem>
                    </Link>
                  )
              )}
            </ListGroup>
          ) : (
            <center>No message</center>
          )}
        </Card>
      </div>
    </Container>
  );
};

export default ListMessages;
