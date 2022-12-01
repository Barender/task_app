import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import cookie from "js-cookie";
import Login from "./pages/Login";
import Public from "./layouts/public";
import Private from "./layouts/private";
import Dashboard from "./pages/Dashboard";
import authActions from "./redux/actions/auth.action";

function App() {
  const dispatch = useDispatch();

  // validating auth
  React.useEffect(() => {
    if (cookie.get("access") && cookie.get("refresh")) {
      dispatch(authActions.setAuthStatus(true));
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Public />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="/dashboard" element={<Private />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="*" element={<>404 Not Found</>} />
    </Routes>
  );
}

export default React.memo(App);
