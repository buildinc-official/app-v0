import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export const SummaryCard = ({
	title,
	content,
	icon,
}: {
	title: string;
	content: number | string | React.ReactNode;
	icon?: React.ReactNode;
}) => {
	return (
		<Card className="shadow-sm text-card-foreground">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium text-card-foreground">
					{title}
				</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{content}</div>
			</CardContent>
		</Card>
	);
};
