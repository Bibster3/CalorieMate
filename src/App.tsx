import React, { useState, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Layout/Navbar";
import HeroCarousel from "./components/Layout/HeroCarousel";

import Dashboard from "./components/Dashboard";
import Meals from "./components/Meals";
import Activity from "./components/Activity";
import PersonalInfoForm from "./components/MyInformation";

import {
  DashboardRoute,
  MealsRoute,
  ActivityRoute,
  PersonalInfoRoute,
} from "./components/Layout/menuItems";

function App() {
  const location = useLocation();
  const [heroDismissed, setHeroDismissed] = useState(false);
  const personalInfoRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    if (personalInfoRef.current) {
      personalInfoRef.current.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setHeroDismissed(true), 800);
    }
  };

  const isHome = location.pathname === "/";

  return (
    <div>
      <Navbar />

      {isHome && !heroDismissed && (
        <>
          <HeroCarousel onGetStarted={handleGetStarted} />
          <PersonalInfoForm ref={personalInfoRef} />
        </>
      )}

      <Routes>
       /*  <Route path="/" element={heroDismissed ? <PersonalInfoForm /> : null} />
        <Route path={DashboardRoute.slug} element={<Dashboard />} />
        <Route path={MealsRoute.slug} element={<Meals />} />
        <Route path={ActivityRoute.slug} element={<Activity />} />
        <Route path={PersonalInfoRoute.slug} element={<PersonalInfoForm />} />
      </Routes>
    </div>
  );
}

export default App;