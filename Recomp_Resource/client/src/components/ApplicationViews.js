import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Quote from "./quote/Quote";
import AdminResource from "./resource/AdminResourceList";
import UserResource from "./resource/AdminResourceList";
import ResourceDetails from "./resource/AdminResourceList";
import ResourceEdit from "./resource/AdminResourceList";
import SavedResourceDetails from "./resource/SavedResourceList";
import SavedResourceList from "./resource/SavedResourceList";
import UserList from "./user/UserList";
import UserDetails from "./user/UserDetails";
import UserEdit from "./user/UserEdit";
import QuoteEdit from "./quote/QuoteEdit";
import QuoteList from "./quote/QuoteList";
import Login  from "./Login";
import Register from "./Register";


export default function ApplicationViews({ isLoggedIn, user }) {
  return (
    <Routes>
      <Route path="/">
        <Route index element={isLoggedIn ? <Quote /> : <Navigate to="/login" />} />
        <Route path= "resource">
          <Route path="adminList" element={isLoggedIn ? < AdminResource /> : <Navigate to="/login" />} />
          <Route path="userList" element={isLoggedIn ? < UserResource /> : <Navigate to="/login" />} />
          <Route path="details/:id" element={isLoggedIn ? < ResourceDetails /> : <Navigate to="/login" />} />
          <Route path="edit/:id" element={isLoggedIn && user?.userType == 1 ? < ResourceEdit /> : <Navigate to="/login" />} />
          <Route path="savedDetails/:id" element={isLoggedIn && user?.userType == 1 ? < SavedResourceDetails /> : <Navigate to="/login" />} />
          <Route path="savedList" element={isLoggedIn && user?.userType == 1 ? < SavedResourceList /> : <Navigate to="/login" />} />
        </Route>
        <Route path="user">
          <Route path="list" element={isLoggedIn ? < UserList /> : <Navigate to="/login" />} />
          <Route path="details/:id" element={isLoggedIn ? < UserDetails /> : <Navigate to="/login" />} />
          <Route path="edit/:id" element={isLoggedIn ? < UserEdit /> : <Navigate to="/login" />} />
        </Route>
        <Route path="quote">
          <Route path="list" element={isLoggedIn ? < QuoteList /> : <Navigate to="/login" />} />
          <Route path="edit/:id" element={isLoggedIn ? < QuoteEdit /> : <Navigate to="/login" />} />
        </Route>


        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<p>Whoops, nothing here...</p>} />
      </Route>
    </Routes>
  );
}
