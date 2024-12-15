import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import Register from "./page/Register";
import Login from "./page/Login";
import RecruterRoutes from "./routes/recruter";
import DashBoard from "./page/recruter/Dashboard";
import CreateJob from "./page/recruter/CreateJob";
import YourJob from "./page/recruter/YourJob";
import Details from "./page/recruter/Details";
import UserRoutes from "./routes/user";
import UserDashboard from "./page/user/Dashboard";
import Setting from "./page/user/Setting";
import Profile from "./page/user/Profile";
import JobDetails from './page/JobDetails'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/job/:slug" element={<JobDetails />} />

        <Route path="/recruter" element={<RecruterRoutes />}>
          <Route path="" element={<DashBoard />} />
          <Route path="/recruter/your-details" element={<Details />} />
          <Route path="/recruter/create-job" element={<CreateJob />} />
          <Route path="/recruter/posted-job" element={<YourJob />} />
        </Route>

        <Route path="/user" element={<UserRoutes />}>
        <Route path="" element={<UserDashboard />} />
        <Route path="/user/settings" element={<Setting />} />
        <Route path="/user/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
