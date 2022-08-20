import { Routes, Route } from "react-router";

import Home from "./pages";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Sample from "./pages/sample";
import Profile from "./pages/profile";
import Example from "./pages/example";
import NotFound from "./pages/404";
import ProtectedRoute from "./components/protected-route";

const Routing = () => (


  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/sample/:id" element={<Sample />} />
    <Route path="/profile" element={
      <ProtectedRoute redirectPath="/login" isAllowed={false}>
        <Profile />
      </ProtectedRoute>} />
    <Route path="/example" element={<Example />} />
    {/* ELSE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default Routing;
