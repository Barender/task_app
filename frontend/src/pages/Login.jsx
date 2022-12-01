import React from "react";
import authActions from "../redux/actions/auth.action";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "../redux/selectors/auth.selector";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    if (apiKey == "" || name == "") {
      return setState(() => ({
        ...state,
        error: "Please fill all fields",
      }));
    } else if (name && apiKey && error == "") {
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
            <label className="mb-3 fs-2 text-secondary">Login</label>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="id"
                placeholder="id"
                name="apiKey"
                value={apiKey}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p className="text-danger text-center my-2">{error}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Login);
