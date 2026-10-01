import { useQuery } from "@tanstack/react-query";

import { getLeetCodeDashboard } from "../services/leetcode.service";

export const useLeetCodeDashboard = () => {
  return useQuery({
    queryKey: ["leetcode-dashboard"],
    queryFn: getLeetCodeDashboard,
  });
};