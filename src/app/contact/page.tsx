"use client";

import { useEffect } from "react";

export default function ContactPage() {
  useEffect(() => {
    if (typeof window !== "undefined") window.location.replace("/#contact");
  }, []);
  return null;
}
