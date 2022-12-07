import { render, screen } from "../utils/test.utils";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import Board from "../components/board";

describe("dashboard page working test", () => {
  // check first card (on top) of dashboard has no tasks
  it("show zero task", async () => {
    render(
      <Provider store={store}>
        <Board />
      </Provider>,
      { wrapper: BrowserRouter }
    );
    if (store.getState().auth.isAuthenticated) {
      await expect(screen.getAllByTitle(/task-completed/i)).toBeInTheDocument();
      await expect(screen.getAllByTitle(/latest-task/i)).toBeInTheDocument();
      await expect(screen.getAllByTitle(/pie-board/i)).toBeInTheDocument();
    }
  });
});
