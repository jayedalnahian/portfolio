export interface createProfile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  github?: string;
  linkedin?: string;
  bio: string;
  summary: string;
}

export interface updateProfile {
  name?: string;
  title?: string;
  location?: string;
  email?: string;
  phone?: string;
  resumeUrl?: string;
  github?: string;
  linkedin?: string;
  bio?: string;
  summary?: string;
}
