import { Button } from "@/components/base/ui/button";
import { AlertCircle, CheckSquare, CreditCard, Package } from "lucide-react";
import React from "react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/base/ui/card";
import Link from "next/link";

const QuickAction = () => {
	return (
		<Card className="shadow-sm">
			<CardHeader>
				<CardTitle>Quick Actions</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{/* <Button
						size="lg"
						variant="outline"
						className="h-20 flex-col bg-transparent"
					>
						<CheckSquare className="h-6 w-6 mb-2" />
						View 
					</Button> */}
					<Button
						size="lg"
						variant="outline"
						className="h-20 flex-col bg-transparent"
					>
						<Link
							href="/projects/create-project"
							className="flex flex-col items-center"
						>
							<Package className="h-6 w-6 mb-2" />
							Create new project
						</Link>
					</Button>
					{/* <Button
						size="lg"
						variant="outline"
						className="h-20 flex-col bg-transparent"
					>
						<CreditCard className="h-6 w-6 mb-2" />
						Log Payment
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="h-20 flex-col bg-transparent"
					>
						<AlertCircle className="h-6 w-6 mb-2" />
						Report Issue
					</Button> */}
				</div>
			</CardContent>
		</Card>
	);
};

export default QuickAction;
