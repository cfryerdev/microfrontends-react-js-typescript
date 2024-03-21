import React, { useEffect } from "react";
import CustomLayout from "./components/layout";
import { LogClient } from "@shared/logging";

const App = () => {
  useEffect(() => {
    LogClient.logPageView({ page: "Profile" });
  }, []);
  return (
    <CustomLayout>
      <>
        <h2>Remote App - Profile</h2>
        <p>
          This is the profile remote application. Click title to return to root.
        </p>
      </>
    </CustomLayout>
  );
};

export default App;
