import { render, screen } from "../../utils/test.utils";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import TaskContext from "../../contexts/task.context";
import store from "../../redux/store/store";
import TaskBox from "./taskBox";

describe("dashboard task box working test", () => {
  // component should have checkbox
  it("should render an input element", () => {
    render(
      <Provider store={store}>
        <TaskContext.Provider value={{}}>
          <TaskBox />
        </TaskContext.Provider>
      </Provider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByRole(/checkbox/i)).toBeInTheDocument();
  });
});
