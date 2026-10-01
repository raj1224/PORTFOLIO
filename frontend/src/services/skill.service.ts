import api from "./api";

export interface Skill {
  _id: string;
  name: string;
  category: string;
  icon?: string;
  isVisible: boolean;
  order: number;
}

export const getSkills = async (): Promise<Skill[]> => {
  const response = await api.get("/skills");

  return response.data.data;
};

export const getAllSkills = async (): Promise<Skill[]> => {
  const response = await api.get("/skills/admin/all");

  return response.data.data;
};