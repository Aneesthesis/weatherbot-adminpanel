import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAPIToken,
  fetchUsers,
  toggleBlocking,
  updateAPIToken,
} from "../Store/admin-actions";
import UsersList from "../components/UsersList";
import { adminActions } from "../Store/admin-slice";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const storeDispatch = useDispatch();
  const { usersList, loading, error, api_token } = useSelector(
    (state) => state.admin
  );

  const [apiKey, setApiKey] = useState(api_token);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    setApiKey(api_token);
  }, [api_token]);

  useEffect(() => {
    const admin = localStorage.getItem("adminInfo");
    if (!admin) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        storeDispatch(fetchUsers());
        storeDispatch(fetchAPIToken());
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchData();
  }, [storeDispatch]);

  const handleToggleBlocking = async (userId) => {
    await storeDispatch(toggleBlocking(userId));
    await storeDispatch(fetchUsers());
  };

  const logoutHandler = () => {
    localStorage.removeItem("adminInfo");
    adminActions.setLoggedIn(false);
    navigate("/");
  };

  async function botTokenUpdateHandler(e) {
    console.log(api_token, apiKey);
    await storeDispatch(updateAPIToken(apiKey));
  }

  function onAPIInputFieldChangeHandler(e) {
    console.log(e.target.value);
    setApiKey(e.target.value);
  }

  // Function to handle input focus
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  // Function to handle input blur
  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-yellow-500 p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">Welcome Admin</h1>
        <h3
          onClick={logoutHandler}
          className="cursor-pointer text-white hover:underline"
        >
          Logout
        </h3>
      </nav>

      {/* Main Section */}
      <main className="flex flex-col flex-grow p-6">
        {/* Top Section */}
        <section className="mb-4">
          <div className="flex flex-col lg:flex-row lg:items-center text-lg font-semibold">
            <h3 className="mb-2 lg:mb-0 lg:mr-4">Manage TELEGRAM API Token</h3>
            <input
              className="w-full lg:w-auto bg-gray-200 border border-gray-300 rounded px-4 py-2 mb-2 lg:mb-0 lg:mr-4"
              type="text"
              value={isInputFocused ? apiKey : `${apiKey.slice(0, 10)}........`}
              onChange={onAPIInputFieldChangeHandler}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={botTokenUpdateHandler}
            >
              Confirm Update
            </button>
          </div>
        </section>

        {/* Bottom Section */}
        <section className="flex-grow">
          {loading && <p className="text-center text-gray-600">Loading...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
          {!loading && !error && (
            <UsersList
              toggleBlockHandler={handleToggleBlocking}
              usersList={usersList}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
