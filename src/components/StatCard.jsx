
import { Card, Text } from "@fluentui/react-components";

export default function StatCard({
  title,
  value,
  icon,
  color = "text-indigo-600",
}) {
  return (
    <Card className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <Text size={300} weight="medium" className="text-slate-500">
          {title}
        </Text>

        <div className={`text-2xl ${color}`}>
          {icon}
        </div>
      </div>

      <Text
        size={700}
        weight="semibold"
        className="text-slate-800"
      >
        {value}
      </Text>

      <Text size={200} className="text-slate-500">
        Employee overview
      </Text>
    </Card>
  );
}
