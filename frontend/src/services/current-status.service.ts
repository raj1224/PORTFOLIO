import api from "./api";

export type CurrentStatusType =
  | "learning"
  | "working"
  | "building";

export type CurrentStatusState =
  | "planning"
  | "in_progress"
  | "completed"
  | "paused";

export interface CurrentStatus {
  _id: string;
  title: string;
  description: string;
  type: CurrentStatusType;
  status: CurrentStatusState;
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCurrentStatusData {
  title: string;
  description: string;
  type: CurrentStatusType;
  status?: CurrentStatusState;
  order?: number;
  isVisible?: boolean;
}

export interface UpdateCurrentStatusData {
  title?: string;
  description?: string;
  type?: CurrentStatusType;
  status?: CurrentStatusState;
  order?: number;
  isVisible?: boolean;
}

export const getCurrentStatuses = async (): Promise<
  CurrentStatus[]
> => {
  const response = await api.get("/current-status");

  return response.data.data;
};

export const getAllCurrentStatuses = async (): Promise<
  CurrentStatus[]
> => {
  const response = await api.get("/current-status/admin/all");

  return response.data.data;
};

export const createCurrentStatus = async (
  data: CreateCurrentStatusData
): Promise<CurrentStatus> => {
  const response = await api.post("/current-status", data);

  return response.data.data;
};

export const updateCurrentStatus = async (
  statusId: string,
  data: UpdateCurrentStatusData
): Promise<CurrentStatus> => {
  const response = await api.patch(
    `/current-status/${statusId}`,
    data
  );

  return response.data.data;
};

export const deleteCurrentStatus = async (
  statusId: string
): Promise<void> => {
  await api.delete(`/current-status/${statusId}`);
};