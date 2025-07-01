// Storage utilities for candidate data management
// Using CPF as the unique identifier

export interface CandidatePersonalData {
  cpf: string;
  fullName: string;
  birthDate: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  cep: string;
  about: string;
  profileImage?: string;
}

export interface CandidateExperience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
}

export interface CandidateEducation {
  id: string;
  degree: string;
  institution: string;
  completionYear: string;
  description?: string;
}

export interface CandidateCourse {
  id: string;
  name: string;
  institution: string;
  hours: number;
  year: string;
}

export interface CandidateLanguage {
  id: string;
  name: string;
  level: string;
  proficiency: number;
  certification?: string;
}

export interface CandidateSkills {
  technical: string[];
  soft: string[];
}

export interface CandidateDocuments {
  resume?: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
}

export interface BehavioralAnalysis {
  section1: {
    collaboration: string;
    problemSolving: string;
    communication: string;
    initiative: string;
    adaptation: string;
    influence: string;
    learning: string;
  };
  section2: {
    workEnvironment: string[];
    values: string[];
    careerGoals: string;
  };
  section3: {
    logicalReasoning: string;
    dataAnalysis: string;
    bigFive0: number;
    bigFive1: number;
    bigFive2: number;
    bigFive3: number;
    bigFive4: number;
    interpersonalSkills: string;
    conflictResolution: string;
    growthMindset: string;
    adaptability: string;
    motivation: string;
    resilience: string;
    creativity: string;
    innovation: string;
    ethics: string;
    values: string;
  };
  aiInsights?: {
    profile: string;
    profileSummary: string;
    bigFiveDistribution: {
      openness: number;
      conscientiousness: number;
      extraversion: number;
      agreeableness: number;
      neuroticism: number;
    };
    behavioralHighlights: {
      communication: string;
      decision: string;
      leadership: string;
      problemSolving: string;
      adaptability: string;
    };
    suggestions: {
      recommendedPositions: string[];
      standoutTips: string[];
      developmentAreas: string[];
    };
  };
  completedAt?: string;
}

export interface CandidateData {
  personal: CandidatePersonalData;
  experiences: CandidateExperience[];
  education: CandidateEducation[];
  courses: CandidateCourse[];
  languages: CandidateLanguage[];
  skills: CandidateSkills;
  documents: CandidateDocuments;
  behavioralAnalysis?: BehavioralAnalysis;
  createdAt: string;
  updatedAt: string;
}

// Storage keys
const CANDIDATES_STORAGE_KEY = "candidates_data";
const CURRENT_USER_CPF_KEY = "current_user_cpf";

// Utility functions
export const formatCPF = (cpf: string): string => {
  const digits = cpf.replace(/\D/g, "");
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const validateCPF = (cpf: string): boolean => {
  const digits = cpf.replace(/\D/g, "");
  return digits.length === 11;
};

// Storage functions
export const getAllCandidates = (): Record<string, CandidateData> => {
  if (typeof window === "undefined") return {};

  try {
    const data = localStorage.getItem(CANDIDATES_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Error reading candidates data:", error);
    return {};
  }
};

export const getCandidateData = (cpf: string): CandidateData | null => {
  const candidates = getAllCandidates();
  const cleanCPF = cpf.replace(/\D/g, "");
  return candidates[cleanCPF] || null;
};

export const saveCandidateData = (data: CandidateData): boolean => {
  if (typeof window === "undefined") return false;

  try {
    const candidates = getAllCandidates();
    const cleanCPF = data.personal.cpf.replace(/\D/g, "");

    if (!validateCPF(cleanCPF)) {
      throw new Error("CPF inválido");
    }

    const now = new Date().toISOString();
    candidates[cleanCPF] = {
      ...data,
      updatedAt: now,
      createdAt: data.createdAt || now,
    };

    localStorage.setItem(CANDIDATES_STORAGE_KEY, JSON.stringify(candidates));
    return true;
  } catch (error) {
    console.error("Error saving candidate data:", error);
    return false;
  }
};

export const updateCandidatePersonalData = (
  cpf: string,
  personalData: CandidatePersonalData,
): boolean => {
  const existingData = getCandidateData(cpf);
  const cleanCPF = cpf.replace(/\D/g, "");

  if (existingData) {
    return saveCandidateData({
      ...existingData,
      personal: personalData,
    });
  } else {
    // Create new candidate record
    const newCandidate: CandidateData = {
      personal: personalData,
      experiences: [],
      education: [],
      courses: [],
      languages: [],
      skills: { technical: [], soft: [] },
      documents: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return saveCandidateData(newCandidate);
  }
};

export const updateCandidateBehavioralAnalysis = (
  cpf: string,
  analysis: BehavioralAnalysis,
): boolean => {
  const existingData = getCandidateData(cpf);

  if (existingData) {
    return saveCandidateData({
      ...existingData,
      behavioralAnalysis: {
        ...analysis,
        completedAt: new Date().toISOString(),
      },
    });
  }
  return false;
};

export const addCandidateExperience = (
  cpf: string,
  experience: Omit<CandidateExperience, "id">,
): boolean => {
  const existingData = getCandidateData(cpf);

  if (existingData) {
    const newExperience: CandidateExperience = {
      ...experience,
      id: Date.now().toString(),
    };

    return saveCandidateData({
      ...existingData,
      experiences: [...existingData.experiences, newExperience],
    });
  }
  return false;
};

export const updateCandidateExperience = (
  cpf: string,
  experienceId: string,
  experience: Partial<CandidateExperience>,
): boolean => {
  const existingData = getCandidateData(cpf);

  if (existingData) {
    const updatedExperiences = existingData.experiences.map((exp) =>
      exp.id === experienceId ? { ...exp, ...experience } : exp,
    );

    return saveCandidateData({
      ...existingData,
      experiences: updatedExperiences,
    });
  }
  return false;
};

export const deleteCandidateExperience = (
  cpf: string,
  experienceId: string,
): boolean => {
  const existingData = getCandidateData(cpf);

  if (existingData) {
    const filteredExperiences = existingData.experiences.filter(
      (exp) => exp.id !== experienceId,
    );

    return saveCandidateData({
      ...existingData,
      experiences: filteredExperiences,
    });
  }
  return false;
};

export const addCandidateEducation = (
  cpf: string,
  education: Omit<CandidateEducation, "id">,
): boolean => {
  const existingData = getCandidateData(cpf);

  if (existingData) {
    const newEducation: CandidateEducation = {
      ...education,
      id: Date.now().toString(),
    };

    return saveCandidateData({
      ...existingData,
      education: [...existingData.education, newEducation],
    });
  }
  return false;
};

export const updateCandidateEducation = (
  cpf: string,
  educationId: string,
  education: Partial<CandidateEducation>,
): boolean => {
  const existingData = getCandidateData(cpf);

  if (existingData) {
    const updatedEducation = existingData.education.map((edu) =>
      edu.id === educationId ? { ...edu, ...education } : edu,
    );

    return saveCandidateData({
      ...existingData,
      education: updatedEducation,
    });
  }
  return false;
};

export const deleteCandidateEducation = (
  cpf: string,
  educationId: string,
): boolean => {
  const existingData = getCandidateData(cpf);

  if (existingData) {
    const filteredEducation = existingData.education.filter(
      (edu) => edu.id !== educationId,
    );

    return saveCandidateData({
      ...existingData,
      education: filteredEducation,
    });
  }
  return false;
};

export const addCandidateCourse = (
  cpf: string,
  course: Omit<CandidateCourse, "id">,
): boolean => {
  const existingData = getCandidateData(cpf);

  if (existingData) {
    const newCourse: CandidateCourse = {
      ...course,
      id: Date.now().toString(),
    };

    return saveCandidateData({
      ...existingData,
      courses: [...existingData.courses, newCourse],
    });
  }
  return false;
};

export const deleteCandidateCourse = (
  cpf: string,
  courseId: string,
): boolean => {
  const existingData = getCandidateData(cpf);

  if (existingData) {
    const filteredCourses = existingData.courses.filter(
      (course) => course.id !== courseId,
    );

    return saveCandidateData({
      ...existingData,
      courses: filteredCourses,
    });
  }
  return false;
};

export const addCandidateLanguage = (
  cpf: string,
  language: Omit<CandidateLanguage, "id">,
): boolean => {
  const existingData = getCandidateData(cpf);

  if (existingData) {
    const newLanguage: CandidateLanguage = {
      ...language,
      id: Date.now().toString(),
    };

    return saveCandidateData({
      ...existingData,
      languages: [...existingData.languages, newLanguage],
    });
  }
  return false;
};

export const deleteCandidateLanguage = (
  cpf: string,
  languageId: string,
): boolean => {
  const existingData = getCandidateData(cpf);

  if (existingData) {
    const filteredLanguages = existingData.languages.filter(
      (lang) => lang.id !== languageId,
    );

    return saveCandidateData({
      ...existingData,
      languages: filteredLanguages,
    });
  }
  return false;
};

export const updateCandidateSkills = (
  cpf: string,
  skills: CandidateSkills,
): boolean => {
  const existingData = getCandidateData(cpf);

  if (existingData) {
    return saveCandidateData({
      ...existingData,
      skills,
    });
  }
  return false;
};

export const updateCandidateDocuments = (
  cpf: string,
  documents: CandidateDocuments,
): boolean => {
  const existingData = getCandidateData(cpf);

  if (existingData) {
    return saveCandidateData({
      ...existingData,
      documents,
    });
  }
  return false;
};

// Current user management (for session)
export const setCurrentUserCPF = (cpf: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(CURRENT_USER_CPF_KEY, cpf.replace(/\D/g, ""));
  }
};

export const getCurrentUserCPF = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CURRENT_USER_CPF_KEY);
};

export const getCurrentUserData = (): CandidateData | null => {
  const cpf = getCurrentUserCPF();
  return cpf ? getCandidateData(cpf) : null;
};

// Calculate profile completion percentage
export const calculateProfileCompletion = (data: CandidateData): number => {
  let completed = 0;
  let total = 0;

  // Personal data (weight: 40%)
  const personalFields = ["fullName", "birthDate", "cpf", "email", "phone"];
  personalFields.forEach((field) => {
    total += 8;
    if (data.personal[field as keyof CandidatePersonalData]) completed += 8;
  });

  // Experiences (weight: 20%)
  total += 20;
  if (data.experiences.length > 0) completed += 20;

  // Education (weight: 15%)
  total += 15;
  if (data.education.length > 0) completed += 15;

  // Skills (weight: 15%)
  total += 15;
  if (data.skills.technical.length > 0 || data.skills.soft.length > 0)
    completed += 15;

  // Behavioral analysis (weight: 10%)
  total += 10;
  if (data.behavioralAnalysis) completed += 10;

  return Math.round((completed / total) * 100);
};
