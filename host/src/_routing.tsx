import { Routes, Route } from "react-router";

import Index from "./pages";
import Sample from "./pages/sample";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Example from "./pages/example";
import Health from "./pages/health";
import NotFound from "./pages/404";

const Routing = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/sample/:id" element={<Sample />} />
    <Route path="/home" element={<Home />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/health" element={<Health />} />
    <Route path="/example" element={<Example />} />
    {/* ELSE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Routing;
