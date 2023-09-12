import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import instance from "../../helpers/inctance";
import { Badge } from "reactstrap";
import "./Sidebar.css";
import { ToastContainer, toast } from "react-toastify";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState(0);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getMessages() {
      const userRes = await instance.get("/users/me");
      setUser(userRes.data.data);

      const res = await instance.get("/user-guides?filters[completed]=false");
      setMessages(res.data.data);
    }
    getMessages();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  function handleLogOut() {
    const coniform = confirm("Are you sure log out");
    if (coniform) {
      localStorage.removeItem("token");
      setTimeout(() => navigate("/login"), 3000);
      toast.warning("You have succses logged out", { autoClose: 3000 });
    }
  }
  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <div className="logo_details">
        <i className="bx bxl-audible icon"></i>
        <div className="logo_name">Company</div>
        <i className="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
      </div>
      <ul className="nav-list">
        <li>
          <NavLink to="/messages" href="#">
            <i className="bx bx-chat"></i>
            <span className="link_name">
              Message{" "}
              {messages?.length > 0 && (
                <Badge color="primary" pill>
                  {messages?.length}
                </Badge>
              )}
            </span>
          </NavLink>
          <span className="tooltip">
            Message{" "}
            {messages?.length > 0 && (
              <Badge color="primary" pill>
                {messages?.length}
              </Badge>
            )}
          </span>
        </li>
        {user.role === "admin" && (
          <li>
            <NavLink to="/users" href="#">
              <i className="bx bx-group"></i>
              <span className="link_name">Users</span>
            </NavLink>
            <span className="tooltip">Users</span>
          </li>
        )}
        {user.role === "admin" && (
          <li>
            <NavLink to="/guides" href="#">
              <i className="bx bx-task"></i>
              <span className="link_name">Guides</span>
            </NavLink>
            <span className="tooltip">Guides</span>
          </li>
        )}
        <li>
          <NavLink to="/me" href="#">
            <i className="bx bx-user"></i>
            <span className="link_name">Profile</span>
          </NavLink>
          <span className="tooltip">Profile</span>
        </li>
        <li className="profile">
          <div className="profile_details">
            <div className="profile_content">
              <div className="name">
                {user?.first_name} {user?.last_name}
              </div>
              <div className="designation">{user?.role}</div>
            </div>
          </div>

          <i
            onClick={() => handleLogOut()}
            className="bx bx-log-out"
            id="log_out"
          ></i>
        </li>
      </ul>
      <ToastContainer />
    </div>
  );
};

export default Sidebar;
