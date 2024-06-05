import axios from "axios";
import { Outlet } from "react-router-dom";
import { User } from "../Context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import LoadingScreen from "../../../components/Loading";
import Cookies from "universal-cookie";

export default function PersistLogin() {
  // Get Current User
  const context = useContext(User);
  const token = context.auth.token;
  const [loading, setLoading] = useState(true);
  // Cookies
  const cookie = new Cookies();
  const getCookieToken = cookie.get("Bearer");

  // Send Refresh Token
  useEffect(() => {
    async function refresh() {
      try {
        await axios
          .post(`http://127.0.0.1:8000/api/refresh`, null, {
            headers: {
              Authorization: "Bearer " + getCookieToken,
            },
          })
          .then((data) => {
            cookie.remove("Bearer", { path: "/" });
            cookie.set("Bearer ", data.data.token);
            
            context.setAuth((prev) => {
              return {
                userDetails: data.data.user,
                token: data.data.token,
              };
            });
          });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    !token ? refresh() : setLoading(false);
  }, []);
  return loading ? <LoadingScreen /> : <Outlet />;
}