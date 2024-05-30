import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./layouts/layout";
import App from "./pages/App";
import CreateTask from "./pages/createTask";

export default function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<App />} />

        <Route path="/create-task" element={<CreateTask />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
