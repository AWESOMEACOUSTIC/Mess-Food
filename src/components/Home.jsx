// src/App.jsx
import React, { useState, useEffect } from "react";
import HomeSidebar from "./HomeSidebar";
import HomeStats from "./HomeStats";
import FoodSuggestion from "./FoodSuggestion";
import SuggestionList from "./SuggestionList";

function Home() {

  const [suggestions, setSuggestions] = useState([]);

  const addSuggestion = (newSuggestion) => {
    setSuggestions((prev) => [newSuggestion, ...prev]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      
      const simulatedSuggestion = {
        id: Date.now(),
        foodItem: "Simulated Dish " + Math.floor(Math.random() * 100),
        mealType: "Lunch",
      };
      setSuggestions((prev) => [simulatedSuggestion, ...prev]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden flex bg-[#121318] text-white">
      <HomeSidebar />

      <main className="flex-1 p-6 overflow-y-auto">
        <HomeStats suggestionsCount={suggestions.length} />
        <FoodSuggestion addSuggestion={addSuggestion} />
        <SuggestionList suggestions={suggestions} />
      </main>
    </div>
  );
}

export default Home;
