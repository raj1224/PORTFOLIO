import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getCurrentStatuses,
  getAllCurrentStatuses,
  createCurrentStatus,
  updateCurrentStatus,
  deleteCurrentStatus,
  type CreateCurrentStatusData,
  type UpdateCurrentStatusData,
} from "../services/current-status.service";

// ==============================
// PUBLIC
// ==============================

export const useCurrentStatuses = () => {
  return useQuery({
    queryKey: ["current-status"],
    queryFn: getCurrentStatuses,
  });
};

// ==============================
// ADMIN - GET ALL
// ==============================

export const useAdminCurrentStatuses = () => {
  return useQuery({
    queryKey: ["admin-current-status"],
    queryFn: getAllCurrentStatuses,
  });
};

// ==============================
// CREATE
// ==============================

export const useCreateCurrentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: CreateCurrentStatusData
    ) => createCurrentStatus(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-current-status"],
      });

      queryClient.invalidateQueries({
        queryKey: ["current-status"],
      });
    },
  });
};

// ==============================
// UPDATE
// ==============================

export const useUpdateCurrentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      statusId,
      data,
    }: {
      statusId: string;
      data: UpdateCurrentStatusData;
    }) =>
      updateCurrentStatus(
        statusId,
        data
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-current-status"],
      });

      queryClient.invalidateQueries({
        queryKey: ["current-status"],
      });
    },
  });
};

// ==============================
// DELETE
// ==============================

export const useDeleteCurrentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      statusId: string
    ) =>
      deleteCurrentStatus(statusId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-current-status"],
      });

      queryClient.invalidateQueries({
        queryKey: ["current-status"],
      });
    },
  });
};