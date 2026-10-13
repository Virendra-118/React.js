
import { Button, Avatar } from "@fluentui/react-components";
import { AlertRegular } from "@fluentui/react-icons";

export default function Navbar({ title }) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <h2 className="text-xl font-bold text-slate-800">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Welcome back! Here's your team overview.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button
          appearance="subtle"
          icon={<AlertRegular />}
          aria-label="Notifications"
        />

        <Avatar
          name="Virendra Singh"
          color="colorful"
          size={40}
        />
      </div>
    </header>
  );
}
