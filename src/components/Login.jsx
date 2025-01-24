import React, { useState } from "react";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch(`${import.meta.env.VITE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "Application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const json = await response.json();
    setLoading(false);
    if (json.success) {
      localStorage.setItem("token", json.token);
      history("/"); // Redirect to home page
    } else {
      setError("Invalid credentials");
      setTimeout(() => setError(""), 2000);
    }
  };

  // Set demo credentials
  const useDemoCredentials = () => {
    setUsername("Ankit");
    setPassword("Kumar");
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-black min-h-screen flex items-center justify-center p-2">
      {loading ? (
        <div className="flex justify-center items-center">
          <Circles height="80" width="80" color="#4fa94d" ariaLabel="circles-loading" visible={true} />
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 space-y-6">
          <div>
            <h2 className="text-center text-3xl font-bold text-gray-900">Log in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm">
              <div className="mb-4">
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            {error && <p className="text-sm text-red-600 font-semibold text-center">{error}</p>}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={useDemoCredentials}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
              >
                Use Demo Credentials
              </button>
              <p className="mt-2 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  onClick={() => history("/signup")}
                >
                  Create one
                </a>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
