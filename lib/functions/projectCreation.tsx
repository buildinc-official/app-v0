import { addMaterial } from "../middleware/materials";
import { addPhase } from "../middleware/phases";
import { addProjectMember } from "../middleware/projectMembers";
import { addProject } from "../middleware/projects";
import { addTask } from "../middleware/tasks";
import {
	IPhaseTemplate,
	ITaskTemplate,
	IMaterial,
	IProjectCreationData,
	IMaterialTemplate,
	IOrganisation,
	IProjectMemberDB,
} from "../types";

`
    PHASE FUNCTIONS
`;

export const phaseCreationFunctions = () => {
	// Handle drag and drop for phases
	const handlePhaseDragEnd = (
		result: any,
		projectData: IProjectCreationData,
		setProjectData: React.Dispatch<
			React.SetStateAction<IProjectCreationData>
		>
	) => {
		if (!result.destination) return;

		const items = Array.from(projectData.phases);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		// Update order numbers
		const updatedPhases = items.map((phase, index) => ({
			...phase,
			order: index + 1,
		}));

		setProjectData((prev) => ({ ...prev, phases: updatedPhases }));
	};

	// Add new phase
	const addPhase = (
		setProjectData: React.Dispatch<
			React.SetStateAction<IProjectCreationData>
		>
	) => {
		const newPhase: IPhaseTemplate = {
			id: crypto.randomUUID(),
			name: "",
			description: "",
			budget: 0,
			tasks: [],
			estimatedDuration: 0,
			startDate: null,
			endDate: null,
		};

		setProjectData((prev) => ({
			...prev,
			phases: [...prev.phases, newPhase],
		}));
	};

	// Remove phase
	const removePhase = (
		phaseId: string,
		setProjectData: React.Dispatch<
			React.SetStateAction<IProjectCreationData>
		>
	) => {
		setProjectData((prev) => ({
			...prev,
			phases: prev.phases.filter((p) => p.id !== phaseId),
		}));
	};

	// Update phase
	const updatePhase = (
		phaseId: string,
		updates: Partial<IPhaseTemplate>,
		setProjectData: React.Dispatch<
			React.SetStateAction<IProjectCreationData>
		>
	) => {
		setProjectData((prev) => ({
			...prev,
			phases: prev.phases.map((p) =>
				p.id === phaseId ? { ...p, ...updates } : p
			),
		}));
	};

	// Select all phases (stub, update when you add selection state)
	const selectAllPhases = () => {
		// console.log("Select all phases");
	};

	// Duplicate phase
	const duplicatePhase = (
		phase: IPhaseTemplate,
		setProjectData: React.Dispatch<
			React.SetStateAction<IProjectCreationData>
		>
	) => {
		const duplicatedPhase: IPhaseTemplate = {
			...phase,
			id: crypto.randomUUID(),
			name: `${phase.name} (Copy)`,
		};

		setProjectData((prev) => ({
			...prev,
			phases: [...prev.phases, duplicatedPhase],
		}));
	};

	// Calculate total budget from phases
	const getTotalPhaseBudget = (projectData: IProjectCreationData) => {
		return projectData.phases.reduce(
			(sum, phase) => sum + (phase.budget ?? 0),
			0
		);
	};

	return {
		handlePhaseDragEnd,
		addPhase,
		removePhase,
		updatePhase,
		selectAllPhases,
		duplicatePhase,
		getTotalPhaseBudget,
	};
};

`
    TASK FUNCTIONS
`;
export const taskCreationFunctions = () => {
	const removeTask = (
		phaseId: string,
		taskId: string,
		setProjectData: React.Dispatch<
			React.SetStateAction<IProjectCreationData>
		>
	) => {
		setProjectData((prev) => {
			const updatedPhases = prev.phases.map((phase) =>
				phase.id === phaseId
					? {
							...phase,
							tasks: phase.tasks.filter((t) => t.id !== taskId),
					  }
					: phase
			);
			return { ...prev, phases: updatedPhases };
		});
	};

	/**
	 * Duplicate a task and insert it right below the original
	 */
	const duplicateTask = (
		phaseId: string,
		taskId: string,
		setProjectData: React.Dispatch<
			React.SetStateAction<IProjectCreationData>
		>
	) => {
		setProjectData((prev) => {
			const updatedPhases = prev.phases.map((phase) => {
				if (phase.id !== phaseId) return phase;

				const index = phase.tasks.findIndex((t) => t.id === taskId);
				if (index === -1) return phase;

				const original = phase.tasks[index];
				const duplicate: ITaskTemplate = {
					...original,
					id: crypto.randomUUID(),
					name: `${original.name} (Copy)`,
					materials: original.materials.map((m) => ({
						...m,
						id: crypto.randomUUID(),
					})),
				};

				const newTasks = [...phase.tasks];
				newTasks.splice(index + 1, 0, duplicate);

				return { ...phase, tasks: newTasks };
			});

			return { ...prev, phases: updatedPhases };
		});
	};
	/**
	 * Update a specific task inside a phase
	 */
	function updateTask(
		phaseId: string,
		taskId: string,
		updates: Partial<ITaskTemplate>,
		setProjectData: React.Dispatch<
			React.SetStateAction<IProjectCreationData>
		>
	) {
		setProjectData((prev) => {
			const phases = prev.phases.map((phase) => {
				if (phase.id !== phaseId) return phase;

				const tasks = phase.tasks.map((task) =>
					task.id === taskId ? { ...task, ...updates } : task
				);

				return { ...phase, tasks };
			});
			return { ...prev, phases };
		});
	}

	/**
	 * Add a task inside a phase
	 */
	function addTask(
		phaseId: string,
		setProjectData: React.Dispatch<
			React.SetStateAction<IProjectCreationData>
		>
	) {
		setProjectData((prev) => {
			const phases = prev.phases.map((phase) => {
				if (phase.id !== phaseId) return phase;
				const newTask: ITaskTemplate = {
					id: crypto.randomUUID(),
					name: "New Task",
					description: "",
					plannedBudget: 0,
					estimatedDuration: 0,
					materials: [],
				};
				const tasks = [...phase.tasks, newTask]; // ✅ create new array

				return { ...phase, tasks };
			});
			return { ...prev, phases };
		});
	}

	return {
		removeTask,
		addTask,
		updateTask,
		duplicateTask,
	};
};

`
    MATERIAL FUNCTIONS
`;
export const materialCreationFunctions = () => {
	/**
	 * Add Material to a task
	 */
	function addMaterial(
		phaseId: string,
		taskId: string,
		setProjectData: React.Dispatch<
			React.SetStateAction<IProjectCreationData>
		>,
		material: IMaterialTemplate
	) {
		const newMaterial: IMaterialTemplate = {
			id: crypto.randomUUID(),
			materialId: material.materialId,
			name: material.name || "",
			plannedQuantity: material?.plannedQuantity ?? 0,
			unit: material.unit || "",
			unitCost: material.unitCost ?? 0,
			defaultUnit: material.defaultUnit,
			units: material.units,
		};

		setProjectData((prev) => {
			const phases = prev.phases.map((phase) => {
				if (phase.id !== phaseId) return phase;

				const tasks = phase.tasks.map((task) =>
					task.id === taskId
						? {
								...task,
								materials: [
									...(task.materials || []),
									newMaterial,
								],
						  }
						: task
				);

				return { ...phase, tasks };
			});
			return { ...prev, phases };
		});
	}

	/**
	 * Update a material inside a task
	 */
	function updateMaterial(
		phaseId: string,
		taskId: string,
		materialId: string,
		updates: Partial<IMaterial>,
		setProjectData: React.Dispatch<
			React.SetStateAction<IProjectCreationData>
		>
	) {
		setProjectData((prev) => {
			const phases = prev.phases.map((phase) => {
				if (phase.id !== phaseId) return phase;

				const tasks = phase.tasks.map((task) => {
					if (task.id !== taskId) return task;

					const materials = task.materials.map((mat) =>
						mat.id === materialId ? { ...mat, ...updates } : mat
					);

					return { ...task, materials };
				});

				return { ...phase, tasks };
			});
			return { ...prev, phases };
		});
	}

	/**
	 * Remove a material from a task
	 */
	function removeMaterial(
		phaseId: string,
		taskId: string,
		materialId: string,
		setProjectData: React.Dispatch<
			React.SetStateAction<IProjectCreationData>
		>
	) {
		setProjectData((prev) => {
			const phases = prev.phases.map((phase) => {
				if (phase.id !== phaseId) return phase;

				const tasks = phase.tasks.map((task) =>
					task.id === taskId
						? {
								...task,
								materials: task.materials.filter(
									(mat) => mat.id !== materialId
								),
						  }
						: task
				);

				return { ...phase, tasks };
			});
			return { ...prev, phases };
		});
	}

	return {
		addMaterial,
		removeMaterial,
		updateMaterial,
	};
};

`
	MIDDLEWARE FUNCTIONS
`;

export const saveProjectToDB = async (
	projectData: IProjectCreationData,
	organisation: IOrganisation
): Promise<void> => {
	// adding project to DB
	const createdProject = await addProject(projectData);

	// addings projectData to DB
	projectData.phases.forEach(async (phase) => {
		// adding phase to DB
		const createdPhase = await addPhase({
			...phase,
			projectId: createdProject.id,
			created_at: new Date(),
			status: ["Inactive"],
			order: projectData.phases.findIndex((p) => p.id === phase.id) + 1,
			totalTasks: 0,
			completedTasks: 0,
			taskIds: [],
			spent: 0,
		});

		// adding tasks to DB
		phase.tasks.forEach(async (task) => {
			const createdTask = await addTask({
				phaseId: createdPhase.id,
				id: crypto.randomUUID(),
				created_at: new Date(),
				assignedTo: null,
				status: "Inactive",
				spent: 0,
				startDate: null,
				endDate: null,
				completedDate: null,
				approvedBy: null,
				order: phase.tasks.findIndex((t) => t.id === task.id) + 1,
				name: task.name,
				description: task.description,
				plannedBudget: task.plannedBudget || 0,
				estimatedDuration: task.estimatedDuration || 0,
				materialIds: [],
				completionNotes: "",
				rejectionReason: "",
				paymentCompleted: false,
				materialsCompleted: task.materials.length === 0 ? true : false,
				projectId: createdProject.id,
				projectName: createdProject.name,
			});

			task.materials.forEach(async (material) => {
				// adding materials to DB
				await addMaterial({
					id: crypto.randomUUID(),
					taskId: createdTask.id,
					name: material.name ?? "",
					plannedQuantity: material.plannedQuantity ?? 0,
					unitCost: material.unitCost ?? 0,
					materialId: material.materialId ?? "",
					usedQuantity: 0,
					unit: material.unit || "",
					requested: false,
					approved: false,
					deliveredQuantity: 0,
					wasteQuantity: 0,
				});
			});
		});
	});

	// adding supervisor as a project member
	await addProjectMember({
		id: crypto.randomUUID(),
		joinedAt: new Date(),
		projectId: createdProject.id, // use the id returned from DB
		userId: projectData.supervisor,
		role: "Supervisor",
	});

	// adding all organisation members as project members except supervisor
	organisation &&
		organisation.memberIds?.forEach(async (member) => {
			if (member === projectData.supervisor) return;
			const newProjectMember: IProjectMemberDB = {
				id: crypto.randomUUID(),
				joinedAt: new Date(),
				projectId: createdProject.id,
				userId: member,
				role: "Supervisor",
			};
			await addProjectMember(newProjectMember);
		});
};
