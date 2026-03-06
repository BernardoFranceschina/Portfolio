export interface Project {
  _path: string;
  order: number;
  
  id: string;
  title: string;
  description: string;
  image: string;
  second_image: string;
  architecture_image: string;
  color: string;
  tags: string[];
  year: string;
  company: string;
  category: string;
  role: string;
  features: string[];
  highlights: string[];
  
  challenge_text: string;
  development_text: string;
  result_text: string;
}