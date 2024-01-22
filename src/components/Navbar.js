import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../feature/userSlice";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { toastifyError, toastifySuccess } from "./common/Toastify";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }, [location.pathname]);

  const handleLogOut = async () => {
    await signOut(auth)
      .then((res) => {
        navigate("/login");
        dispatch(logOut());
        toastifySuccess('You have logged out!');
      })
      .catch((error) => {
        console.log(error);
        toastifyError('Something went wrong.');
      });
  };

  return (
    <>
      <div className={`max-w-7xl mx-auto flex items-center text-white justify-between px-4 shadow-md fixed top-0 left-0 right-0 z-40 bg-gray-800 ${navbar && "hidden"}`}>
        <div>
          <h1 className=" font-semibold text-2xl">Dashboard</h1>
        </div>
        <div>
          <ul className="flex items-center space-x-5">
            <li className="py-3 cursor-pointer">
              <Link to="/" className="text-white text-base font-medium hover:text-gray-400">Home</Link>
            </li>
            <li className="py-3 cursor-pointer">
              <button onClick={handleLogOut} className="text-white text-base font-medium hover:text-gray-400">
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
