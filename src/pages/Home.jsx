import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home here...</h1>

      <div>
        <Link to="/signup">Create New Account</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Home;
