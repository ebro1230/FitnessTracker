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
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        margin={{ top: 25, right: 50 }}
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
      >
        <XAxis dataKey="day" />
        <YAxis type="number" domain={[60, "dataMax + 10"]} />
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
