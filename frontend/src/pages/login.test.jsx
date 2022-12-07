import { render, screen, userEvent } from "../utils/test.utils";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import Login from "./Login";

describe("login page working test", () => {
  // check login page title shown on landing
  it("the title is visible", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByLabelText(/Login/i)).toBeInTheDocument();
  });

  // check error thrown in invalid form submit
  it("validation check on form", async () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    await userEvent.click(screen.getByRole(/submit-login/i));
    await expect(
      screen.getByText(/Please fill all fields/i)
    ).toBeInTheDocument();
  });

  // check and redirect if user already logged
  it("already logged in", async () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    if (store.getState().auth.isAuthenticated) {
      navigate("/dashboard");
    }
  });

  // submit login once form values captured
  it("login form submission", async () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    await userEvent.type(screen.getByPlaceholderText(/api key/i), "some key");
    await userEvent.type(screen.getByPlaceholderText(/name/i), "some name");
    await userEvent.click(screen.getByRole(/submit-login/i));
  });
});
