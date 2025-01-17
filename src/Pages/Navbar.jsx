import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage } from "../redux/reducers/pagesReducer";
import { getAllPages } from "../redux/actions/pages";
import { toast } from "react-toastify";
import Loader from "../Components/Layout/Loader/Loader";
import Contact from "../Components/Contact/Contact";
import { logout } from "../redux/actions/user";
import { getLogo } from "../redux/actions/other";
import mainlogo from "../assets/mainlogo.png";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("All");
  const [showContact, setShowContact] = useState(false);

  const location = useLocation();
  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActive(path ? path.charAt(0).toUpperCase() + path.slice(1) : "All");
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (item) => {
    setActive(item);
  };

  const { pages, loading, error, message } = useSelector(
    (state) => state.pages
  );
  const { logo } = useSelector((state) => state.other);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.info(message);
      dispatch(clearMessage());
    }
    dispatch(getLogo());
    dispatch(getAllPages());
  }, [dispatch, error, message]);

  const formatTitleForUrl = (title) => {
    return title.replace(/ & /g, "").replace(/ /g, "").toLowerCase();
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  if (!pages || loading) {
    return <Loader />;
  }

  return (
    <>
      <nav className="bg-green-200 px-4 py-2 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4 py-2">
          {/* Logo */}
          <div className="flex items-center md:flex md:mr-2">
            <Link to="/" className="flex items-center">
              {logo ? (
                <img
                  src={logo.logoImage.url}
                  alt="Logo"
                  className="h-12 w-auto"
                />
              ) : (
                <img src={mainlogo} alt="Logo" className="h-10 w-auto" />
              )}
            </Link>
          </div>

          {/* Right-aligned Links and Button */}
          <div className="flex-grow flex justify-end items-center space-x-4 lg:space-x-8">
            <div className="hidden md:flex justify-center items-center space-x-4 lg:space-x-8">
              <Link
                to="/"
                className={`text-black-300 hover:text-black cursor-pointer px-2 py-1 rounded-md ${
                  active === "All" ? "bg-green-500 text-white" : ""
                }`}
                onClick={() => handleClick("All")}
              >
                Home
              </Link>

              {pages.map((page) => (
                <Link
                  key={page._id}
                  to={`/${formatTitleForUrl(page.title.toLowerCase())}`}
                  state={{
                    title: page.title,
                    content: page.content,
                    metaKeywords: page.metaKeywords,
                    metaDescription: page.metaDescription,
                  }}
                  className={`text-black-300 hover:text-black cursor-pointer px-2 py-1 rounded-md ${
                    active === page.title ? "bg-green-500 text-white" : ""
                  }`}
                  onClick={() => handleClick(page.title)}
                >
                  {page.title}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <button
                onClick={() => setShowContact(true)}
                className="text-white hover:bg-green-800 lg:px-4 md:px-2 py-2 bg-green-900 rounded"
              >
                Contact Us
              </button>
              {isAuthenticated ? (
                <button
                  onClick={logoutHandler}
                  className="text-white hover:bg-red-500 px-2 lg:px-4 py-1 bg-red-400 rounded"
                >
                  Logout
                </button>
              ) : (
                <></>
              )}
            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center focus:outline-none"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-green-200">
            <div className="flex flex-col space-y-2 p-4">
              <Link
                to="/"
                className={`text-black-300 hover:text-black cursor-pointer px-2 py-1 rounded-md ${
                  active === "All" ? "bg-green-500 text-white" : ""
                }`}
                onClick={() => handleClick("All")}
              >
                Home
              </Link>

              {pages.map((page) => (
                <Link
                  key={page._id}
                  to={`/${formatTitleForUrl(page.title.toLowerCase())}`}
                  state={{
                    title: page.title,
                    content: page.content,
                    metaKeywords: page.metaKeywords,
                    metaDescription: page.metaDescription,
                  }}
                  className={`text-black-300 hover:text-black cursor-pointer px-2 py-1 rounded-md ${
                    active === page.title ? "bg-green-500 text-white" : ""
                  }`}
                  onClick={() => handleClick(page.title)}
                >
                  {page.title}
                </Link>
              ))}
              <button
                onClick={() => setShowContact(true)}
                className="text-white hover:text-black px-4 py-2 bg-green-900 rounded"
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </nav>

      <Contact show={showContact} onClose={() => setShowContact(false)} />
    </>
  );
};

export default Navbar;
