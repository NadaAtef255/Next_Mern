import Sidebar from "@/components/Sidebar/Sidebar";
import React from "react";

function layout({ children }) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}

export default layout;
