import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../feature/userSlice";
import { toastifySuccess } from "../components/common/Toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          login({
            email: user.email,
            name: user.displayName,
            img: user.photoURL,
          })
        );
        toastifySuccess('You have successfully logged in!');
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center relative bg-neutral">
        <div className="w-full max-w-md shadow-lg rounded-lg p-4 bg-white z-50 border-theme_color-blue mx-2 sm:mx-0">
          <h2 className="text-center font-medium text-3xl mb-6 text-neutral">Login</h2>
          <div>
            <form className="flex flex-col relative w-full space-y-6" onSubmit={handleSubmit}>
              <input type="email" placeholder="Enter your Email" className="input input-bordered w-full bg-secondary text-white placeholder:text-gray-300" name="email" value={loginForm.email} onChange={handleChange} required />
              <input type="password" placeholder="Enter your password" className="input input-bordered w-full bg-secondary text-white placeholder:text-gray-300" name="password" value={loginForm.password} onChange={handleChange} required />
              <button className="btn btn-primary" type="submit"> Log In </button>
            </form>
            <p className="pt-2 text-center text-base text-neutral"> Don't have an account? <Link to="/register" className="underline text-blue-500"> Register Here</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
