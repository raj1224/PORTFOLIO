import api from "./api";
import type { Project } from "../types/project";

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get("/projects");

  return response.data.data;
};

export const getProjectBySlug = async (
  slug: string,
): Promise<Project> => {
  const response = await api.get(`/projects/${slug}`);

  return response.data.data;
};