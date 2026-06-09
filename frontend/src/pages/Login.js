import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {


      const response = await API.post(
  "/login",
  {
    email: email,
    password: password
  }
);

      // SAVE TOKEN
      localStorage.setItem(

  "token",

  response.data.access_token

);

localStorage.setItem(

  "refresh_token",

  response.data.refresh_token

);

      alert("Login successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Invalid credentials");

    }

  };

  return (

    <div>

      <Navbar />

      <div className="container mt-5">

        <div className="row justify-content-center">

          <div className="col-md-5">

            <div className="card shadow p-4">

              <h2 className="mb-4 text-center">
                Login 🔐
              </h2>

              <form onSubmit={handleLogin}>

                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

                <button
                  type="submit"
                  className="btn btn-dark w-100"
                >
                  Login
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Login;