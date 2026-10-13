
import {
  LayoutDashboard,
  Users,
  Settings,
} from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Employees",
    icon: Users,
  },
  {
    name: "Settings",
    icon: Settings,
  },
];

export default function Sidebar({
  activePage,
  onNavigate,
}) {
  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-slate-200 bg-white p-5">
      <div className="mb-10">
        <h1 className="text-xl font-bold text-indigo-600">
          PeopleDesk
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Employee Management
        </p>
      </div>

      <nav className="space-y-2">
        {navigationItems.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => onNavigate(name)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left ${
              activePage === name
                ? "bg-indigo-50 font-semibold text-indigo-700"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Icon size={20} />
            {name}
          </button>
        ))}
      </nav>
    </aside>
  );
}
