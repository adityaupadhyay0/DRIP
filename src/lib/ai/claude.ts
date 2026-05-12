import Anthropic from '@anthropic-ai/sdk';
import { AIProvider, AIResponse } from './adapter';

export class ClaudeProvider implements AIProvider {
  name = 'anthropic';
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || '',
    });
  }

  async generateText(prompt: string): Promise<AIResponse> {
    if (!process.env.ANTHROPIC_API_KEY) {
      return { text: "Claude API key not configured. Mock response: That's a great fashion choice!" };
    }

    const message = await this.client.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    return { text: (message.content[0] as any).text };
  }

  async analyzeImage(imageUrl: string, prompt: string): Promise<AIResponse> {
    // Basic implementation for Phase 2
    return { text: "Vision analysis placeholder" };
  }
}

export const aiProvider = new ClaudeProvider();
