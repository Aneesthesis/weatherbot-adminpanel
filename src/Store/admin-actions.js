import axios from "axios";
import { adminActions } from "./admin-slice";

export const initiatelogin = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "https://weatherbot-api.onrender.com/api/login",
        {
          email,
          password,
        }
      );

      if (response.status !== 200) {
        throw new Error("Access Denied! Check Admin Credentials");
      }
      dispatch(adminActions.setLoggedIn(true));
      dispatch(adminActions.setAdminInfo(response));
    } catch (error) {
      console.error("Error during admin login:", error.message);

      dispatch(adminActions.setLoggedIn(false));
    }
  };
};

export const fetchUsers = () => {
  const authToken = JSON.parse(localStorage.getItem("adminInfo")).data.token;

  return async (dispatch) => {
    try {
      console.log(dispatch);
      dispatch(adminActions.setLoading(true));
      const response = await axios.get(
        "https://weatherbot-api.onrender.com/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("fetching users...." + JSON.stringify(response.status));

      if (response.status !== 200) {
        if (response.data.message.includes("expired")) {
          dispatch(adminActions.setTokenExpired(true));

          throw new Error(
            "Token seems to have expired, logout out and come back!"
          );
        }
        throw new Error("Problem loading user list");
      }

      const usersData = response.data;

      dispatch(adminActions.setLoading(false));
      dispatch(
        adminActions.setUsers({
          list: usersData || [],
        })
      );
    } catch (error) {
      console.error(error.message);
      dispatch(adminActions.setError(error.message));
      alert(error.message);
    }
  };
};

export const fetchAPIToken = () => {
  const authToken = JSON.parse(localStorage.getItem("adminInfo")).data.token;

  return async (dispatch) => {
    try {
      dispatch(adminActions.setLoading(true));
      const response = await axios.get(
        "https://weatherbot-api.onrender.com/api/bot-token",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("fetching users...." + response.data.key);

      if (response.status !== 200) {
        throw new Error("Problem loading API Token");
      }

      const api_token = response.data.key;

      dispatch(adminActions.setbotToken(api_token || ""));
      dispatch(adminActions.setLoading(false));
    } catch (error) {
      console.error(error.message);
      dispatch(adminActions.setError(error.message));
      alert(error.message);
    }
  };
};

export const toggleBlocking = (userId) => {
  const authToken = JSON.parse(localStorage.getItem("adminInfo")).data.token;
  return async (dispatch) => {
    try {
      adminActions.setLoading(true);

      const response = await axios.put(
        `https://weatherbot-api.onrender.com/api/admin/users/${userId}/toggleBlock`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Problem toggling");
      }
      dispatch(adminActions.setLoading(false));
    } catch (error) {
      console.error(error.message);
      dispatch(adminActions.setError(error.message));
      alert(error.message);
    }
  };
};

export const updateAPIToken = (new_api_key) => {
  const authToken = JSON.parse(localStorage.getItem("adminInfo")).data.token;
  return async (dispatch) => {
    try {
      adminActions.setLoading(true);

      const response = await axios.put(
        `https://weatherbot-api.onrender.com/bot-token`,
        { new_api_key },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Problem updating bot token");
      }
      dispatch(adminActions.setLoading(false));
    } catch (error) {
      console.error(error.message);
      dispatch(adminActions.setError(error.message));
      alert(error.message);
    }
  };
};
