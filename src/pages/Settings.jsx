
import { useState } from "react";

import {
  Button,
  Field,
  Input,
  Dropdown,
  Option,
} from "@fluentui/react-components";

import {
  UserRound,
  SlidersHorizontal,
  Database,
  Download,
  Save,
  CheckCircle2,
} from "lucide-react";

import useLocalStorage from "../hooks/useLocalStorage";

const defaultSettings = {
  displayName: "",
  email: "",
  defaultDepartment: "All",
  pageSize: "10",
};

export default function Settings() {
  const [settings, setSettings] = useLocalStorage(
    "peopledesk-settings",
    defaultSettings
  );

  const [employees] = useLocalStorage(
    "employee-management-employees",
    []
  );

  const [savedMessage, setSavedMessage] = useState(false);

  function handleChange(field, value) {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSavedMessage(false);
  }

  function handleExport() {
    const backup = {
      exportedAt: new Date().toISOString(),
      employees,
    };

    const blob = new Blob(
      [JSON.stringify(backup, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "peopledesk-employees-backup.json";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  function handleSave() {
    // useLocalStorage persists settings automatically.
    setSavedMessage(true);
  }

  return (
    <div className="min-h-full space-y-8 p-6 md:p-8">
      {/* Page heading */}
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Settings & Preferences
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your PeopleDesk profile, application preferences,
          and employee data.
        </p>
      </section>

      {/* Profile settings */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 p-5 md:p-6">
          <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
            <UserRound size={22} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Profile Settings
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Customize your local profile information.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 md:p-6">
          <Field label="Display Name">
            <Input
              value={settings.displayName}
              placeholder="Enter your display name"
              onChange={(_, data) =>
                handleChange("displayName", data.value)
              }
            />
          </Field>

          <Field label="Email Address">
            <Input
              type="email"
              value={settings.email}
              placeholder="Enter your email"
              onChange={(_, data) =>
                handleChange("email", data.value)
              }
            />
          </Field>
        </div>
      </section>

      {/* Application preferences */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 p-5 md:p-6">
          <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
            <SlidersHorizontal size={22} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Application Preferences
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Choose your preferred employee directory settings.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 md:p-6">
          <Field label="Default Department Filter">
            <Dropdown
              value={settings.defaultDepartment}
              selectedOptions={[settings.defaultDepartment]}
              onOptionSelect={(_, data) => {
                if (data.optionValue) {
                  handleChange("defaultDepartment", data.optionValue);
                }
              }}
            >
              <Option value="All">All Departments</Option>
              <Option value="Engineering">Engineering</Option>
              <Option value="Design">Design</Option>
              <Option value="HR">HR</Option>
              <Option value="Marketing">Marketing</Option>
            </Dropdown>
          </Field>

          <Field label="Employees Per Page">
            <Dropdown
              value={settings.pageSize}
              selectedOptions={[settings.pageSize]}
              onOptionSelect={(_, data) => {
                if (data.optionValue) {
                  handleChange("pageSize", data.optionValue);
                }
              }}
            >
              <Option value="5">5 employees</Option>
              <Option value="10">10 employees</Option>
              <Option value="20">20 employees</Option>
              <Option value="50">50 employees</Option>
            </Dropdown>
          </Field>
        </div>

        <div className="border-t border-slate-100 px-5 py-4 md:px-6">
          <p className="text-sm text-slate-500">
            These preferences are saved locally. To apply them
            automatically, we can connect them to the employee directory.
          </p>
        </div>
      </section>

      {/* Data management */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 p-5 md:p-6">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
            <Database size={22} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Data Management
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review and back up your locally stored employee records.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center md:p-6">
          <div>
            <p className="font-medium text-slate-800">
              Employee Records
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {employees.length} saved record(s), including hidden employees.
            </p>
          </div>

          <Button
            appearance="secondary"
            icon={<Download size={16} />}
            onClick={handleExport}
          >
            Export JSON Backup
          </Button>
        </div>

        <div className="border-t border-slate-100 px-5 py-4 md:px-6">
          <p className="text-sm text-amber-700">
            Your employee records are stored in this browser.
            Export a backup regularly so you have a separate copy.
          </p>
        </div>
      </section>

      {/* Save preferences */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          appearance="primary"
          icon={<Save size={16} />}
          onClick={handleSave}
        >
          Save Preferences
        </Button>

        {savedMessage && (
          <p className="flex items-center gap-2 text-sm text-emerald-700">
            <CheckCircle2 size={17} />
            Preferences saved successfully.
          </p>
        )}
      </div>
    </div>
  );
}
