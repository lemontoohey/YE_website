"use client";

import { useEffect } from "react";

export default function ContactPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const base = window.location.pathname.replace(/\/contact$/, "") || "/";
      window.location.replace(base + (base.endsWith("/") ? "" : "/") + "#contact");
    }
  }, []);
  return null;
}
