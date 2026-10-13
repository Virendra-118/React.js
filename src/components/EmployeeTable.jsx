
import {
  Badge,
  Button,
  Dropdown,
  Field,
  Input,
  Option,
} from "@fluentui/react-components";

import {
  SearchRegular,
  EditRegular,
  DeleteRegular,
  ArrowUndoRegular,
} from "@fluentui/react-icons";

const departments = [
  "Engineering",
  "Design",
  "HR",
  "Marketing",
];

export default function EmployeeTable({
  employees = [],
  search = "",
  onSearchChange,
  department = "All",
  onDepartmentChange,
  showHidden = false,
  onEdit,
  onHide,
  onRestore,
}) {
  function getStatusColor(status) {
    if (status === "Active") return "success";
    if (status === "On Leave") return "warning";
    if (status === "Inactive") return "danger";
    return "informative";
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {/* Search and filters */}
      <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center">
        <div>
          <h3 className="font-semibold text-slate-800">
            Employee Directory
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {employees.length} employee(s) found
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field>
            <Input
              contentBefore={<SearchRegular />}
              placeholder="Search employees..."
              value={search}
              onChange={(_, data) => onSearchChange(data.value)}
            />
          </Field>

          <Field>
            <Dropdown
              placeholder="All Departments"
              value={
                department === "All"
                  ? "All Departments"
                  : department
              }
              selectedOptions={[department]}
              onOptionSelect={(_, data) => {
                if (data.optionValue) {
                  onDepartmentChange(data.optionValue);
                }
              }}
            >
              <Option value="All">All Departments</Option>
              {departments.map((item) => (
                <Option key={item} value={item}>
                  {item}
                </Option>
              ))}
            </Dropdown>
          </Field>
        </div>
      </div>

      {/* Employee table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] text-left">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4">Employee</th>
              <th className="px-5 py-4">Department</th>
              <th className="px-5 py-4">Role</th>
              <th className="px-5 py-4">Salary</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="border-b border-slate-100 hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-800">
                    {employee.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {employee.email}
                  </p>
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {employee.department}
                </td>

                <td className="px-5 py-4 text-sm text-slate-600">
                  {employee.role}
                </td>

                <td className="px-5 py-4 text-sm text-slate-700">
                  ₹{Number(employee.salary || 0).toLocaleString("en-IN")}
                </td>

                <td className="px-5 py-4">
                  <Badge color={getStatusColor(employee.status)}>
                    {employee.status}
                  </Badge>
                </td>

                {/* THESE ARE THE ACTION BUTTONS */}
                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {employee.isHidden ? (
                      <Button
                        size="small"
                        appearance="primary"
                        icon={<ArrowUndoRegular />}
                        onClick={() => onRestore?.(employee.id)}
                      >
                        Restore
                      </Button>
                    ) : (
                      <>
                        <Button
                          size="small"
                          appearance="secondary"
                          icon={<EditRegular />}
                          onClick={() => onEdit?.(employee)}
                          aria-label={`Edit ${employee.name}`}
                        >
                          Edit
                        </Button>

                        <Button
                          size="small"
                          appearance="secondary"
                          icon={<DeleteRegular />}
                          onClick={() => onHide?.(employee.id)}
                          aria-label={`Delete ${employee.name}`}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-12 text-center text-slate-500"
                >
                  {showHidden
                    ? "No hidden employees found."
                    : "No employees found. Add an employee to get started."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
