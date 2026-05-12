export interface AIResponse {
  text: string;
  data?: any;
}

export interface AIProvider {
  name: string;
  generateText(prompt: string): Promise<AIResponse>;
  analyzeImage(imageUrl: string, prompt: string): Promise<AIResponse>;
}
