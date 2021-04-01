import React, { useState } from "react";
import { signin, signInWithGoogle } from "../helpers/auth";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email && !password) {
      return setError("Email address and password is required");
    }

    if (!email) {
      return setError("Email address is required");
    }

    if (!password) {
      return setError("Password is required");
    }

    try {
      await signin(email, password);
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("Invalid Email or Password");
      } else if (err.code === "auth/invalid-email") {
        setError("Please provide a valid email address");
      } else {
        setError("Something went wrong. Please try again later");
      }
    }
  };

  const onGoogleSignin = async () => {
    await signInWithGoogle();
  };

  return (
    <div>
      <svg
        className="absolute top-4 right-4 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        width={25}
        height={25}
        onClick={() => props.history.replace("/")}
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
      <div className="grid grids-1 gap-4 place-content-center max-w-md m-auto py-12">
        <h1 className="text-center text-4xl font-bold mb-6">Log in</h1>
        <form onSubmit={onSubmit} noValidate>
          {error ? (
            <p className="text-center py-1 text-red-500 font-semibold border border-red-400 rounded mb-2">
              {error}
            </p>
          ) : null}
          <div>
            <input
              name="email"
              placeholder="your@email.com"
              type="email"
              className="w-full px-4 pt-2 pb-2.5 border border-gray-300 rounded-full hover:border-indigo-400 focus:border-indigo-400"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="pt-2"></div>

          <div>
            <input
              name="password"
              placeholder="your password"
              type="password"
              className="w-full px-4 pt-2 pb-2.5 border border-gray-300 rounded-full hover:border-indigo-400 focus:border-indigo-400"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="pt-2"></div>

          <div>
            <button
              className="text-xl bg-white border border-gray-300 font-semibold pt-2 pb-2.5 rounded-full w-full hover:border-gray-400 hover:bg-gray-50"
              type="submit"
            >
              <span className="text-black">Sign in</span>
            </button>
          </div>
        </form>

        <button
          className="text-xl bg-red-600 pt-2 pb-2.5 rounded-full"
          type="button"
          onClick={onGoogleSignin}
        >
          <span className="text-white">Sign in with Google</span>
        </button>

        <div className="pt-4"></div>

        <button
          className="font-semibold text-lg border border-gray-300 rounded-full py-1.5 px-4 hover:border-gray-400"
          onClick={(e) => props.history.push("/signup")}
        >
          Don't have an account? Click here to sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
