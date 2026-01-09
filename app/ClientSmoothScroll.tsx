"use client";
import React, { ReactNode } from "react";
import SmoothScroll from "@/components/SmoothScroll";

export default function ClientSmoothScroll({ children }: { children: ReactNode }) {
  return <SmoothScroll>{children}</SmoothScroll>;
}
