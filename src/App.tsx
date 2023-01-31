import {
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import router from "./utils/Router";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer theme="dark" />
    </>
  )
}

export default App
