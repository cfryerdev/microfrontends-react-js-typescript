import { BrowserRouter } from "react-router-dom";
import TelemetryListener from "./components/telemetry/TelemetryListener";
import Routing from "./_routing";
import { AuthProvider, useAuth } from "react-oidc-context";


function Login() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        Hello {auth.user?.profile.sub}{" "}
        <button onClick={() => void auth.removeUser()}>
          Log out
        </button>
      </div>
    );
  }

  return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
}
const HostRouter = () => (

  <AuthProvider {...oidcConfig}>
    <Login />
    <TelemetryListener />
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </AuthProvider>
);

export default HostRouter;