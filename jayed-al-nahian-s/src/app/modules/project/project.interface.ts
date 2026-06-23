export type ProjectType = "FRONTEND" | "BACKEND" | "FULLSTACK";

export interface createProject {
  title: string;
  description: string;
  content: string;
  type: ProjectType;
  thumbnailUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  tags: string[];
  featured?: boolean;
}

export interface updateProject {
  title?: string;
  description?: string;
  content?: string;
  type?: ProjectType;
  thumbnailUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags?: string[];
  featured?: boolean;
}
