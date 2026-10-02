import api from "./api";

export interface AuthUser {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "user";
  avatar?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (
  data: LoginData
): Promise<AuthUser> => {
  const response = await api.post("/auth/login", data);

  return response.data.data.user;
};

export const getCurrentUser = async (): Promise<AuthUser> => {
  const response = await api.get("/auth/current-user");

  return response.data.data;
};

export const logoutUser = async (): Promise<void> => {
  await api.post("/auth/logout");
};