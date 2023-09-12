import React, { useEffect, useState } from "react";
import "./List.css";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Col,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";
import { GrPrevious, GrNext } from "react-icons/gr";
import instance from "../../helpers/inctance";
import { BsEye, BsPersonPlus, BsTrash } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineUserAdd } from "react-icons/ai";
import { Await, Link } from "react-router-dom";
import Container from "../Container";

const List = () => {
  const [open, setOpen] = useState("1");
  const [data, setData] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(0);
  const [total, setTotal] = useState(0);
  const [translated, setTranslated] = useState(false);

  async function fetchData(endpoint) {
    try {
      const res = await instance.get(endpoint);
      setData(res.data);
      setLimit(res.data?.pageInfo?.limit);
      setOffset(res.data?.pageInfo?.offset);
      setTotal(res.data?.pageInfo?.total);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setTranslated(!translated);
    fetchData("/users");
  }, []);

  function handleSearch(query) {
    fetchData(
      query === ""
        ? `/users?page[offset]=${offset}&page[limit]=${limit}`
        : `/users?q=${query}&page[offset]=${offset}&page[limit]=${limit}`
    );
  }

  async function handleDelete(id) {
    const coniform = confirm("Are you sure delete this user");
    if (coniform) {
      const res = await instance.delete(`/users/${id}`);
      fetchData("/users");
      res.status === 201 && alert("User deleted");
    }
  }

  async function toggleChange(value) {
    fetchData(`/users?page[offset]=0&page[limit]=${value}`);
  }

  function handleChange(role) {
    fetchData(
      role
        ? `/users?page[offset]=${offset}&page[limit]=${limit}&filters[role]=${role}`
        : `/users?page[offset]=${offset}&page[limit]=${limit}`
    );
  }

  function handlePage(page) {
    fetchData(`/users?page[offset]=${page}&page[limit]=${limit}`);
  }

  function pagesArray(total, limit) {
    const totalPages = Math.ceil(total / limit);
    return Array.from({ length: totalPages }, (_, index) => index);
  }

  const pages = pagesArray(total, limit);

  const toggle = (id) => {
    setOpen(id === open ? null : id);
  };

  return (
    <Container>
      <div className={`table-wrapper ${translated ? "translated" : ""}`}>
        <Accordion open={open} toggle={toggle}>
          <div className="table-title">
            <AccordionItem className="border border-0 rounded  rounded-0 ">
              <AccordionHeader className="m-0" targetId="1">
                <h2>
                  Manage <b>Employees</b>
                </h2>
              </AccordionHeader>
              <AccordionBody accordionId="1">
                <Row>
                  <Col sm={2}>
                    <Input
                      onChange={(e) => handleSearch(e.target.value.trim())}
                      type="search"
                      placeholder="Search..."
                    />
                  </Col>
                  <Col sm={2}>
                    <Input
                      onChange={(e) => handleChange(e.target.value)}
                      type="select"
                      placeholder="Search..."
                    >
                      <option value="">All</option>
                      <option value="admin">Admin</option>
                      <option value="employee">Employee</option>
                    </Input>
                  </Col>
                  <Col sm={3}>
                    <Row className="align-items-center">
                      <Col sm={4}>
                        <Label>Per Page</Label>
                      </Col>
                      <Col sm={6}>
                        <Input
                          onChange={(e) => toggleChange(e.target.value.trim())}
                          type="select"
                          value={limit}
                          placeholder="Search..."
                        >
                          <option value={1}>1</option>
                          <option value={4}>4</option>
                          <option value={8}>8</option>
                          <option value={10}>10</option>
                          <option value={12}>12</option>
                        </Input>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={3}></Col>
                  <Col sm={2}>
                    <Link to="/users/create">
                      <Button className="ps-3 py-2 shadow">
                        <AiOutlineUserAdd className="fs-4" />
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </AccordionBody>
            </AccordionItem>
          </div>
        </Accordion>
        <Table responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Fist Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Age</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((user, i) => (
              <tr key={i}>
                <td scope="row">{i + 1}</td>
                <td scope="row">{user.first_name}</td>
                <td scope="row">{user.last_name}</td>
                <td scope="row">{user.username}</td>
                <td scope="row">{user.age}</td>
                <td scope="row">{user.role}</td>

                <td className="action-table">
                  <Link to={`/users/${user._id}`}>
                    <Button color="primary" className="p-2">
                      <BsEye />
                    </Button>
                  </Link>
                  <Link to={`/users/edit/${user._id}`}>
                    <Button color="warning" className="p-2">
                      <AiOutlineEdit />
                    </Button>
                  </Link>
                  <Button
                    color="danger"
                    className="p-2"
                    onClick={() => handleDelete(user._id)}
                  >
                    <BsTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="clearfix">
          <ul className="pagination">
            {pages.at(0) === offset ? (
              <></>
            ) : (
              <li className="page-item">
                <button
                  className={`page-link`}
                  onClick={() => handlePage(offset - 1)}
                >
                  <GrPrevious />
                </button>
              </li>
            )}
            {pages.map((page, i) => (
              <li
                key={i}
                className={`page-item ${page === offset ? "active" : ""} `}
              >
                {page === offset ? (
                  <button className="page-link">{page + 1}</button>
                ) : (
                  <button
                    onClick={() => handlePage(page)}
                    className="page-link"
                  >
                    {page + 1}
                  </button>
                )}
              </li>
            ))}
            {pages.at(-1) === offset ? (
              <></>
            ) : (
              <li className="page-item">
                <button
                  className={`page-link`}
                  onClick={() => handlePage(offset + 1)}
                >
                  <GrNext />
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default List;
