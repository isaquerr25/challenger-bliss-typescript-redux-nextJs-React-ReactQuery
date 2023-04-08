'use client'

import { HashLoader } from "react-spinners";
import React from "react";
export const Loading = () => (
  <div className="flex justify-center items-center flex-col h-[100vh] w-[100vw]">
    <HashLoader color="#36d7b7" />
    <h3 className="mt-[1rem] text-2xl opacity-[0.7]">Loading...</h3>
  </div>
);
