import {
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AverageMacrosGramsChart({
  averageMacros,
  pieChartColors,
  screenWidth,
}) {
  //Creates a customized label for the pie chart so that the values display with a % sign next to them
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${value}g`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        {/* <text
          x="50%"
          y={50}
          textAnchor="middle"
          fontSize={20}
          fontWeight="bold"
          fill="white"
        >
          Average Macros (g)
        </text> */}
        <Pie
          data={averageMacros}
          cx="50%"
          cy="50%"
          outerRadius={screenWidth <= 480 ? screenWidth / 4 : 120}
          fill="#8884d8"
          dataKey="value"
          label={renderCustomizedLabel}
          labelLine={false}
          isAnimationActive={false}
        >
          {averageMacros.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={pieChartColors[index]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}g`} />
        <Legend wrapperStyle={{ bottom: 0 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
