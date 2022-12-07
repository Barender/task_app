import { BrowserRouter } from "react-router-dom";
import { render } from "../../utils/test.utils";
import { Provider } from "react-redux";
import TaskContext from "../../contexts/task.context";
import store from "../../redux/store/store";
import TaskList from "./taskList";

describe("dashboard task list working test", () => {
  // first element should be div
  it("should render an <div> tag", () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <TaskContext.Provider value={{}}>
          <TaskList />
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
          <TaskList />
        </TaskContext.Provider>
      </Provider>,
      { wrapper: BrowserRouter }
    );
    expect(firstChild.hasAttribute("class")).toBe(true);
  });
});
