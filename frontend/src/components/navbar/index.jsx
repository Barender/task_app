import React from "react";
import reactSvg from "../../assets/react.svg";
import authActions from "../../redux/actions/auth.action";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../../redux/selectors/auth.selector";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserData());
  const [cookies, removeCookie] = useCookies(["access", "refresh"]);

  // handle logout event
  const handleLogout = () => {
    if (cookies && cookies.access && cookies.refresh) {
      dispatch(authActions.requestLogout({ refreshToken: cookies.refresh }));
    } else if (cookies && cookies.access && !cookies.refresh) {
      removeCookie("access", { path: "/" });
    } else if (cookies && cookies.refresh && !cookies.access) {
      removeCookie("refresh", { path: "/" });
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <img src={reactSvg} alt="user" className="image" />
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                {user?.name}
              </a>
            </li>
          </ul>
        </div>
        <div className="d-flex">
          <button type="button" className="btn btn-link" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
