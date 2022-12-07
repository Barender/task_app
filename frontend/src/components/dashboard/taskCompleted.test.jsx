import { render, screen } from "../../utils/test.utils";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import TaskCompleted from "./taskCompleted";

describe("dashboard task completed working test", () => {
  // component should have title
  it("should have title", () => {
    render(
      <Provider store={store}>
        <TaskCompleted />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByText(/Task Completed/i)).toBeInTheDocument();
  });
});
