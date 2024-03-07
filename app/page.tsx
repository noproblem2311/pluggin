import { AuthProvider } from "@/hooks/useAuth";
import RecordList from "@/views/record/RecordList";
// import AuthGuard from "@/utils/route-guard/AuthGuard";
import ResponsiveAppBar from "@/components/core/AppBar";
import React from "react";

export default function Home() {
  return (
    <AuthProvider>
      <ResponsiveAppBar />
      <div className="pt-16">
        <RecordList />
      </div>
    </AuthProvider>
  );
}
