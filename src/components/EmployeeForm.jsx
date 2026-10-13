import { useState } from "react";
import {
  Button,
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Field,
  Input,
  Dropdown,
  Option,
} from "@fluentui/react-components";

const initialForm = {
  name: "",
  email: "",
  department: "Engineering",
  role: "",
  salary: "",
  status: "Active",
};

export default function EmployeeForm({
  open,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(initialForm);

  function handleChange(field, value) {
    setForm((previousForm) => ({
      ...previousForm,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      ...form,
      id: crypto.randomUUID(),
      salary: Number(form.salary),
    });

    setForm(initialForm);
    onClose();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(_, data) => {
        if (!data.open) onClose();
      }}
    >
      <DialogSurface>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <DialogTitle>Add New Employee</DialogTitle>

            <DialogContent>
              <div className="space-y-4 py-4">
                <Field label="Full Name" required>
                  <Input
                    value={form.name}
                    required
                    placeholder="Enter employee name"
                    onChange={(_, data) =>
                      handleChange("name", data.value)
                    }
                  />
                </Field>

                <Field label="Email Address" required>
                  <Input
                    type="email"
                    value={form.email}
                    required
                    placeholder="employee@example.com"
                    onChange={(_, data) =>
                      handleChange("email", data.value)
                    }
                  />
                </Field>

                <Field label="Department" required>
                  <Dropdown
                    value={form.department}
                    selectedOptions={[form.department]}
                    onOptionSelect={(_, data) =>
                      handleChange("department", data.optionValue)
                    }
                  >
                    <Option value="Engineering">Engineering</Option>
                    <Option value="Design">Design</Option>
                    <Option value="HR">HR</Option>
                    <Option value="Marketing">Marketing</Option>
                  </Dropdown>
                </Field>

                <Field label="Job Role" required>
                  <Input
                    value={form.role}
                    required
                    placeholder="Frontend Developer"
                    onChange={(_, data) =>
                      handleChange("role", data.value)
                    }
                  />
                </Field>

                <Field label="Monthly Salary (₹)" required>
                  <Input
                    type="number"
                    min="0"
                    value={form.salary}
                    required
                    placeholder="Enter salary"
                    onChange={(_, data) =>
                      handleChange("salary", data.value)
                    }
                  />
                </Field>

                <Field label="Status" required>
                  <Dropdown
                    value={form.status}
                    selectedOptions={[form.status]}
                    onOptionSelect={(_, data) =>
                      handleChange("status", data.optionValue)
                    }
                  >
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                    <Option value="On Leave">On Leave</Option>
                  </Dropdown>
                </Field>
              </div>
            </DialogContent>

            <DialogActions>
              <Button
                appearance="secondary"
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button
                appearance="primary"
                type="submit"
              >
                Add Employee
              </Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
}
