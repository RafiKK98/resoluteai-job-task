import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../feature/userSlice";
import { toastifySuccess } from "../components/common/Toastify";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(
      auth,
      registerForm.email,
      registerForm.password
    )
      .then((userCredential) => {
        dispatch(
          login({
            email: userCredential.user.email,
            name: userCredential.user.displayName,
            img: userCredential.user.photoURL,
          })
        );
        toastifySuccess('You have successfully registered!');
        navigate("/");
      })
      .catch((error) => {console.log(error.message)});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center relative bg-neutral">
        <div className="w-full max-w-md border-2 shadow-md rounded-md p-4 z-50 bg-white border-theme_color-blue mx-2 sm:mx-0">
          <h2 className="text-center font-medium text-3xl mb-6 text-neutral">Register</h2>
          <div>
            <form className="flex flex-col relative w-full space-y-6" onSubmit={handleSubmit}>
              <input type="email" placeholder="Enter your Email" className="input input-bordered w-full bg-secondary text-white placeholder:text-gray-300" name="email" value={registerForm.email} onChange={handleChange} />
              <input type="password" placeholder="Enter your password" className="input input-bordered w-full bg-secondary text-white placeholder:text-gray-300" name="password" value={registerForm.password} onChange={handleChange} />
              <button className="btn btn-primary" type="submit">Register</button>
            </form>
            <p className="pt-2 text-center text-base text-neutral">Already have an account? <Link to="/login" className="underline text-blue-500"> Login Here</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
