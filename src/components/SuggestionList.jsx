import React from "react";

const SuggestionList = ({ suggestions }) => {
  return (
    <div className="bg-[#1E1F25] p-4 rounded-md ">
      <h2 className="text-xl font-semibold mb-4">Recent Suggestions</h2>
      {suggestions.length === 0 ? (
        <p className="text-gray-400">No suggestions yet.</p>
      ) : (
        <ul className="space-y-2">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} className="border-b border-gray-700 pb-2">
              <p className="text-lg font-medium">{suggestion.foodItem}</p>
              <p className="text-sm text-gray-400">{suggestion.mealType}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestionList;
