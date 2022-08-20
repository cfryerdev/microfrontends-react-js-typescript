import { BrowserRouter } from "react-router-dom";
import TelemetryListener from "./components/telemetry/TelemetryListener";
import Routing from "./_routing";

const HostRouter = () => (
  <>
    <TelemetryListener />
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </>
);

export default HostRouter;