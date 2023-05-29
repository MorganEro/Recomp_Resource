import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Random from "./quote/Random";
import AdminResourceList from "./resource/AdminResourceList";
import ResourceEdit from "./resource/ResourceEdit";
import SavedResourceDetails from "./resource/SavedResourceDetails";
import UserList from "./user/UserList";
import UserDetails from "./user/UserDetails";
import UserEdit from "./user/UserEdit";
import QuoteEdit from "./quote/QuoteEdit";
import QuoteList from "./quote/QuoteList";
import Login  from "./Login";
import Register from "./Register";
import MyProfile from "./user/MyProfile";
import AddQuote from "./quote/AddQuote";
import AddResource from "./resource/AddResource";
import EnterComment from "./comment/EnterComment";
import UserResourceList from "./resource/UserResourceList";
import AdminResourceDetails from "./resource/AdminResourceDetails";
import UserResourceDetails from "./resource/UserResourceDetails";
import UserListCarousel from "./user/UserListCarousel";
import MessageList from "./message/MessageList";
import CreateMessage from "./message/CreateMessage";
import MessageDetails from "./message/MessageDetails";





export default function ApplicationViews({ isLoggedIn }) {
  return (
    <Routes>
      <Route path="/">
        <Route index element={isLoggedIn ? <Random /> : <Navigate to="/login" />} />
        <Route path= "resource">
            <Route path="adminList" element={< AdminResourceList /> } />
            <Route path="userList" element={< UserResourceList /> } />
            <Route path="create" element={< AddResource /> } />
            <Route path="enterComment" element={< EnterComment /> } />
            <Route path="adminDetails/:id" element={< AdminResourceDetails /> } />
            <Route path="userDetails/:id" element={< UserResourceDetails /> } />
            <Route path="edit/:id" element={< ResourceEdit /> } />
            <Route path="savedDetails/:id" element={ < SavedResourceDetails />} />
        </Route>
        <Route path="user">
            <Route path="list" element={< UserList /> } />
            <Route path="listCarousel" element={< UserListCarousel /> } />
            <Route path="details/:id" element={< UserDetails /> } />
            <Route path="edit/:id" element={< UserEdit />  }  />
            <Route path="myProfile" element={< MyProfile /> } />
        </Route>
        <Route path="quote">
            <Route path="list" element={< QuoteList />} />
            <Route path="create" element={  < AddQuote /> } />
            <Route path="edit/:id" element={< QuoteEdit /> } />
        </Route>
        <Route path="message">
            <Route path="list" element={< MessageList />} />
            <Route path="create" element={  < CreateMessage /> } />
            <Route path="details/:id" element={< MessageDetails /> } />
        </Route>


        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<p>Whoops, nothing here...</p>} />
      </Route>
    </Routes>
  );
}
