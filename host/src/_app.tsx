import { BrowserRouter } from "react-router-dom";
import Routing from "./_routing";
import { ErrorBoundary } from "react-error-boundary";

import errorFallback from "./components/error-fallback";
const HostRouter = () => (
  <BrowserRouter>
    <ErrorBoundary FallbackComponent={errorFallback}>
      <Routing />
    </ErrorBoundary>
  </BrowserRouter>
);

export default HostRouter;