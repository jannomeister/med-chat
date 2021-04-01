import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signin } from "../helpers/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signin(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            name="email"
            placeholder="your@email.com"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            name="password"
            placeholder="your password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          {error ? <p>{error}</p> : null}
          <button type="submit">Sign in</button>
        </div>
      </form>
      <p>
        Don't have an account <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
