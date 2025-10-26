import { LucideIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface StatCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    iconColor: string;

    description: string;
}

const DashboardStats = ({
    icon: Icon,
    value,
    title,
    description,
    iconColor,
}: StatCardProps) => {
    return (
        <Card className={`border-2 hover:shadow-lg transition-shadow`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="font-medium text-lg text-muted-foreground">
                    {title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${iconColor}`} />
            </CardHeader>
            <CardContent>
                <div className={`text-3xl font-bold ${iconColor}`}>{value}</div>
                <p className="text-sm text-muted-foreground mt-1">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
};

export default DashboardStats;
