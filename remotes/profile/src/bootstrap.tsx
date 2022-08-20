import App from './_app';
import * as ReactDOMClient from "react-dom/client";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement!);

root.render(<App />);
