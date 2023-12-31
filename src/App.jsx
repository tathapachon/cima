import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../src/pages/Login/Login.jsx";
import Projects from "../src/pages/Project/Projects.jsx";
import CreateProject from "../src/pages/Project/Create/CreateProject.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useIsUserAuthenticated from "../../frontend/src/pages/Private/PrivateRoute.jsx";
import Blogs from "./pages/Blog/Blogs.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Featureds from "./pages/Featured/Featureds.jsx"
import Contact from "./pages/Contact/Contact.jsx";
import About from "./pages/About/About.jsx";
import CreateBlog from "../../frontend/src/pages/Blog/Create/CreateBlog.jsx";
import Preview from "./components/Preview/Preview.jsx";
import Forgot from "./pages/Forgot/Forgot.jsx";
const App = () => {
  const authenticated = useIsUserAuthenticated(); // Utiliza el hook correctamente
  console.log("isAuthenticated ", authenticated);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/inicio" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/home" element={<Admin/>} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<CreateBlog/>} />
        <Route path="/blog" element={<CreateBlog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project" element={<CreateProject/>} />
        <Route path="/featureds" element={<Featureds />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About/>} />
        <Route path="/principalForm" element={<Preview/>} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
