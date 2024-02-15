export interface FormData {
  createdAt: Date;
  description: string;
  id: string;
  title: string;
  updatedAt: Date;
  userId: string;
}

export interface DetailFormData {
  data: {
    id: string;
    title: string;
    description?: string;
  };
}
