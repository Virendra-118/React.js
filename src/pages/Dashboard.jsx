
import { useMemo, useState } from "react";
import { Button } from "@fluentui/react-components";

import {
  AddRegular,
  PeopleRegular,
  PersonAvailableRegular,
  PersonProhibitedRegular,
  WalletRegular,
  ArrowRightRegular,
} from "@fluentui/react-icons";

import {
  Users,
  BriefcaseBusiness,
  TrendingUp,
  CircleDollarSign,
  ArrowUpRight,
} from "lucide-react";

import EmployeeForm from "../components/EmployeeForm";
import useLocalStorage from "../hooks/useLocalStorage";

function OverviewCard({
  title,
  value,
  subtitle,
  icon,
  accent,
  iconBackground,
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-200/60 sm:p-6">
      <div className={`absolute inset-x-0 top-0 h-1 ${accent}`} />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-4 break-words text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBackground} transition-transform duration-200 group-hover:scale-105`}>
          {icon}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
    </article>
  );
}

function SectionHeading({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
      <div>
        <h2 className="text-lg font-bold tracking-tight text-slate-900">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {subtitle}
        </p>
      </div>

      {action}
    </div>
  );
}

export default function Dashboard({ onNavigate }) {
  const [employees, setEmployees] = useLocalStorage(
    "employee-management-employees",
    []
  );

  const [isFormOpen, setIsFormOpen] = useState(false);

  const visibleEmployees = useMemo(
    () => employees.filter((employee) => !employee.isHidden),
    [employees]
  );

  const activeEmployees = visibleEmployees.filter(
    (employee) => employee.status === "Active"
  );

  const inactiveEmployees = visibleEmployees.filter(
    (employee) => employee.status === "Inactive"
  );

  const onLeaveEmployees = visibleEmployees.filter(
    (employee) => employee.status === "On Leave"
  );

  const monthlyPayroll = visibleEmployees.reduce(
    (total, employee) => total + Number(employee.salary || 0),
    0
  );

  const departmentStats = useMemo(() => {
    const names = [
      "Engineering",
      "Design",
      "HR",
      "Marketing",
    ];

    return names
      .map((department) => ({
        department,
        count: visibleEmployees.filter(
          (employee) => employee.department === department
        ).length,
      }))
      .sort((a, b) => b.count - a.count);
  }, [visibleEmployees]);

  const recentEmployees = [...visibleEmployees].reverse().slice(0, 5);

  const activePercentage =
    visibleEmployees.length > 0
      ? Math.round(
          (activeEmployees.length / visibleEmployees.length) * 100
        )
      : 0;

  const representedDepartments = new Set(
    visibleEmployees.map((employee) => employee.department)
  ).size;

  function handleAddEmployee(employeeData) {
    setEmployees((previous) => [
      ...previous,
      { ...employeeData, isHidden: false },
    ]);

    setIsFormOpen(false);
  }

  function goToEmployees() {
    onNavigate?.("Employees");
  }

  return (
    <div className="min-h-full bg-slate-50/80 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-8">

        {/* Professional dashboard welcome banner */}
        <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Subtle brand accent */}
          <div className="absolute bottom-0 left-0 top-0 w-1.5 bg-indigo-600" />

          {/* Decorative background shapes */}
          <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border-[32px] border-indigo-50/80" />
          <div className="pointer-events-none absolute -right-1 -top-8 h-44 w-44 rounded-full border border-indigo-100/80" />

          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5">
                  <span className="h-2 w-2 rounded-full bg-indigo-600" />
                  <span className="text-xs font-semibold tracking-wide text-indigo-700">
                    PEOPLE DESK · WORKFORCE
                  </span>
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Dashboard Overview
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                  Everything you need to understand your team,
                  monitor payroll, and keep employee information
                  organized in one place.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button
                    appearance="primary"
                    icon={<AddRegular />}
                    onClick={() => setIsFormOpen(true)}
                  >
                    Add Employee
                  </Button>

                  <Button
                    appearance="secondary"
                    icon={<ArrowRightRegular />}
                    iconPosition="after"
                    onClick={goToEmployees}
                  >
                    View Directory
                  </Button>
                </div>
              </div>

              {/* Compact workforce summary panel */}
              <div className="w-full max-w-sm rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/90 to-white p-5 lg:min-w-72">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200">
                    <Users size={22} />
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    <TrendingUp size={13} />
                    Live overview
                  </span>
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  Current workforce
                </p>

                <div className="mt-1 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-4xl font-bold tracking-tight text-slate-900">
                      {visibleEmployees.length}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Visible employee records
                    </p>
                  </div>

                  <div className="pb-1 text-right">
                    <p className="text-lg font-bold text-emerald-700">
                      {activePercentage}%
                    </p>
                    <p className="text-xs text-slate-500">
                      Active
                    </p>
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${activePercentage}%` }}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-indigo-100 pt-4">
                  <span className="text-xs text-slate-500">
                    Departments represented
                  </span>
                  <span className="text-sm font-semibold text-slate-800">
                    {representedDepartments}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key metrics */}
        <section>
          <SectionHeading
            title="Key Metrics"
            subtitle="A snapshot of your employee data and payroll."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
            <OverviewCard
              title="Total Employees"
              value={visibleEmployees.length}
              subtitle="Visible employee records"
              accent="bg-indigo-500"
              iconBackground="bg-indigo-50"
              icon={<PeopleRegular fontSize={24} className="text-indigo-600" />}
            />

            <OverviewCard
              title="Active Employees"
              value={activeEmployees.length}
              subtitle="Currently marked active"
              accent="bg-emerald-500"
              iconBackground="bg-emerald-50"
              icon={<PersonAvailableRegular fontSize={24} className="text-emerald-600" />}
            />

            <OverviewCard
              title="Inactive Employees"
              value={inactiveEmployees.length}
              subtitle="Marked as inactive"
              accent="bg-rose-500"
              iconBackground="bg-rose-50"
              icon={<PersonProhibitedRegular fontSize={24} className="text-rose-600" />}
            />

            <OverviewCard
              title="Monthly Payroll"
              value={`₹${monthlyPayroll.toLocaleString("en-IN")}`}
              subtitle="Combined monthly salaries"
              accent="bg-amber-500"
              iconBackground="bg-amber-50"
              icon={<WalletRegular fontSize={24} className="text-amber-600" />}
            />
          </div>
        </section>

        {/* Department and workforce insights */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-5">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-3">
            <SectionHeading
              title="Department Distribution"
              subtitle="How your team is distributed across departments."
              action={
                <span className="self-start rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                  {visibleEmployees.length} total
                </span>
              }
            />

            <div className="space-y-6">
              {departmentStats.map(({ department, count }, index) => {
                const percentage =
                  visibleEmployees.length > 0
                    ? (count / visibleEmployees.length) * 100
                    : 0;

                const barColors = [
                  "bg-indigo-500",
                  "bg-violet-500",
                  "bg-sky-500",
                  "bg-emerald-500",
                ];

                return (
                  <div key={department}>
                    <div className="mb-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className={`h-2.5 w-2.5 rounded-full ${barColors[index % barColors.length]}`} />
                        <span className="text-sm font-semibold text-slate-700">
                          {department}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-semibold text-slate-800">
                          {count}
                        </span>
                        <span className="ml-2 text-xs text-slate-400">
                          {Math.round(percentage)}%
                        </span>
                      </div>
                    </div>

                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColors[index % barColors.length]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-800">
                  Department insight:
                </span>{" "}
                {visibleEmployees.length === 0
                  ? "Add employees to see your department distribution."
                  : `${departmentStats.filter((item) => item.count > 0).length} department(s) currently have employees.`}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
            <SectionHeading
              title="Workforce Summary"
              subtitle="Current employee status breakdown."
            />

            <div className="flex items-center gap-5 rounded-2xl bg-slate-50 p-4">
              <div
                className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(#10b981 0% ${activePercentage}%, #e2e8f0 ${activePercentage}% 100%)`,
                }}
              >
                <div className="flex h-[74px] w-[74px] flex-col items-center justify-center rounded-full bg-white">
                  <span className="text-xl font-bold text-slate-900">
                    {activePercentage}%
                  </span>
                  <span className="text-[10px] text-slate-500">
                    Active
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Team activity
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {activeEmployees.length} active out of{" "}
                  {visibleEmployees.length} visible employees.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-1">
              {[
                {
                  label: "Active",
                  count: activeEmployees.length,
                  color: "bg-emerald-500",
                },
                {
                  label: "Inactive",
                  count: inactiveEmployees.length,
                  color: "bg-rose-500",
                },
                {
                  label: "On Leave",
                  count: onLeaveEmployees.length,
                  color: "bg-amber-500",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    <span className="text-sm text-slate-600">
                      {item.label}
                    </span>
                  </div>

                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-800">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>

            <Button
              appearance="secondary"
              className="!mt-4 !w-full"
              icon={<BriefcaseBusiness size={16} />}
              onClick={goToEmployees}
            >
              Manage Employees
            </Button>
          </div>
        </section>

        {/* Recent employees */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <SectionHeading
              title="Recent Employees"
              subtitle="A compact overview of your employee records."
              action={
                <Button
                  appearance="subtle"
                  icon={<ArrowRightRegular />}
                  iconPosition="after"
                  onClick={goToEmployees}
                >
                  View Directory
                </Button>
              }
            />
          </div>

          {recentEmployees.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {recentEmployees.map((employee) => {
                const initials = (employee.name || "?")
                  .trim()
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")
                  .toUpperCase();

                const statusClass =
                  employee.status === "Active"
                    ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                    : employee.status === "On Leave"
                      ? "bg-amber-50 text-amber-700 ring-amber-600/20"
                      : "bg-rose-50 text-rose-700 ring-rose-600/20";

                return (
                  <div
                    key={employee.id}
                    className="flex flex-col gap-4 px-5 py-4 transition-colors hover:bg-slate-50/80 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 text-sm font-bold text-indigo-700 ring-4 ring-indigo-50/70">
                        {initials}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {employee.name}
                        </p>
                        <p className="mt-1 truncate text-xs text-slate-500">
                          {employee.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 sm:justify-end">
                      <div className="min-w-28">
                        <p className="text-xs text-slate-400">
                          Department
                        </p>
                        <p className="mt-1 text-sm font-medium text-slate-700">
                          {employee.department}
                        </p>
                      </div>

                      <div className="min-w-28">
                        <p className="text-xs text-slate-400">
                          Monthly Salary
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          ₹{Number(employee.salary || 0).toLocaleString("en-IN")}
                        </p>
                      </div>

                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${statusClass}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {employee.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="px-6 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <PeopleRegular fontSize={28} />
              </div>

              <h3 className="mt-4 text-base font-semibold text-slate-800">
                Your team starts here
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Add your first employee to start tracking your workforce
                and viewing department insights.
              </p>

              <Button
                className="!mt-5"
                appearance="primary"
                icon={<AddRegular />}
                onClick={() => setIsFormOpen(true)}
              >
                Add Your First Employee
              </Button>
            </div>
          )}

          <div className="flex flex-col justify-between gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:px-6">
            <span>
              Showing {recentEmployees.length} of {visibleEmployees.length} visible employees
            </span>

            <button
              type="button"
              onClick={goToEmployees}
              className="font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
            >
              Go to employee directory →
            </button>
          </div>
        </section>
      </div>

      <EmployeeForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddEmployee}
      />
    </div>
  );
}
