"use client";

import { useEffect } from "react";

export default function AboutPage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.location.replace("/#about");
  }, []);
  return null;
}
