import { BrowserRouter } from "react-router-dom";
import TelemetryListener from "./components/telemetry/TelemetryListener";
import Routing from "./_routing";
import { ErrorBoundary } from "react-error-boundary";
import { createContext } from "react";


const HostRouter = () => (

  <>
    <TelemetryListener />
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </>
);

export default HostRouter;