import React from "react";
import NewInput from "../components/ui_wrapper/input";
import authActions from "../redux/actions/auth.action";
import NewButton from "../components/ui_wrapper/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectIsAuthenticated,
  selectLoaderStatus,
} from "../redux/selectors/auth.selector";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loader = useSelector(selectLoaderStatus());
  const isAuthenticated = useSelector(selectIsAuthenticated());

  // form state
  const [state, setState] = React.useState({
    apiKey: "",
    name: "",
    error: "",
  });
  const { apiKey, name, error } = state;

  // control form
  function handleChange(e) {
    const { name, value } = e.target;
    setState(() => ({
      ...state,
      [name]: value,
      error: "",
    }));
  }

  // auth check
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.setLoaderStatus(true));
    if (apiKey === "" || name === "") {
      dispatch(authActions.setLoaderStatus(false));
      return setState(() => ({
        ...state,
        error: "Please fill all fields",
      }));
    } else if (name && apiKey && error === "") {
      dispatch(
        authActions.requestLogin({
          apiKey,
          name,
        })
      );
      setState({
        apiKey: "",
        name: "",
        error: "",
      });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="card flexible-width">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="login"
              className="mb-3 fs-2 text-secondary"
              id="login"
              aria-label="login"
            >
              Login
            </label>
            <div className="mb-3">
              <NewInput
                type="text"
                className="form-control"
                id="id"
                placeholder="Id"
                name="apiKey"
                value={apiKey}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <NewInput
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="d-grid mb-3">
              <NewButton
                type="submit"
                className="btn btn-primary"
                role="submit-login"
                disabled={loader}
              >
                {loader ? "Submitting..." : "Login"}
              </NewButton>
            </div>
            <p className="text-danger text-center my-2" title="error">
              {error}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Login);
