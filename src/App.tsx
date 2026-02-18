import React, { useRef } from "react";
import Navbar, { SectionKey } from "./components/Layout/Navbar";
import HeroCarousel from "./components/Layout/HeroCarousel";
import PersonalInfoForm from "./components/MyInformation";
import Meals from "./components/Meals";
import Activity from "./components/Activity";
import Dashboard from "./components/Dashboard";
import { Arrow } from "./components/Layout/Arrow";

export default function App() {
  const refs = {
    hero: useRef<HTMLElement>(null),
    info: useRef<HTMLElement>(null),
    meals: useRef<HTMLElement>(null),
    activity: useRef<HTMLElement>(null),
    dashboard: useRef<HTMLElement>(null),
  };

  const scrollTo = (key: SectionKey) =>
    refs[key].current?.scrollIntoView({ behavior: "smooth", inline: "start" });

  return (
    <>
      <Navbar onNavigate={scrollTo} />

      <div className="flex overflow-x-hidden snap-x snap-mandatory h-screen">
        <section ref={refs.hero} className="snap-start flex-shrink-0 w-screen min-h-screen relative overflow-y-auto">
          <HeroCarousel onGetStarted={() => scrollTo("info")} />
        </section>

        <section ref={refs.info} className="snap-start flex-shrink-0 w-screen min-h-screen relative overflow-y-auto">
          <PersonalInfoForm />
          <Arrow onClick={() => scrollTo("meals")} />
        </section>

        <section ref={refs.meals} className="snap-start flex-shrink-0 w-screen min-h-screen relative overflow-y-auto">
          <Meals />
          <Arrow onClick={() => scrollTo("activity")} />
        </section>

        <section ref={refs.activity} className="snap-start flex-shrink-0 w-screen min-h-screen relative overflow-y-auto">
          <Activity />
          <Arrow onClick={() => scrollTo("dashboard")} />
        </section>

        <section ref={refs.dashboard} className="snap-start flex-shrink-0 w-screen min-h-screen relative overflow-y-auto">
          <Dashboard />
        </section>
      </div>
    </>
  );
}