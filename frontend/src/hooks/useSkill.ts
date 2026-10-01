import { useQuery } from "@tanstack/react-query";

import {
  getSkills,
  getAllSkills,
} from "../services/skill.service";

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });
};

export const useAdminSkills = () => {
  return useQuery({
    queryKey: ["admin-skills"],
    queryFn: getAllSkills,
  });
};