import React, { useEffect, useState } from "react";
import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import bg4 from "../../assets/bg4.jpg";

const backgrounds = [bg1, bg2, bg3, bg4];

const HeroCarousel = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Backgrounds */}
      <div className="relative w-full h-screen overflow-hidden">
        {backgrounds.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${bg})` }}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 bg-black bg-opacity-50">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-xl">
          Welcome to Calorie Mate
        </h1>
        <p className="text-lg md:text-xl max-w-2xl drop-shadow-md">
          Stay on top of your nutrition. Track your meals and know exactly what you need daily.
        </p>
        <button
  onClick={onGetStarted}
  className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-full shadow-lg text-white font-semibold text-lg"
>
  Get Started
</button>
      </div>
    </section>
  );
};

export default HeroCarousel;