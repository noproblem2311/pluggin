import { AuthProvider } from "@/hooks/useAuth";
// import AuthGuard from "@/utils/route-guard/AuthGuard";
import React from "react";

export default function Home() {
  return (
    <AuthProvider>
      <div />
    </AuthProvider>
  );
}
