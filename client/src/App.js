import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./home/Home";
import { useState } from "react";
import DataProvider from "./utils/context/DataProvider";
import NotificationsProvider from "./utils/context/NotificationsProvider";
import CreatePost from "./pages/CreatePost";
import ViewPost from "./pages/ViewPost";
import EditPost from "./pages/EditPost";
import ViewApplications from "./pages/ViewApplications";
import ViewApplication from "./pages/ViewApplication";
import About from "./components/About";
const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ?
    <>
      <Outlet />
    </>
    :
    <Navigate replace to="/login" />
}
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <DataProvider>
      <NotificationsProvider>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/" element={<Home />}></Route>
              </Route>
              <Route path="/create" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/create" element={<CreatePost />}></Route>
              </Route>

              <Route path="/post/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/post/:id" element={<ViewPost />}></Route>
              </Route>
              <Route path="/post/edit/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/post/edit/:id" element={<EditPost />}></Route>
              </Route>

              <Route path="/applications" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/applications" element={<ViewApplications />}></Route>
              </Route>

              <Route path="/application/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                <Route path="/application/:id" element={<ViewApplication />}></Route>
              </Route>


              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

            </Routes>

          </div>
        </BrowserRouter>
      </NotificationsProvider>
    </DataProvider>
  );
}

export default App;
