// import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();
  const [passwordError, setPasswordError] = useState("");
  // handeling the input values
  const handleInput = (e) => {
    // console.log(e);
    let name = e.target.name;
    let value = e.target.value;
    if (name === "password") {
      if (value.length < 6) {
        setPasswordError(
          "Password must be at least 6 characters long.",
          passwordError
        );
      } else {
        setPasswordError("");
      }
    }

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handling the form submit

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   console.log(user);
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/auth/register`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application / json" },

  //       body: JSON.stringify(user),
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.log("registeration ", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      console.log("From server", res_data.message);
      if (response.ok) {
        //String the tkoen in localStorage
        storeTokenInLS(res_data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        console.log("Registration successful:", res_data);
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
      // Handle success
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
                <h1 className="main-heading mb-3">registration form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="username"
                      id="username"
                      required
                      autoComplete="off"
                      value={user.username}
                      onChange={handleInput}
                    />
                  </div>

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
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="enter your phone"
                      id="phone"
                      required
                      autoComplete="off"
                      value={user.phone}
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
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Register;
