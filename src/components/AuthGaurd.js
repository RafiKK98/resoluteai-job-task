import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../feature/userSlice";

const AuthGaurd = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            email: user.email,
            name: user.displayName,
            img: user.photoURL,
          })
        );
      } else {
        navigate("/login");
      }
    });
  }, []);
  return null;
};

export default AuthGaurd;
