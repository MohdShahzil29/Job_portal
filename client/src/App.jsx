import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import LatestJobs from "./components/LatestJobs";
import Blog from "./components/Blog";
import Testimonials from "./components/Testimonials";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <LatestJobs />
      <Blog />
      <Testimonials />
      <ContactUs />
      <Footer />
    </>
  );
}

export default App;
