import { Routes, Route } from "react-router";

import Home from "./pages";
import Dashboard from "./pages/dashboard";
import Sample from "./pages/sample";
import Profile from "./pages/profile";
import Example from "./pages/example";
import NotFound from "./pages/404";

const Routing = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/sample/:id" element={<Sample />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/example" element={<Example />} />
    {/* ELSE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Routing;
