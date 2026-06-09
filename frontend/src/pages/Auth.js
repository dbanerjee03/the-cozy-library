import "./Auth.css";

import toast from "react-hot-toast";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

import API from "../services/api";

function Auth() {

  const navigate = useNavigate();

  const [active, setActive] = useState(false);

  const [loginLoading, setLoginLoading] =
  useState(false);

const [registerLoading, setRegisterLoading] =
  useState(false);

  // LOGIN STATES
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // REGISTER STATES
  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // LOGIN FUNCTION
  const handleLogin = async (e) => {

  e.preventDefault();

  try {

    setLoginLoading(true);

    const response = await API.post(
      "/login",
      {
        email: loginEmail,
        password: loginPassword
      }
    );

    localStorage.setItem(

      "token",

      response.data.access_token

    );

    localStorage.setItem(

  "refresh_token",

  response.data.refresh_token

);

    setTimeout(() => {


      toast.success(
        "Login successful 💜"
      );

      navigate("/home");
      window.location.reload();

    }, 2000);

  } catch (error) {

    console.log(error);

    setLoginLoading(false);

    if (error.response?.data?.detail) {

      toast.error(
        error.response.data.detail
      );

    }

  }

};

  // REGISTER FUNCTION
  const handleRegister = async (e) => {

  e.preventDefault();

  try {

    setRegisterLoading(true);

    await API.post(
      "/signup",
      {
        name: name,
        email: registerEmail,
        password: registerPassword
      }
    );

    toast.success(
      "Registration successful 💜"
    );

    setTimeout(() => {

      setActive(false);

    }, 1000);

  } catch (error) {

    console.log(error);

    if (error.response?.data?.detail) {

      toast.error(
        error.response.data.detail
      );

    }

  } finally {

    setRegisterLoading(false);

  }

};

  return (

    <div className="auth-body">
      {loginLoading && (

  <div className="auth-loading-overlay">

    <div className="auth-loading-box">

      <div className="auth-spinner"></div>

      <h3>
        Logging you in...
      </h3>

    </div>

  </div>

)}

      <div className={`container ${active ? "active" : ""}`}>

        {/* LOGIN */}

        <div className="form-box login">

          <form onSubmit={handleLogin}>

            <h1>Login</h1>

            <div className="input-box">

              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) =>
                  setLoginEmail(e.target.value)
                }
              />

              <FaEnvelope className="icon" />

            </div>

            <div className="input-box">

              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) =>
                  setLoginPassword(e.target.value)
                }
              />

              <FaLock className="icon" />

            </div>

            <button
  type="submit"
  className="btn"

  disabled={loginLoading}
>

  {
    loginLoading
      ? "Logging in..."
      : "Login"
  }

</button>

          </form>

        </div>

        {/* REGISTER */}

        <div className="form-box register">

          <form onSubmit={handleRegister}>

            <h1>Register</h1>

            <div className="input-box">

              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <FaUser className="icon" />

            </div>

            <div className="input-box">

              <input
                type="email"
                placeholder="Email"
                required
                value={registerEmail}
                onChange={(e) =>
                  setRegisterEmail(e.target.value)
                }
              />

              <FaEnvelope className="icon" />

            </div>

            <div className="input-box">

              <input
                type="password"
                placeholder="Password"
                required
                value={registerPassword}
                onChange={(e) =>
                  setRegisterPassword(e.target.value)
                }
              />

              <FaLock className="icon" />

            </div>

            <button
  type="submit"
  className="btn"

  disabled={registerLoading}
>

  {
    registerLoading
      ? "Creating Account..."
      : "Register"
  }

</button>

          </form>

        </div>

        {/* TOGGLE */}

        <div className="toggle-box">

          <div className="toggle-panel toggle-left">

            <h1>Hello, Welcome!</h1>
            <h3>Join The Cozy Library</h3>

            <p>
              Don't have an account?
            </p>

            <button
              className="btn toggle-btn"
              onClick={() => setActive(true)}
            >
              Register
            </button>

          </div>

          <div className="toggle-panel toggle-right">

            <h1>The Cozy Library</h1>
            
            <h2>Welcome Back!
            </h2>

            <p>
              Already have an account?
            </p>

            <button
              className="btn toggle-btn"
              onClick={() => setActive(false)}
            >
              Login
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Auth;