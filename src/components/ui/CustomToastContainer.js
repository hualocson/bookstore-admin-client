import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomToastContainer = () => (
  <ToastContainer
    position="top-right"
    autoClose={3000}
    newestOnTop={true}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    hideProgressBar={false}
    draggable
    theme="dark"
    pauseOnHover
  />
);

export default CustomToastContainer;
