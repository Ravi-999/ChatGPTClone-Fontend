import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Pages/Home";
import MainLayout from "./components/MainLayout";
import Login from "./components/Login";
import FreeChatTab, { getSharedChatData } from "./components/FreeChatTab";
import GithubCallback from "./components/GithubCallback";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path={"/"}
        errorElement={<p>An Error Occurred</p>}
        element={<MainLayout />}
      >
        <Route index element={<Home />}></Route>
        <Route path={"/c/:chatID"} element={<Home />}></Route>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path={"/callback"} element={<GithubCallback />}></Route>
      </Route>
      <Route
        path={"/share/:shareID"}
        element={<FreeChatTab />}
        loader={getSharedChatData}
        errorElement={
          <p className="font-extrabold text-3xl inline-block absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            Page Expired!
          </p>
        }
      />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
