import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'dummy', 
  baseURL: import.meta.env.VITE_BASE_URL,
  dangerouslyAllowBrowser: true 
});

export const completeCall = async (txt: string) => {
  const response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are SmartAssistant, an AI assistant. Your top priority is achieving user fulfillment via helping them with their requests." },
      { role: "user", content: txt }
    ],
    model: 'small',
  });

  return response;
};

export const streamChat = async (messages: OpenAI.Chat.ChatCompletionMessageParam[], onChunk: (chunk: string) => void) => {
  const stream = await openai.chat.completions.create({
    messages,
    model: 'small',
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    if (content) {
      onChunk(content);
    }
  }
};