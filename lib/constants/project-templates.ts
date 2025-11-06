import { IMaterial, IProjectTemplate } from "../types";

// Default project templates
export const templates: IProjectTemplate[] = [
	{
		id: crypto.randomUUID(),
		name: "Office Building Construction",
		description:
			"Complete template for multi-story office building construction",
		owner: "System",
		budget: 1000000,
		location: "New York, NY",
		category: "Commercial",
		phases: [
			{
				id: crypto.randomUUID(),
				name: "Planning & Permits",
				description:
					"Initial planning, design approvals, and permit acquisition",
				budget: 80000,
				startDate: new Date(),
				endDate: null,
				estimatedDuration: 9,
				tasks: [
					{
						id: crypto.randomUUID(),
						name: "Architectural Design Review",
						description:
							"Review and approve architectural plans and specifications",
						plannedBudget: 25000,
						estimatedDuration: 3,
						materials: [],
					},
					{
						id: crypto.randomUUID(),
						name: "Building Permit Application",
						description:
							"Submit and process building permit applications",
						estimatedDuration: 3,
						plannedBudget: 35000,
						materials: [],
					},
					{
						id: crypto.randomUUID(),
						name: "Environmental Impact Assessment",
						description:
							"Complete environmental impact study and documentation",
						estimatedDuration: 3,
						plannedBudget: 20000,
						materials: [],
					},
				],
			},
			{
				id: crypto.randomUUID(),
				name: "Site Preparation",
				description: "Site clearing, surveying, and utility setup",
				budget: 120000,
				startDate: new Date(),
				endDate: null,
				estimatedDuration: 9,
				tasks: [
					{
						id: crypto.randomUUID(),
						name: "Site Survey and Marking",
						description:
							"Professional site survey and boundary marking",
						estimatedDuration: 3,
						plannedBudget: 15000,
						materials: [],
					},
					{
						id: crypto.randomUUID(),
						name: "Site Clearing and Grading",
						description:
							"Clear vegetation and grade the construction site",
						estimatedDuration: 3,
						plannedBudget: 65000,
						materials: [
							{
								id: crypto.randomUUID(),
								materialId: "3",
								name: "Lumber 2x4",
								plannedQuantity: 50,
								unit: "pieces",
								unitCost: 8,
							},
							{
								id: crypto.randomUUID(),
								materialId: "9",
								name: "Cement",
								plannedQuantity: 100,
								unit: "bags",
								unitCost: 12,
							},
						],
					},
					{
						id: crypto.randomUUID(),
						name: "Utility Connections Setup",
						description:
							"Establish temporary utility connections for construction",
						estimatedDuration: 3,
						plannedBudget: 40000,
						materials: [
							{
								id: crypto.randomUUID(),
								materialId: "4",
								name: "Electrical Wire",
								plannedQuantity: 500,
								unit: "feet",
								unitCost: 250,
							},
							{
								id: crypto.randomUUID(),
								materialId: "5",
								name: "PVC Pipe",
								plannedQuantity: 300,
								unit: "feet",
								unitCost: 300,
							},
						],
					},
				],
			},
			{
				id: crypto.randomUUID(),
				name: "Foundation Work",
				description:
					"Excavation, foundation pouring, and basement construction",
				budget: 180000,
				startDate: new Date(),
				endDate: null,
				estimatedDuration: 9,
				tasks: [
					{
						id: crypto.randomUUID(),
						name: "Foundation Excavation",
						description:
							"Excavate foundation area according to architectural plans",
						estimatedDuration: 3,
						plannedBudget: 45000,
						materials: [],
					},
					{
						id: crypto.randomUUID(),
						name: "Steel Rebar Installation",
						description:
							"Install steel reinforcement bars in foundation",
						estimatedDuration: 3,
						plannedBudget: 25000,
						materials: [
							{
								id: crypto.randomUUID(),
								materialId: "1",
								name: "Steel Rebar",
								plannedQuantity: 5,
								unit: "tons",
								unitCost: 500,
							},
						],
					},
					{
						id: crypto.randomUUID(),
						name: "Foundation Concrete Pour",
						description: "Pour concrete for building foundation",
						estimatedDuration: 3,
						plannedBudget: 110000,
						materials: [
							{
								id: crypto.randomUUID(),
								materialId: "2",
								name: "Concrete Mix",
								plannedQuantity: 50,
								unit: "cubic yards",
								unitCost: 120,
							},
							{
								id: crypto.randomUUID(),
								materialId: "9",
								name: "Cement",
								plannedQuantity: 200,
								unit: "bags",
								unitCost: 12,
							},
						],
					},
				],
			},
			{
				id: crypto.randomUUID(),
				name: "Structural Framework",
				description: "Steel and concrete framework construction",
				budget: 250000,
				startDate: new Date(),
				endDate: null,
				estimatedDuration: 6,
				tasks: [
					{
						id: crypto.randomUUID(),
						name: "Steel Frame Erection",
						description: "Assemble and weld steel frame structures",
						estimatedDuration: 3,
						plannedBudget: 125000,
						materials: [
							{
								id: crypto.randomUUID(),
								materialId: "1",
								name: "Steel Rebar",
								plannedQuantity: 10,
								unit: "tons",
								unitCost: 500,
							},
							{
								id: crypto.randomUUID(),
								materialId: "3",
								name: "Lumber 2x4",
								plannedQuantity: 200,
								unit: "pieces",
								unitCost: 8,
							},
						],
					},
					{
						id: crypto.randomUUID(),
						name: "Concrete Slabs",
						description:
							"Pour reinforced concrete slabs for each floor",
						estimatedDuration: 3,
						plannedBudget: 125000,
						materials: [
							{
								id: crypto.randomUUID(),
								materialId: "2",
								name: "Concrete Mix",
								plannedQuantity: 80,
								unit: "cubic yards",
								unitCost: 120,
							},
							{
								id: crypto.randomUUID(),
								materialId: "1",
								name: "Steel Rebar",
								plannedQuantity: 8,
								unit: "tons",
								unitCost: 500,
							},
						],
					},
				],
			},
			{
				id: crypto.randomUUID(),
				name: "MEP Systems",
				description:
					"Mechanical, Electrical, and Plumbing installations",
				budget: 200000,
				startDate: new Date(),
				endDate: null,
				estimatedDuration: 9,
				tasks: [
					{
						id: crypto.randomUUID(),
						name: "Electrical Wiring Installation",
						description: "Install conduits, wiring, and panels",
						estimatedDuration: 3,
						plannedBudget: 70000,
						materials: [
							{
								id: crypto.randomUUID(),
								materialId: "4",
								name: "Electrical Wire",
								plannedQuantity: 1000,
								unit: "feet",
								unitCost: 25,
							},
							{
								id: crypto.randomUUID(),
								materialId: "12",
								name: "Windows",
								plannedQuantity: 20,
								unit: "pieces",
								unitCost: 250,
							},
						],
					},
					{
						id: crypto.randomUUID(),
						name: "Plumbing Installation",
						description:
							"Install water supply and drainage systems",
						estimatedDuration: 3,
						plannedBudget: 80000,
						materials: [
							{
								id: crypto.randomUUID(),
								materialId: "5",
								name: "PVC Pipe",
								plannedQuantity: 800,
								unit: "feet",
								unitCost: 3,
							},
							{
								id: crypto.randomUUID(),
								materialId: "15",
								name: "Plumbing Fixtures",
								plannedQuantity: 30,
								unit: "pieces",
								unitCost: 150,
							},
						],
					},
					{
						id: crypto.randomUUID(),
						name: "HVAC Installation",
						description:
							"Install heating, ventilation, and air conditioning systems",
						estimatedDuration: 3,
						plannedBudget: 50000,
						materials: [
							{
								id: crypto.randomUUID(),
								materialId: "14",
								name: "HVAC Units",
								plannedQuantity: 3,
								unit: "pieces",
								unitCost: 1200,
							},
							{
								id: crypto.randomUUID(),
								materialId: "7",
								name: "Insulation",
								plannedQuantity: 50,
								unit: "rolls",
								unitCost: 45,
							},
						],
					},
				],
			},
			{
				id: crypto.randomUUID(),
				name: "Interior Construction",
				description:
					"Interior walls, finishes, and fixtures installation",
				budget: 150000,
				startDate: new Date(),
				endDate: null,
				estimatedDuration: 9,
				tasks: [
					{
						id: crypto.randomUUID(),
						name: "Drywall Installation",
						description: "Install drywall partitions and ceilings",
						estimatedDuration: 3,
						plannedBudget: 45000,
						materials: [
							{
								id: crypto.randomUUID(),
								materialId: "6",
								name: "Drywall Sheets",
								plannedQuantity: 200,
								unit: "pieces",
								unitCost: 15,
							},
							{
								id: crypto.randomUUID(),
								materialId: "3",
								name: "Lumber 2x4",
								plannedQuantity: 150,
								unit: "pieces",
								unitCost: 8,
							},
						],
					},
					{
						id: crypto.randomUUID(),
						name: "Flooring Installation",
						description: "Install tiles and flooring materials",
						estimatedDuration: 3,
						plannedBudget: 67500,
						materials: [
							{
								id: crypto.randomUUID(),
								materialId: "11",
								name: "Tiles",
								plannedQuantity: 3000,
								unit: "square feet",
								unitCost: 400,
							},
							{
								id: crypto.randomUUID(),
								materialId: "9",
								name: "Cement",
								plannedQuantity: 100,
								unit: "bags",
								unitCost: 12,
							},
						],
					},
					{
						id: crypto.randomUUID(),
						name: "Painting & Finishes",
						description: "Apply paint and finishing touches",
						estimatedDuration: 3,
						plannedBudget: 37500,
						materials: [
							{
								id: crypto.randomUUID(),
								materialId: "10",
								name: "Paint",
								plannedQuantity: 200,
								unit: "gallons",
								unitCost: 35,
							},
							{
								id: crypto.randomUUID(),
								materialId: "13",
								name: "Doors",
								plannedQuantity: 25,
								unit: "pieces",
								unitCost: 180,
							},
						],
					},
				],
			},
			{
				id: crypto.randomUUID(),
				name: "Final Inspections & Handover",
				description:
					"Quality checks, safety inspections, and final approvals",
				budget: 50000,
				startDate: new Date(),
				endDate: null,
				estimatedDuration: 6,
				tasks: [
					{
						id: crypto.randomUUID(),
						name: "Safety Inspections",
						description:
							"Conduct fire, electrical, and safety inspections",
						estimatedDuration: 3,
						plannedBudget: 20000,
						materials: [],
					},
					{
						id: crypto.randomUUID(),
						name: "Client Walkthrough & Handover",
						description:
							"Final walkthrough with client and official handover",
						estimatedDuration: 3,
						plannedBudget: 30000,
						materials: [],
					},
				],
			},
		],
	},
];
