import OpenAI from 'openai';

let openai = null

  try{
    openai = new OpenAI({
      apiKey: import.meta.env.VITE_APIKEY, 
      baseURL: import.meta.env.VITE_BASE_URL
    });
  }catch(error){
    console.log("openAI initialization failed", error)
  }
  
export const completeCall = async (txt: string) => {
  const response = await openai?.chat.completions.create({
    messages: [
      { role: "system", content: import.meta.env.VITE_SYSTEM_MESSAGE},
      { role: "user", content: txt }
    ],
    model: import.meta.env.VITE_AIMODEL,
  });

  return response;
};

export const streamChat = async (messages: OpenAI.Chat.ChatCompletionMessageParam[], onChunk: (chunk: string) => void) => {
  const stream = await openai?.chat.completions.create({
    messages,
    model: import.meta.env.VITE_AIMODEL,
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