import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "./components/home/index";
import Login from "./components/login/index";
import Profile from "./components/profile/index";
import Register from "./components/register/index";
import BoardUser from "./components/boardUser/index";
import BoardAdmin from "./components/boardAdmin/index";
import BoardModerator from "./components/boardModerator/index";

import EventBus from "./common";

import { logout } from "./slices/auth";

function App() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = useCallback(() => {
      dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }

    EventBus.on("logout", () => {
      logout();
    });
    return ()=>{
      EventBus.remove("logout")
    }
  },[currentUser,logout]);

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">
            SignUpApi
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">Home</Link>
            </li>
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link" >Moderator Board</Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to ={"/admin"} className="nav-link" >Admin Board</Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">User</Link>
              </li>
            )}
          </div>
          {
            currentUser?(
              <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">{currentUser.username}</Link>
              </li>
              <li className="nav-item">
                <Link to={"/logout"} className="nav-link" onClick={logout}>Logout</Link>
              </li>
              </div>
            ):(
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                   <Link to={"/signup"} className="nav-link">Sign Up</Link>
                </li>
              </div>
            )
          }
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;
