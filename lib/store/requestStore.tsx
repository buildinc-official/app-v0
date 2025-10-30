// lib/store/requestStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IRequest } from "@/lib/types";
import { useProfileStore } from "./profileStore";
import { getDetailsForRequest } from "../functions/requests";

interface RequestState {
	requests: Record<string, IRequest>;
	setRequests: (requests: IRequest[]) => void;
	updateRequest: (id: string, updates: Partial<IRequest>) => void;
	addRequest: (request: IRequest) => void;
	deleteRequest: (id: string) => void;
	getRequest: (id: string) => IRequest | undefined;
	getUserRequests: (userId: string) => IRequest[];
	getProjectRequests: (projectId: string) => IRequest[];
	clearRequests: () => void;
}

export const useRequestStore = create<RequestState>()(
	persist(
		(set, get) => ({
			requests: {},

			setRequests: (requests) => {
				const requestsObj: Record<string, IRequest> = {};
				requests.forEach((request) => {
					requestsObj[request.id] = request;
				});
				// console.log("Setting requests in store:", requestsObj);

				set({ requests: requestsObj });
			},

			updateRequest: (id, updates) => {
				set((state) => {
					const existing = state.requests[id];
					if (existing) {
						return {
							requests: {
								...state.requests,
								[id]: { ...existing, ...updates },
							},
						};
					}
					return state;
				});
			},

			addRequest: (request) => {
				const completed = getDetailsForRequest(request) as IRequest;
				set((state) => ({
					requests: {
						...state.requests,
						[completed.id]: completed,
					},
				}));
			},

			deleteRequest: (id) => {
				set((state) => {
					const { [id]: _, ...remainingRequests } = state.requests;
					return { requests: remainingRequests };
				});
			},

			getRequest: (id) => {
				return get().requests[id];
			},

			getUserRequests: (userId) => {
				const requests = Object.values(get().requests);
				return requests.filter(
					(request) =>
						request.requestedBy === userId ||
						request.requestedTo === userId
				);
			},

			getProjectRequests: (projectId) => {
				const requests = Object.values(get().requests);
				return requests.filter(
					(request) => request.projectId === projectId
				);
			},

			clearRequests: () => {
				set({ requests: {} });
			},
		}),
		{
			name: "request-storage",
		}
	)
);
