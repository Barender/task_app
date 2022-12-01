import React from "react";
import Navbar from "../components/navbar";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { selectIsAuthenticated } from "../redux/selectors/auth.selector";

const Private = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated());

  // check auth
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default React.memo(Private);
