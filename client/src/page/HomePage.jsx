import React from "react";
import Banner from "../components/Banner";
import LatestJobs from "../components/LatestJobs";
import Blog from "../components/Blog";
import Testimonials from "../components/Testimonials";
import ContactUs from "../components/ContactUs";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <LatestJobs />
      <Blog />
      <Testimonials />
      <ContactUs />
    </div>
  );
};

export default HomePage;
