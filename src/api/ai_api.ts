import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'dummy', 
  baseURL: import.meta.env.VITE_BASE_URL,
  dangerouslyAllowBrowser: true 
});

export const completeCall = async (txt: string) => {
  const response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: `You are a useful Asistant AI. be useful`},
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
    max_tokens: 4048, 
    temperature: 0.7,
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    if (content) {
      onChunk(content);
    }
  }
};