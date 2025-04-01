import React, { useState } from "react";
import { submitSuggestion } from "../services/api";

const FoodSuggestion = ({ onNewSuggestion }) => {
  const [foodItem, setFoodItem] = useState("");
  const [mealType, setMealType] = useState("BreakFast");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assume user id is stored in localStorage after login
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in!");
      return;
    }

    const suggestionData = {
      user_id: userId,
      food_item_suggestion: foodItem,
      meal_type: mealType,
      feasibility: 1, // you can adjust this value as needed
    };

    try {
      const response = await submitSuggestion(suggestionData);
      // Optionally update parent's suggestion list
      if (onNewSuggestion) {
        onNewSuggestion(response);
      }
      setFoodItem("");
      setMealType("BreakFast");
    } catch (error) {
      console.error("Error submitting suggestion:", error);
      alert("Failed to submit suggestion");
    }
  };

  return (
    <div className="bg-[#1E1F25] p-4 rounded-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Food Suggestion</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 text-gray-300 py-2.5">Food Item</label>
          <input
            type="text"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
            className="w-full rounded-md p-2 text-gray-200 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter food items"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-300 py-2.5">Meal Type</label>
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full rounded-md p-2 text-gray-200 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="BreakFast">BreakFast</option>
            <option value="Lunch">Lunch</option>
            <option value="Snacks">Snacks</option>
            <option value="Dinner">Dinner</option>
            <option value="NightMess">Night Mess</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-5 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md w-fit appearance-none border-0 outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FoodSuggestion;
