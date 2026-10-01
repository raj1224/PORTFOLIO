import { useQuery } from "@tanstack/react-query";
import {
  getProjects,
  getProjectBySlug,
  getAllProjects,
} from "../services/project.service";

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

export const useProject = (slug: string) =>
  useQuery({
    queryKey: ["project", slug],
    queryFn: () => getProjectBySlug(slug),
    enabled: Boolean(slug),
  });

export const useAdminProjects = () =>
  useQuery({
    queryKey: ["admin-projects"],
    queryFn: getAllProjects,
  });