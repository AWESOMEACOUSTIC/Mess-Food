import React, { useState, useEffect } from "react";
import HomeSidebar from "./HomeSidebar";
import HomeStats from "./HomeStats";
import FoodSuggestion from "./FoodSuggestion";
import SuggestionList from "./SuggestionList";
import { getFeedback } from "../services/api";

function Home() {
  const [suggestions, setSuggestions] = useState([]);

  // Fetching from backend
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const data = await getFeedback();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, []);
  const handleNewSuggestion = (newSuggestion) => {
    setSuggestions((prev) => [newSuggestion, ...prev]);
  };

  return (
    <div className="min-h-screen overflow-hidden flex bg-[#121318] text-white">
      <HomeSidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <HomeStats suggestionsCount={suggestions.length} />
        <FoodSuggestion onNewSuggestion={handleNewSuggestion} />
        <SuggestionList suggestions={suggestions} />
      </main>
    </div>
  );
}

export default Home;
