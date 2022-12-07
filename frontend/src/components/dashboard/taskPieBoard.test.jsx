import { BrowserRouter } from "react-router-dom";
import { render } from "../../utils/test.utils";
import { Provider } from "react-redux";
import store from "../../redux/store/store";
import TaskPieBoard from "./taskPieBoard";

describe("dashboard task pie board working test", () => {
  // first element should be div
  it("should render an <div> tag", () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <TaskPieBoard />
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
        <TaskPieBoard />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    expect(firstChild.hasAttribute("class")).toBe(true);
  });
});
