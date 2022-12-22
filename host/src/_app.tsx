import { BrowserRouter } from "react-router-dom";
import Routing from "./_routing";

const HostRouter = () => {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
};

export default HostRouter;