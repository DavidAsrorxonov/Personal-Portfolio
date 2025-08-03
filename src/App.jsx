import { useState } from "react";
import "./App.css";
import HeroPage from "./components/HeroPage";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <>
      <HeroPage />
    </>
  );
}

export default App;
