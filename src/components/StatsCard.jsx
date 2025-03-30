import React from "react";

const StatsCard = ({ title, value, percentage, chart }) => {
  return (
    <div className="flex flex-col overflow-hidden my-4 bg-[#24263A] rounded-lg w-full max-w-sm">
      <div className="p-4">
        <div className="z-10 w-full text-zinc-200">
          <h3 className="text-xl">{title}</h3>
          <div className="mt-2.5 text-2xl">{value}</div>
          <div
            className={`px-2 mt-4 text-sm whitespace-nowrap ${percentage.includes("-") ? "text-red-400" : "text-teal-400"
              }`}
          >
            {percentage}
          </div>
        </div>
      </div>

      <img
        src={chart}
        className="self-end w-full max-w-full mt-4 object-contain aspect-[3.22]"
        alt={`${title} chart`}
      />
    </div>
  );
};

export default StatsCard;
