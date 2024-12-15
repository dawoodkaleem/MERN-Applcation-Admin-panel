// import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
const URL = `http://localhost:5000/api/auth/login`;
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      console.log("login r", response);

      if (response.ok) {
        const res_data = await response.json();
        console.log("Login Form", res_data);

        alert("Registration successful!");
        setUser({ email: "", password: "" });
        //String the tkoen in
        // localStorage.setItem("token", res_data.token);
        storeTokenInLS(res_data.token);
        navigate("/");
      } else {
        console.log("Invalid Credential");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="resgistration-image">
                <img
                  src="images/register.png"
                  alt=""
                  width="500"
                  height="500"
                />
              </div>
              {/* let tackeled registration form */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login now </h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="enter your email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="enter your password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>{" "}
    </>
  );
};

export default Login;
