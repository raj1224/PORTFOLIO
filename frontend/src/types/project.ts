export type ProjectStatus =
  | "draft"
  | "published"
  | "archived";

export interface ProjectImage {
  url: string;
  publicId: string;
}

export interface Project {
  _id: string;

  title: string;
  slug: string;

  description: string;
  shortDescription?: string;

  techStack: string[];

  githubUrl?: string;
  liveUrl?: string;

  images: ProjectImage[];

  thumbnail?: ProjectImage;

  status: ProjectStatus;

  featured: boolean;

  order: number;

  createdAt: string;
  updatedAt: string;
}