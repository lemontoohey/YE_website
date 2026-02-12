"use client";

import { useEffect } from "react";

export default function WorkPage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.location.replace("/#work");
  }, []);
  return null;
}
