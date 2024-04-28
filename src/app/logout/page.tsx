"use client";
import { logout } from "@/actions/auth";
import React, { useEffect } from "react";

function LogOut() {
  useEffect(() => {
    logout();
  }, []);
  return <div>Loging Out</div>;
}

export default LogOut;
