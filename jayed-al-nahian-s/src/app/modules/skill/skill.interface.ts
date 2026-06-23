export type SkillCategory =
  | "FRONTEND"
  | "BACKEND"
  | "DEVOPS"
  | "PROGRAMMING_LANGUAGE"
  | "SPOKEN_LANGUAGE"
  | "AI_TOOL";

export interface createSkill {
  name: string;
  category: SkillCategory;
  proficiency?: number;
  icon?: string;
  order?: number;
}

export interface updateSkill {
  name?: string;
  category?: SkillCategory;
  proficiency?: number;
  icon?: string;
  order?: number;
}
