import { BrowserRouter } from "react-router-dom";
import Routing from "./_routing";
import { AccountProvider } from "@shared/contexts/account-context";

const HostRouter = () => (
	<BrowserRouter>
    <AccountProvider>
      <Routing />
    </AccountProvider>
  </BrowserRouter>
);

export default HostRouter;