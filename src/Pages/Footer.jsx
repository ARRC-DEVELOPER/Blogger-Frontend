import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import Contact from "../Components/Contact/Contact"; // Import the Contact component

function Footer() {
  const [showContact, setShowContact] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { logo } = useSelector((state) => state.other);

  return (
    <>
      <footer className="bg-black dark:bg-gray-900 text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-6 lg:py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8">
            <div className="flex flex-col items-start lg:items-center">
              <div className="mb-4 h-12 w-12 rounded-full flex">
                {logo ? (
                  <img
                    src={logo.logoImage.url}
                    alt="Logo"
                    className="h-12 w-12 rounded-full object-contain"
                  />
                ) : (
                  <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />
                )}
              </div>

              <div>
                {isAuthenticated ? (
                  <div className="bg-green-900 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center">
                    <UserOutlined style={{ fontSize: "1.5rem" }} />
                    <span className="ml-2">{user.name}</span>
                  </div>
                ) : (
                  <Link to="/login">
                    <button className="bg-green-900 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold text-green-700 uppercase dark:text-green-600">
                Food
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/food/restaurant" className="hover:underline">
                    Restaurant
                  </Link>
                </li>
                <li>
                  <Link to="/food/streetfood" className="hover:underline">
                    Street Food
                  </Link>
                </li>
                <li>
                  <Link to="/food/lunchWithStar" className="hover:underline">
                    Lunch with Star
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold text-green-700 uppercase dark:text-green-600">
                Travel
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Travel
                  </Link>
                </li>
                <li>
                  <Link to="/travel/spiritual" className="hover:underline">
                    Spiritual
                  </Link>
                </li>
                <li>
                  <Link to="/travel/national" className="hover:underline">
                    National
                  </Link>
                </li>
                <li>
                  <Link to="/travel/international" className="hover:underline">
                    International
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold text-green-700 uppercase dark:text-green-600">
                Family & Fun
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/familyfun/challenge" className="hover:underline">
                    Challenge
                  </Link>
                </li>
                <li>
                  <Link to="/familyfun/rahanVeg" className="hover:underline">
                    Rahan's Vlog
                  </Link>
                </li>
                <li>
                  <Link to="/familyfun/oreeMummy" className="hover:underline">
                    Ovee & Mumma
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold text-green-700 uppercase dark:text-green-600">
                Quick Links
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/quickLink/womenEmpowerment" className="hover:underline">
                    Women Empowerment
                  </Link>
                </li>
                <li>
                  <Link to="/quickLink/award" className="hover:underline">
                    Awards
                  </Link>
                </li>
                <li>
                  <Link to="/quickLink/foundation" className="hover:underline">
                    Foundation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold text-green-700 uppercase dark:text-green-600">
                Recipe
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link to="/recipe/veg" className="hover:underline">
                    Veg
                  </Link>
                </li>
                <li>
                  <Link to="/recipe/nonVeg" className="hover:underline">
                    Non-Veg
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold text-green-700 uppercase dark:text-green-600">
                Get in Touch
              </h2>
              <p className="mb-4 text-sm">
                Have a support question?
              </p>
              <button
                onClick={() => setShowContact(true)}
                className="text-white font-semibold bg-green-700 px-4 py-2 rounded-md"
              >
                Contact Us
              </button>
              <p className="text-green-700 mt-4">Call us at</p>
              <p className="text-white">+91 9260066999</p>
            </div>
          </div>
        </div>
      </footer>
      <Contact show={showContact} onClose={() => setShowContact(false)} />
    </>
  );
}

export default Footer;
