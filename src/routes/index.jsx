import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/core";
import Users from "../pages/Users";
import Messages from "../pages/Messages";
import Profile from "../pages/Profile";
import Guides from "../pages/Guides";
import CreateGuide from "../components/Guides/CreateGuide";
import ShowGuide from "../components/Guides/ShowGuide";
import EditGuide from "../components/Guides/EditGuide";
import CreateUser from "../components/Users/CreateUser";
import ShowUser from "../components/Users/ShowUser";
import EditUser from "../components/Users/EditUser";
import ShowMessage from "../components/messages/ShowMessage";
import NotFound from "../pages/NotFound";
import Login from "../components/Login/Login";

const Router = () => {
  return (
    <>
      <Routes>
        <Route
          path="/guides"
          element={
            <ProtectedRoute>
              <Guides />
            </ProtectedRoute>
          }
        />
        <Route
          path="/guides/create"
          element={
            <ProtectedRoute>
              <CreateGuide />
            </ProtectedRoute>
          }
        />
        <Route
          path="/guides/:id"
          element={
            <ProtectedRoute>
              <ShowGuide />
            </ProtectedRoute>
          }
        />
        <Route
          path="/guides/edit/:id"
          element={
            <ProtectedRoute>
              <EditGuide />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/create"
          element={
            <ProtectedRoute>
              <CreateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <ShowUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/edit/:id"
          element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages/:id"
          element={
            <ProtectedRoute>
              <ShowMessage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <NotFound />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default Router;
