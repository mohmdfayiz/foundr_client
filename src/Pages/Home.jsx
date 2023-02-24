import React from "react";
import { useSelector } from "react-redux";
import {
  HeroSection,
  EventSection,
  Profiles,
  Tiles,
  Working,
} from "../components";
import { Footer } from "../components/Footer/Footer";

export const Home = () => {
  const { authenticated } = useSelector((state) => state.auth);
  return (
    <div>
      <HeroSection />
      <Tiles />
      {authenticated ? <Profiles /> : <Working />}
      <EventSection />
      <Footer />
    </div>
  );
};
