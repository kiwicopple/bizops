"use client";

import React from "react";
import { DatePickerWithRange } from "./daterange-picker";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Navbar() {
  return (
    <div className=" bg-white">
      <div className="bg-white mx-auto flex items-center justify-between border-b px-2.5 py-2">
        <SidebarTrigger />
        <DatePickerWithRange />
      </div>
    </div>
  );
}
