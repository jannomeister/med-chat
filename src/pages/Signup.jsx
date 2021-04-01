import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup, signInWithGoogle } from "../helpers/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const onGoogleSignin = async () => {
    console.log("hello");
    try {
      await signInWithGoogle();
    } catch (err) {
      console.log("error: ", error);
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Signup here...</h1>
        <Link to="/">Med Chat</Link>
        <div>
          <input
            name="email"
            placeholder="your@email.com"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <input
            name="password"
            placeholder="your password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          {error ? <p>{error}</p> : null}
          <button type="submit">Sign up</button>
        </div>

        <p>You can also sign up with any of these services</p>
        <button type="button" onClick={onGoogleSignin}>
          Sign up with Google
        </button>
      </form>
      <p>
        Already have an account <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
