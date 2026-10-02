import api from "./api";
import type { Project } from "../types/project";

export interface CreateProjectData {
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  status?: "draft" | "published" | "archived";
  featured?: boolean;
  order?: number;
}

export type UpdateProjectData =
  Partial<CreateProjectData>;

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get("/projects");

  return response.data.data;
};

export const getProjectBySlug = async (
  slug: string
): Promise<Project> => {
  const response = await api.get(`/projects/${slug}`);

  return response.data.data;
};

export const getAllProjects = async (): Promise<Project[]> => {
  const response = await api.get("/projects/admin/all");

  return response.data.data;
};

export const createProject = async (
  data: CreateProjectData
): Promise<Project> => {
  const response = await api.post("/projects", data);

  return response.data.data;
};

export const updateProject = async (
  projectId: string,
  data: UpdateProjectData
): Promise<Project> => {
  const response = await api.patch(
    `/projects/${projectId}`,
    data
  );

  return response.data.data;
};

export const deleteProject = async (
  projectId: string
): Promise<void> => {
  await api.delete(`/projects/${projectId}`);
};

export const uploadProjectImages = async (
  projectId: string,
  files: File[]
): Promise<Project> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("images", file);
  });

  const response = await api.post(
    `/projects/${projectId}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
};

export const uploadProjectThumbnail = async (
  projectId: string,
  file: File
): Promise<Project> => {
  const formData = new FormData();

  formData.append("thumbnail", file);

  const response = await api.patch(
    `/projects/${projectId}/thumbnail`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
};

export const deleteProjectImage = async (
  projectId: string,
  publicId: string
): Promise<Project> => {
  const response = await api.delete(
    `/projects/${projectId}/images`,
    {
      data: {
        publicId,
      },
    }
  );

  return response.data.data;
};