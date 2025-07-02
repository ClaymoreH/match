// Storage utilities for candidate and company data management
// Using CPF for candidates and CNPJ for companies as unique identifiers

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
    enneagramType: {
      type: number;
      name: string;
      description: string;
    };
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

// Company Interfaces
export interface CompanyData {
  cnpj: string;
  name: string;
  address: string;
  city: string;
  state: string;
  cep: string;
  foundedYear: string;
  employeeCount: string;
  about: string;
  email: string;
  phone: string;
  website?: string;
  industry: string;
  createdAt: string;
  updatedAt: string;
}

// Job Interfaces
export interface Job {
  id: string;
  companyCnpj: string;
  title: string;
  area: string;
  contractType: string; // CLT, PJ, Freelancer, Estágio
  workModel: string; // Presencial, Remoto, Híbrido
  city: string;
  salary: string;
  vacancies: number;
  description: string;
  requirements: string;
  benefits?: string;
  status: "active" | "closed" | "paused";
  stages: string[]; // Etapas do processo seletivo
  questions: string[]; // Perguntas da triagem
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  closedAt?: string;
}

// Application Interfaces
export interface JobApplication {
  id: string;
  jobId: string;
  candidateCpf: string;
  companyCnpj: string;
  status: "applied" | "reviewing" | "approved" | "rejected" | "withdrawn";
  currentStage: string; // Current stage in the selection process
  stageHistory: {
    stage: string;
    status: "pending" | "approved" | "rejected";
    date: string;
    notes?: string;
  }[];
  answers: Record<string, string>; // Answers to screening questions
  appliedAt: string;
  updatedAt: string;
}

// User Authentication Interfaces
export interface User {
  id: string;
  email: string;
  password: string; // In production, this should be hashed
  userType: "candidate" | "company";
  cpfOrCnpj: string; // CPF for candidates, CNPJ for companies
  fullName: string; // Individual name or company name
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
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
const COMPANIES_STORAGE_KEY = "companies_data";
const JOBS_STORAGE_KEY = "jobs_data";
const CURRENT_USER_CPF_KEY = "current_user_cpf";
const CURRENT_COMPANY_CNPJ_KEY = "current_company_cnpj";

// Utility functions
export const formatCPF = (cpf: string): string => {
  const digits = cpf.replace(/\D/g, "");
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const validateCPF = (cpf: string): boolean => {
  const digits = cpf.replace(/\D/g, "");
  return digits.length === 11;
};

export const formatCNPJ = (cnpj: string): string => {
  const digits = cnpj.replace(/\D/g, "");
  return digits.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5",
  );
};

export const validateCNPJ = (cnpj: string): boolean => {
  const digits = cnpj.replace(/\D/g, "");
  return digits.length === 14;
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

// ========== COMPANY STORAGE FUNCTIONS ==========

// Get all companies
export const getAllCompanies = (): Record<string, CompanyData> => {
  if (typeof window === "undefined") return {};

  try {
    const data = localStorage.getItem(COMPANIES_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Error reading companies data:", error);
    return {};
  }
};

// Get company data by CNPJ
export const getCompanyData = (cnpj: string): CompanyData | null => {
  const companies = getAllCompanies();
  const cleanCNPJ = cnpj.replace(/\D/g, "");
  return companies[cleanCNPJ] || null;
};

// Save company data
export const saveCompanyData = (data: CompanyData): boolean => {
  if (typeof window === "undefined") return false;

  try {
    const companies = getAllCompanies();
    const cleanCNPJ = data.cnpj.replace(/\D/g, "");

    if (!validateCNPJ(cleanCNPJ)) {
      throw new Error("CNPJ inválido");
    }

    const now = new Date().toISOString();
    companies[cleanCNPJ] = {
      ...data,
      updatedAt: now,
      createdAt: data.createdAt || now,
    };

    localStorage.setItem(COMPANIES_STORAGE_KEY, JSON.stringify(companies));
    return true;
  } catch (error) {
    console.error("Error saving company data:", error);
    return false;
  }
};

// Current company management
export const setCurrentCompanyCNPJ = (cnpj: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(CURRENT_COMPANY_CNPJ_KEY, cnpj.replace(/\D/g, ""));
  }
};

export const getCurrentCompanyCNPJ = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CURRENT_COMPANY_CNPJ_KEY);
};

export const getCurrentCompanyData = (): CompanyData | null => {
  const cnpj = getCurrentCompanyCNPJ();
  return cnpj ? getCompanyData(cnpj) : null;
};

// ========== JOB STORAGE FUNCTIONS ==========

// Get all jobs
export const getAllJobs = (): Record<string, Job> => {
  if (typeof window === "undefined") return {};

  try {
    const data = localStorage.getItem(JOBS_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error("Error reading jobs data:", error);
    return {};
  }
};

// Get job by ID
export const getJobById = (jobId: string): Job | null => {
  const jobs = getAllJobs();
  return jobs[jobId] || null;
};

// Get jobs by company CNPJ
export const getJobsByCompany = (cnpj: string): Job[] => {
  const jobs = getAllJobs();
  const cleanCNPJ = cnpj.replace(/\D/g, "");
  return Object.values(jobs).filter((job) => job.companyCnpj === cleanCNPJ);
};

// Get active jobs by company
export const getActiveJobsByCompany = (cnpj: string): Job[] => {
  return getJobsByCompany(cnpj).filter((job) => job.status === "active");
};

// Get closed jobs by company
export const getClosedJobsByCompany = (cnpj: string): Job[] => {
  return getJobsByCompany(cnpj).filter((job) => job.status === "closed");
};

// Save job
export const saveJob = (job: Job): boolean => {
  if (typeof window === "undefined") return false;

  try {
    const jobs = getAllJobs();
    const now = new Date().toISOString();

    jobs[job.id] = {
      ...job,
      updatedAt: now,
      createdAt: job.createdAt || now,
    };

    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
    return true;
  } catch (error) {
    console.error("Error saving job:", error);
    return false;
  }
};

// Create new job
export const createJob = (
  jobData: Omit<Job, "id" | "createdAt" | "updatedAt">,
): string | null => {
  try {
    const jobId = Date.now().toString();
    const now = new Date().toISOString();

    const job: Job = {
      ...jobData,
      id: jobId,
      createdAt: now,
      updatedAt: now,
    };

    const success = saveJob(job);
    return success ? jobId : null;
  } catch (error) {
    console.error("Error creating job:", error);
    return null;
  }
};

// Update job status
export const updateJobStatus = (
  jobId: string,
  status: Job["status"],
): boolean => {
  const job = getJobById(jobId);
  if (!job) return false;

  const updatedJob = {
    ...job,
    status,
    closedAt: status === "closed" ? new Date().toISOString() : job.closedAt,
  };

  return saveJob(updatedJob);
};

// Delete job
export const deleteJob = (jobId: string): boolean => {
  if (typeof window === "undefined") return false;

  try {
    const jobs = getAllJobs();
    delete jobs[jobId];
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
    return true;
  } catch (error) {
    console.error("Error deleting job:", error);
    return false;
  }
};
