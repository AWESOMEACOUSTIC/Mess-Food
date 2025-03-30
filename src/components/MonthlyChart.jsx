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
 * @param {Array} data 
 
 */
const MonthlyChart = ({ data }) => {
  return (
    <div className="bg-[#2A2A40] rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-100">Stats</h2>
        <span className="text-sm text-gray-400">Current Year</span>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
            barCategoryGap={20} 
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A127F9" stopOpacity={1} />
                <stop offset="100%" stopColor="#A127F9" stopOpacity={0.4} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#3F3F54" />

            <XAxis
              dataKey="month"
              stroke="#ccc"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#ccc", fontSize: 16 }}
            />

            <YAxis
              stroke="#ccc"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#ccc", fontSize: 16 }}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.1)" }}
              contentStyle={{ backgroundColor: "#2A2A40", border: "none" }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#fff" }}
            />

            <Bar
              dataKey="total"
              fill="url(#barGradient)"
              radius={[10, 10, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyChart;
