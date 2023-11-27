import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminActions } from "../Store/admin-slice";
import { initiatelogin } from "../Store/admin-actions";

const Login = () => {
  const storeDispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLoggedIn = useSelector((state) => state.admin.loggedIn);

  //const { user } = useSelector((state) => state);

  const handleLogin = async () => {
    await storeDispatch(initiatelogin(email, password));

    useEffect(() => {
      if (isLoggedIn) {
        console.log(isLoggedIn);
        navigate("/dashboard");
      }
    }, [isLoggedIn]);

    return (
      <div className="min-h-screen flex items-center justify-around">
        <h1 className="text-4xl font-bold mb-8 text-center">
          syed_weather_bot ADMIN PANEL
        </h1>
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4">
            Enter your Admin Credentials
          </h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };
};

export default Login;
