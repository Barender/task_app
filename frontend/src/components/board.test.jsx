import { BrowserRouter } from "react-router-dom";
import { render } from "../utils/test.utils";
import { Provider } from "react-redux";
import TaskContext from "../contexts/task.context";
import store from "../redux/store/store";
import Board from "./board";

describe("board component working test", () => {
  // check first element of component
  it("should render div as first element", () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <TaskContext.Provider value={{}}>
          <Board />
        </TaskContext.Provider>
      </Provider>,
      { wrapper: BrowserRouter }
    );
    expect(firstChild.tagName).toEqual("DIV");
  });

  // first element should have class attribute
  it("should have a class attribute", () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <TaskContext.Provider value={{}}>
          <Board />
        </TaskContext.Provider>
      </Provider>,
      { wrapper: BrowserRouter }
    );
    expect(firstChild.hasAttribute("class")).toBe(true);
  });
});
