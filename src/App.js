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
      </Route>
      <Route
        path={"/share/:shareID"}
        element={<FreeChatTab />}
        loader={getSharedChatData}
      />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
