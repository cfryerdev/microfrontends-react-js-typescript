import HostRouter from "./_app";
import ReactDOM from "react-dom";
// @ts-ignore
import { CountProvider } from "container/store";

ReactDOM.render(<CountProvider>
    <HostRouter />
</CountProvider>, document.getElementById("root"));
