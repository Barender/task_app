import React from "react";
import cookie from "js-cookie";
import Login from "./pages/Login";
import Public from "./layouts/public";
import Private from "./layouts/private";
import Dashboard from "./pages/Dashboard";
import LoadingBar from "react-top-loading-bar";
import authActions from "./redux/actions/auth.action";
import { selectLoaderStatus } from "./redux/selectors/auth.selector";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const loader = useSelector(selectLoaderStatus());
  const pageRef = React.useRef(null);

  // progress loader
  React.useEffect(() => {
    if (loader) {
      pageRef.current.continuousStart();
    } else {
      pageRef.current.complete();
    }
  }, [loader]);

  // validating auth
  React.useEffect(() => {
    if (cookie.get("access") && cookie.get("refresh")) {
      dispatch(authActions.setAuthStatus(true));
    }
  }, []);
  return (
    <>
      <LoadingBar color="#0d6efd" ref={pageRef} />
      <Routes>
        <Route path="/" element={<Public />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/dashboard" element={<Private />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="*" element={<>404 Not Found</>} />
      </Routes>
    </>
  );
}

export default App;
