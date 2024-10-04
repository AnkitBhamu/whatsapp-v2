import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { redirect, replace, useNavigate } from "react-router";

export default function ({ children }) {
  let [cookies, setcookie, removecookie] = useCookies();
  let [checked, setchecked] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (cookies["user_details"]) {
      setchecked(true);
    } else {
      navigate("/", { replace: true });
    }
  });
  return <>{checked ? children : null}</>;
}
