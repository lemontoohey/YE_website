"use client";

import { useEffect } from "react";

export default function WorkPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const base = window.location.pathname.replace(/\/work$/, "") || "/";
      window.location.replace(base + (base.endsWith("/") ? "" : "/") + "#work");
    }
  }, []);
  return null;
}
