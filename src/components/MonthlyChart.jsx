import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/**
 * @param {Array} data - An array of objects, e.g.:
 *   [
 *     { month: "Jan", total: 75 },
 *     { month: "Feb", total: 50 },
 *     ...
 *   ]
 */
const MonthlyChart = ({ data }) => {
  return (
    <div className="bg-[#2A2A40] rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-100">Stats</h2>
        <span className="text-sm text-gray-400">Current Year</span>
      </div>

      {/* Chart Container */}
      <div className="w-full h-64">
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
            barCategoryGap={20} // spacing between bars
          >
            {/* Define a linear gradient for the bar fill */}
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A127F9" stopOpacity={1} />
                <stop offset="100%" stopColor="#A127F9" stopOpacity={0.4} />
              </linearGradient>
            </defs>

            {/* Optional grid with dashed lines */}
            <CartesianGrid strokeDasharray="3 3" stroke="#3F3F54" />

            {/* X-axis */}
            <XAxis
              dataKey="month"
              stroke="#ccc"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#ccc", fontSize: 16 }}
            />

            {/* Y-axis */}
            <YAxis
              stroke="#ccc"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#ccc", fontSize: 16 }}
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.1)" }}
              contentStyle={{ backgroundColor: "#2A2A40", border: "none" }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#fff" }}
            />

            {/* Bars using the gradient and rounded top corners */}
            <Bar
              dataKey="total"
              fill="url(#barGradient)"
              radius={[10, 10, 0, 0]} // top-left & top-right corners
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyChart;
