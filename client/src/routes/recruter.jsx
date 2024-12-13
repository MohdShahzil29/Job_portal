import { useState, useEffect } from "react";
import { useAuth } from "../context/user";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

export default function RecruterRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${auth?.token}`;
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/recruter/is-recruter`
        );
        setOk(res.data.ok);
      } catch (error) {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
