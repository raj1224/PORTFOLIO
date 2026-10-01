import { useQuery } from "@tanstack/react-query";
import {
  getProjects,
  getProjectBySlug,
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