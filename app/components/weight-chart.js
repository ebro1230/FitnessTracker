import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function WeightChart({ userData }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      {/* <h4 style={{ textAlign: "center", color: "#4e4e4e" }}>Weight vs. Time</h4> */}
      <LineChart
        // margin={{ top: 25, right: 50 }}
        margin={{ top: 40, right: 50, left: 50, bottom: 40 }}
        data={userData.days.map((day) => {
          return {
            day: day.date,
            weight:
              userData.preference === "Metric" ? day.weightKG : day.weightLBS,
            goalWeight:
              userData.preference === "Metric"
                ? day.goalWeightKG
                : day.goalWeightLBS,
          };
        })}
        width="100%"
        height="80%"
      >
        <text
          x="50%"
          dx={28}
          y={10}
          fill="#4e4e4e"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={16}
        >
          Weight vs. Time
        </text>
        <XAxis
          dataKey="day"
          label={{
            value: "Time",
            position: "insideBottom",
            offset: "-10",
            style: { textAnchor: "middle" },
          }}
          padding={{ left: 30, right: 30 }}
        />
        <YAxis
          type="number"
          domain={["dataMin - 5", "dataMax + 5"]}
          label={{
            value:
              userData.preference === "Metric" ? "Weight (kg)" : "Weight (lbs)",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle" }, // ensures centered text
            //dy: 100, // adjust this number until it's visually centered
          }}
        />
        {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
        <Tooltip
          formatter={(value, name) => {
            const customNames = {
              goalWeight:
                userData.preference === "Metric"
                  ? "Goal Weight (kg)"
                  : "Goal Weight (lbs)",
              weight:
                userData.preference === "Metric"
                  ? "Current Weight (kg)"
                  : "Current Weight (lbs)",
            };
            return [`${value}`, customNames[name] || name]; // Fallback to original name if not mapped
          }}
        />
        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
        <Line type="monotone" dataKey="goalWeight" stroke="gold" />
      </LineChart>
    </ResponsiveContainer>
  );
}
