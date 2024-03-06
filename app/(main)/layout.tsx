import ResponsiveAppBar from "@/components/core/AppBar";
import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <React.Fragment>
      <ResponsiveAppBar />
      <div className="pt-16">{children}</div>
    </React.Fragment>
  );
}
