import { useState, useEffect } from "react";
import { useAuth } from "../context/user";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

export default function UserRoutes() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth?.token}`;
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/user-auth`
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
