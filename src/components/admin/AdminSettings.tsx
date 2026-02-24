import { Card, CardContent } from "@/components/index";
import { ReactNode } from "react";

interface SettingSectionProps {
  title: string;
  description: string;
  children: ReactNode;
  icon?: ReactNode;
}

const AdminSettings = ({
  title,
  description,
  children,
  icon,
}: SettingSectionProps) => {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden mb-6">
      <CardContent className="p-6 md:p-8 space-y-6">
        <div className="flex items-start gap-3">{icon}</div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            {title}
          </h2>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
        {children}
      </CardContent>
    </Card>
  );
};

export default AdminSettings;
