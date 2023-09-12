import React, { useEffect, useState } from "react";
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
import LoaderPage from "../Loader/loader";
import { GrPrevious, GrNext } from "react-icons/gr";
import instance from "../../helpers/inctance";
import { VscInbox } from "react-icons/vsc";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsEye, BsTrash } from "react-icons/bs";
import Container from "../Container";
import { BiMessageAdd } from "react-icons/bi";

const List = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(0);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState("");
  const [translated, setTranslated] = useState(false);

  useEffect(() => {
    setTranslated(true);
    fetchData("/guides");
  }, []);

  async function fetchData(end) {
    try {
      const res = await instance.get(end);
      setData(res.data);
      setLimit(res.data.pageInfo?.limit);
      setOffset(res.data.pageInfo?.offset);
      setTotal(res.data.pageInfo?.total);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSearch(e) {
    if (e.trim() === "") {
      fetchData(`/guides?page[offset]=${offset}&page[limit]=${limit}`);
    } else {
      fetchData(`/guides?page[offset]=${offset}&page[limit]=${limit}&q=${e}`);
    }
  }

  async function handleDelete(id) {
    const coniform = confirm(
      "Are you sure you want to delete these Records? This action cannot be undone."
    );
    if (coniform) {
      await instance.delete(`/guides/${id}`);

      fetchData(`/guides?page[offset]=${offset}&page[limit]=${limit}`);
    }
  }

  function handleChange(value) {
    fetchData(`/guides?page[offset]=0&page[limit]=${value}`);
  }

  function handlePage(page) {
    fetchData(`/guides?page[offset]=${page}&page[limit]=${limit}`);
  }

  function titleSlice(text) {
    if (text.length <= 20) {
      return text;
    } else {
      return text.slice(0, 20) + "...";
    }
  }

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  function pagesArr(total, limit) {
    const mathpages = Math.ceil(total / limit);

    const array = [];
    for (let i = 0; i < mathpages; i++) {
      array.push(i);
    }
    return array;
  }

  const pages = pagesArr(total, limit);

  return (
    <Container>
      <div className={`table-wrapper shadow ${translated ? "translated" : ""}`}>
        <Accordion open={open} toggle={toggle}>
          <div className="table-title">
            <AccordionItem className="border border-0 rounded  rounded-0 ">
              <AccordionHeader className="m-0" targetId="1">
                <h2>
                  Manage <b>Guides</b>
                </h2>
              </AccordionHeader>
              <AccordionBody accordionId="1">
                <Row>
                  <Col sm={2}>
                    <Input
                      type="search"
                      onChange={(e) => handleSearch(e.target.value.trim())}
                      placeholder="Search..."
                    />
                  </Col>

                  <Col sm={3}>
                    <Row className="align-items-center">
                      <Col sm={4}>
                        <Label for="per_page" className="text-dark">
                          Per Page
                        </Label>
                      </Col>
                      <Col sm={6}>
                        <Input
                          id="per_page"
                          type="select"
                          value={limit}
                          onChange={(e) => handleChange(e.target.value)}
                          placeholder="Search..."
                        >
                          <option value={4}>4</option>
                          <option value={8}>8</option>
                          <option value={10}>10</option>
                          <option value={12}>12</option>
                        </Input>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={5}></Col>
                  <Col sm={2}>
                    <Link to="/guides/create">
                      <Button className="ps-3 py-2 shadow">
                        <BiMessageAdd className="fs-4" />
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </AccordionBody>
            </AccordionItem>
          </div>
        </Accordion>
        <>
          {!loading ? (
            <>
              {" "}
              {data?.data?.length === 0 ? (
                <center>
                  <div>
                    <VscInbox className="display-4 text-secondary" />
                    <p>No data</p>
                  </div>
                </center>
              ) : (
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th scope="row">#</th>
                      <th>Content</th>
                      <th>Title</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.map((guide, i) => (
                      <tr key={i}>
                        <td scope="row">{i + 1}</td>
                        <td>{guide.title}</td>
                        <td>{titleSlice(guide.content)}</td>

                        <td className="action-table">
                          <Link to={`/guides/${guide._id}`}>
                            <Button color="primary" className="p-2">
                              <BsEye />
                            </Button>
                          </Link>
                          <Link to={`/guides/edit/${guide._id}`}>
                            <Button color="warning" className="p-2">
                              <AiOutlineEdit />
                            </Button>
                          </Link>
                          <Button
                            color="danger"
                            className="p-2"
                            onClick={() => handleDelete(guide._id)}
                          >
                            <BsTrash />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </>
          ) : (
            <LoaderPage />
          )}
          {data?.data?.length > 0 ? (
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
                {pages.map((page) => (
                  <li
                    key={page}
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
          ) : (
            <></>
          )}
        </>
      </div>
    </Container>
  );
};

export default List;
