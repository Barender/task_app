import { render, screen } from "../../utils/test.utils";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import TaskContext from "../../contexts/task.context";
import store from "../../redux/store/store";
import TaskSeach from "./taskSeach";

describe("dashboard task search working test", () => {
  // component should have input element
  it("should have input element", () => {
    render(
      <Provider store={store}>
        <TaskContext.Provider value={{}}>
          <TaskSeach />
        </TaskContext.Provider>
      </Provider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });
});
