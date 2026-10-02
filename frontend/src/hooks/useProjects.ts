import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createProject,
  deleteProject,
  getAllProjects,
  getProjectBySlug,
  getProjects,
  updateProject,
  uploadProjectImages,
  uploadProjectThumbnail,
  deleteProjectImage,
  type CreateProjectData,
  type UpdateProjectData,
} from "../services/project.service";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
};

export const useProject = (slug: string) => {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: () => getProjectBySlug(slug),
    enabled: Boolean(slug),
  });
};

export const useAdminProjects = () => {
  return useQuery({
    queryKey: ["admin-projects"],
    queryFn: getAllProjects,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProjectData) =>
      createProject(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      data,
    }: {
      projectId: string;
      data: UpdateProjectData;
    }) => updateProject(projectId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) =>
      deleteProject(projectId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};

export const useUploadProjectImages = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      files,
    }: {
      projectId: string;
      files: File[];
    }) => uploadProjectImages(projectId, files),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};

export const useUploadProjectThumbnail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      file,
    }: {
      projectId: string;
      file: File;
    }) => uploadProjectThumbnail(projectId, file),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};

export const useDeleteProjectImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      projectId,
      publicId,
    }: {
      projectId: string;
      publicId: string;
    }) => deleteProjectImage(projectId, publicId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};