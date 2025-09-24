
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  verificationCode: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  relevance: number; // 1-10
  reputation: number; // 1-10
  imageUrl: string;
}

export interface UserProfile {
  name: string;
  avatarUrl: string;
  title: string;
}

export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    matchScore: number;
    requiredSkills: string[];
    link: string;
}

export interface RoadmapSuggestion {
    title: string;
    description: string;
    rationale: string;
}
