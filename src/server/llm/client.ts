// This helper picks the right LLM provider and returns a full chat reply.
export type LlmMessage = { role: "system" | "user" | "assistant"; content: string };

type CallChatModelArgs = {
  messages: LlmMessage[];
  provider?: string;
};

const FALLBACK_REPLY = "I am here to help you shape a clear learning goal.";

export async function callChatModel({ messages, provider }: CallChatModelArgs): Promise<string> {
  const activeProvider = (provider || process.env.DEFAULT_API || "aliyun").toLowerCase();

  if (activeProvider === "chatgpt") {
    return postToOpenAI(messages);
  }

  if (activeProvider === "aliyun") {
    return postToAliyun(messages);
  }

  console.warn(`Unknown LLM provider "${activeProvider}", returning fallback text.`);
  return FALLBACK_REPLY;
}

// This sends the prompt to the Aliyun Qwen compatible endpoint.
async function postToAliyun(messages: LlmMessage[]): Promise<string> {
  const apiKey = process.env.ALIBABA_CLOUD_API_KEY;
  if (!apiKey) {
    console.warn("ALIBABA_CLOUD_API_KEY missing, using fallback reply.");
    return FALLBACK_REPLY;
  }

  try {
    const response = await fetch("https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "qwen-plus",
        messages,
      }),
    });
    if (!response.ok) {
      console.error("Aliyun call failed with status", response.status);
      return FALLBACK_REPLY;
    }
    const data = (await response.json()) as any;
    const content = data?.choices?.[0]?.message?.content;
    return typeof content === "string" ? content : FALLBACK_REPLY;
  } catch (err) {
    console.error("Aliyun chat failed:", err);
    return FALLBACK_REPLY;
  }
}

// This sends the prompt to OpenAI ChatGPT when selected.
async function postToOpenAI(messages: LlmMessage[]): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn("OPENAI_API_KEY missing, using fallback reply.");
    return FALLBACK_REPLY;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
      }),
    });
    if (!response.ok) {
      console.error("OpenAI call failed with status", response.status);
      return FALLBACK_REPLY;
    }
    const data = (await response.json()) as any;
    const content = data?.choices?.[0]?.message?.content;
    return typeof content === "string" ? content : FALLBACK_REPLY;
  } catch (err) {
    console.error("OpenAI chat failed:", err);
    return FALLBACK_REPLY;
  }
}
