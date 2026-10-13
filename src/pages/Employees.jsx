
import { useMemo, useState } from "react";

import { Button } from "@fluentui/react-components";

import {
  AddRegular,
  PeopleRegular,
  PersonAvailableRegular,
  EyeOffRegular,
} from "@fluentui/react-icons";

import StatCard from "../components/StatCard";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Employees() {
  // Load employee records from Local Storage.
  const [employees, setEmployees] = useLocalStorage(
    "employee-management-employees",
    []
  );

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [showHidden, setShowHidden] = useState(false);

  // Add/Edit form state.
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Employee statistics.
  const visibleEmployees = employees.filter(
    (employee) => !employee.isHidden
  );

  const hiddenCount = employees.filter(
    (employee) => employee.isHidden
  ).length;

  const activeCount = visibleEmployees.filter(
    (employee) => employee.status === "Active"
  ).length;

  // Search and filter employees.
  const filteredEmployees = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return employees.filter((employee) => {
      const matchesVisibility = showHidden
        ? Boolean(employee.isHidden)
        : !employee.isHidden;

      const matchesSearch =
        (employee.name || "").toLowerCase().includes(searchText) ||
        (employee.email || "").toLowerCase().includes(searchText) ||
        (employee.role || "").toLowerCase().includes(searchText);

      const matchesDepartment =
        department === "All" ||
        employee.department === department;

      return (
        matchesVisibility &&
        matchesSearch &&
        matchesDepartment
      );
    });
  }, [employees, search, department, showHidden]);

  // Open the form for a new employee.
  function handleAddClick() {
    setSelectedEmployee(null);
    setIsFormOpen(true);
  }

  // Open the form with existing employee details.
  function handleEdit(employee) {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
  }

  // Add or update an employee.
  function handleFormSubmit(employeeData) {
    if (selectedEmployee) {
      setEmployees((previousEmployees) =>
        previousEmployees.map((employee) =>
          employee.id === selectedEmployee.id
            ? {
                ...employeeData,
                id: selectedEmployee.id,
                isHidden: Boolean(selectedEmployee.isHidden),
              }
            : employee
        )
      );
    } else {
      setEmployees((previousEmployees) => [
        ...previousEmployees,
        {
          ...employeeData,
          isHidden: false,
        },
      ]);
    }
  }

  // Hide employee without permanently deleting the record.
  function handleDelete(employeeId) {
    setEmployees((previousEmployees) =>
      previousEmployees.map((employee) =>
        employee.id === employeeId
          ? { ...employee, isHidden: true }
          : employee
      )
    );
  }

  // Restore a hidden employee.
  function handleRestore(employeeId) {
    setEmployees((previousEmployees) =>
      previousEmployees.map((employee) =>
        employee.id === employeeId
          ? { ...employee, isHidden: false }
          : employee
      )
    );
  }

  // Close the form.
  function handleCloseForm() {
    setIsFormOpen(false);
    setSelectedEmployee(null);
  }

  return (
    <div className="min-h-full space-y-8 p-6 md:p-8">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Employee Directory
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage employees, update details, and organize your team.
          </p>
        </div>

        <Button
          appearance="primary"
          icon={<AddRegular />}
          onClick={handleAddClick}
        >
          Add Employee
        </Button>
      </section>

      {/* Statistics cards */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total Employees"
          value={visibleEmployees.length}
          icon={<PeopleRegular />}
          color="text-indigo-600"
        />

        <StatCard
          title="Active Employees"
          value={activeCount}
          icon={<PersonAvailableRegular />}
          color="text-emerald-600"
        />

        <StatCard
          title="Hidden Employees"
          value={hiddenCount}
          icon={<EyeOffRegular />}
          color="text-amber-600"
        />
      </section>

      {/* Employee directory */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {showHidden ? "Hidden Employees" : "All Employees"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredEmployees.length} employee record(s) displayed
            </p>
          </div>

          <Button
            appearance="secondary"
            onClick={() => {
              setShowHidden((previous) => !previous);
              setSearch("");
              setDepartment("All");
            }}
          >
            {showHidden
              ? "Back to Employees"
              : `Show Hidden (${hiddenCount})`}
          </Button>
        </div>

        {/* Employee table with Edit, Delete, and Restore actions */}
        <EmployeeTable
          employees={filteredEmployees}
          search={search}
          onSearchChange={setSearch}
          department={department}
          onDepartmentChange={setDepartment}
          showHidden={showHidden}
          onEdit={handleEdit}
          onHide={handleDelete}
          onRestore={handleRestore}
        />
      </section>

      {/* Shared Add/Edit form */}
      <EmployeeForm
        key={selectedEmployee?.id ?? "new-employee"}
        open={isFormOpen}
        employee={selectedEmployee}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
