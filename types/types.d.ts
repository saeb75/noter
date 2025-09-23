// اطلاعات کاربر
export interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// کل پاسخ API
export interface AuthResponse {
  jwt: string;
  user: User;
}

interface ApiYoutubeLinkResponse {
  success: boolean;
  message: string;
  data: {
    audioUrl: string;
    s3Key: string;
    fileName: string;
    fileSize: number;
    duration: number;
    transcription: string;
    summary: string;
    keyPoints: string[];
    questions: {
      question: string;
      answer: string;
    }[];
    wordCount: {
      original: number;
      summary: number;
    };
    generationId: string;
  };
}

export interface GeneratedItem {
  createdAt: string;
  id: number;
  documentId: string;
  title: string;
  description: string;
  state: string;
  transcript: string;
  summary: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string | null;
  type: string;
  input_link: string;
  user: {
    id: number;
    documentId: string;
    username: string;
    email: string;
  };
  questions: any[];
}

export interface ItemsMeta {
  total: number;
}

export interface YoutubeApiResponse {
  data: GeneratedItem[];
  meta: ItemsMeta;
}
