import React, { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import MonthlyChart from "./MonthlyChart";
import veg from "../assets/veg.png";
import nonveg from "../assets/nonveg.png";
import special from "../assets/special.png";

const DashBoard = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  // Simulate an API call or data fetch
  useEffect(() => {
    const fetchFeedbackData = async () => {
      // In a real app, you'd do something like:
      // const response = await fetch('/api/feedback');
      // const data = await response.json();
      // setFeedbackData(data);

      // For demo, just simulate a delay:
      setTimeout(() => {
        const data = [
          { month: "Jan", veg: 75,  nonVeg: 120, special: 20 },
          { month: "Feb", veg: 50,  nonVeg: 80,  special: 10 },
          { month: "Mar", veg: 100, nonVeg: 90,  special: 15 },
          { month: "Apr", veg: 60,  nonVeg: 70,  special: 25 },
          { month: "May", veg: 110, nonVeg: 130, special: 30 },
          { month: "Jun", veg: 90,  nonVeg: 100, special: 10 },
          { month: "Jul", veg: 80,  nonVeg: 60,  special: 25 },
          { month: "Aug", veg: 120, nonVeg: 140, special: 40 },
          { month: "Sep", veg: 130, nonVeg: 120, special: 30 },
          { month: "Oct", veg: 100, nonVeg: 90,  special: 20 },
          { month: "Nov", veg: 70,  nonVeg: 60,  special: 10 },
          { month: "Dec", veg: 60,  nonVeg: 50,  special: 15 },
        ];
        setFeedbackData(data);
      }, 1000);
    };

    fetchFeedbackData();
  }, []);

  // Calculate totals for each category
  const totalVeg = feedbackData.reduce((acc, cur) => acc + (cur.veg || 0), 0);
  const totalNonVeg = feedbackData.reduce((acc, cur) => acc + (cur.nonVeg || 0), 0);
  const totalSpecial = feedbackData.reduce((acc, cur) => acc + (cur.special || 0), 0);

  const vegPercentage = "+5%";
  const nonVegPercentage = "-3%";
  const specialPercentage = "+10%";

  const vegChart = veg;
  const nonVegChart = nonveg;
  const specialChart = special;

  // Prepare data for the bar chart (summing all feedback per month)
  const monthlyTotalData = feedbackData.map((item) => ({
    month: item.month,
    total: (item.veg || 0) + (item.nonVeg || 0) + (item.special || 0),
  }));

  return (
    <main className="flex-1 p-3">
      {/* TOP StatsCardS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4">
      <StatsCard
        title="Total Veg Feedback"
        value={totalVeg}
        percentage={vegPercentage}
        chart={vegChart}
      />
      <StatsCard
        title="Total Non-Veg Feedback"
        value={totalNonVeg}
        percentage={nonVegPercentage}
        chart={nonVegChart}
      />
      <StatsCard
        title="Total Special Feedback"
        value={totalSpecial}
        percentage={specialPercentage}
        chart={specialChart}
      />
    </div>

      {/* BAR CHART */}
      <MonthlyChart data={monthlyTotalData} />
    </main>
  );
};

export default DashBoard;
