import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./layouts/layout";
import App from "./pages/App";
import CreateTask, {
  loader as createTaskLoader,
  action as createTaskAction,
} from "./pages/createTask";
import EditTask, {
  loader as editTaskLoader,
  action as editTaskAction,
} from "./pages/editTask";

export default function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />

        <Route
          path="/create-task"
          element={<CreateTask />}
          loader={createTaskLoader}
          action={createTaskAction}
        />

        <Route
          path="/edit-task/:taskId"
          element={<EditTask />}
          loader={editTaskLoader}
          action={editTaskAction}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
