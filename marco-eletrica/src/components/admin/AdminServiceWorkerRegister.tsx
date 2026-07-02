"use client";

import { useEffect } from "react";

export function AdminServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/admin-sw.js", { scope: "/admin" })
        .catch(() => {});
    }
  }, []);

  return null;
}
