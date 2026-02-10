// This helper picks the right LLM provider and returns a full chat reply.
export type LlmMessage = { role: "system" | "user" | "assistant"; content: string };

type CallChatModelArgs = {
  messages: LlmMessage[];
  provider?: string;
};

const FALLBACK_REPLY = "I am here to help you shape a clear learning goal.";
const FAKE_JSON_GOAL =
  '{"command":"create_learning_goal","learningGoal":"I want to create a clear, actionable plan by next week that defines specific time and energy boundaries between my full-time job and my personal business, so I can reduce overwhelm and operate more intentionally."}';

// We try to ask the model to think hard, so answers are more reliable.
// Some models do not support this setting, so we retry without it if needed.
const REASONING_EFFORT = "high";

export async function callChatModel({ messages, provider }: CallChatModelArgs): Promise<string> {
  const activeProvider = (provider || process.env.DEFAULT_API || "aliyun").toLowerCase();
  const shouldLog = process.env.NODE_ENV !== "production";

  if (shouldLog) {
    console.log("[llm] request provider:", activeProvider);
    console.log("[llm] request messages:", messages);
  }

  if (activeProvider === "fake") {
    return FAKE_JSON_GOAL;
  }

  if (activeProvider === "chatgpt") {
    const reply = await postToOpenAI(messages, shouldLog);
    if (shouldLog) {
      console.log("[llm] response chatgpt:", reply);
    }
    return reply;
  }

  if (activeProvider === "aliyun") {
    const reply = await postToAliyun(messages, shouldLog);
    if (shouldLog) {
      console.log("[llm] response aliyun:", reply);
    }
    return reply;
  }

  console.warn(`Unknown LLM provider "${activeProvider}", returning fallback text.`);
  return FALLBACK_REPLY;
}

// This sends the prompt to the Aliyun Qwen compatible endpoint.
async function postToAliyun(messages: LlmMessage[], shouldLog: boolean): Promise<string> {
  const apiKey = process.env.ALIBABA_CLOUD_API_KEY;
  if (!apiKey) {
    console.warn("ALIBABA_CLOUD_API_KEY missing, using fallback reply.");
    return FALLBACK_REPLY;
  }

  const model = process.env.ALIYUN_REASONING || "qwen-plus";

  try {
    const url = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";
    const baseBody = { model, messages };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ ...baseBody, reasoning_effort: REASONING_EFFORT }),
    });

    const responseText = await response.text();
    if (!response.ok) {
      const shouldRetryWithoutReasoning =
        response.status === 400 && responseText.includes("Unrecognized request argument supplied: reasoning_effort");

      if (shouldRetryWithoutReasoning) {
        const retryResponse = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(baseBody),
        });

        const retryText = await retryResponse.text();
        if (!retryResponse.ok) {
          console.error("Aliyun retry call failed with status", retryResponse.status);
          if (shouldLog) {
            console.error("[llm] aliyun retry error body:", retryText);
          }
          return FALLBACK_REPLY;
        }

        const data = JSON.parse(retryText) as any;
        const content = data?.choices?.[0]?.message?.content;
        return typeof content === "string" ? content : FALLBACK_REPLY;
      }

      console.error("Aliyun call failed with status", response.status);
      if (shouldLog) {
        console.error("[llm] aliyun error body:", responseText);
      }
      return FALLBACK_REPLY;
    }

    const data = JSON.parse(responseText) as any;
    const content = data?.choices?.[0]?.message?.content;
    return typeof content === "string" ? content : FALLBACK_REPLY;
  } catch (err) {
    console.error("Aliyun chat failed:", err);
    return FALLBACK_REPLY;
  }
}

// This sends the prompt to OpenAI ChatGPT when selected.
async function postToOpenAI(messages: LlmMessage[], shouldLog: boolean): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.warn("OPENAI_API_KEY missing, using fallback reply.");
    return FALLBACK_REPLY;
  }

  const model = process.env.OPENAI_REASONING || "gpt-4o-mini";

  try {
    const url = "https://api.openai.com/v1/chat/completions";
    const baseBody = { model, messages };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ ...baseBody, reasoning_effort: REASONING_EFFORT }),
    });

    const responseText = await response.text();
    if (!response.ok) {
      const shouldRetryWithoutReasoning =
        response.status === 400 && responseText.includes("Unrecognized request argument supplied: reasoning_effort");

      if (shouldRetryWithoutReasoning) {
        const retryResponse = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(baseBody),
        });

        const retryText = await retryResponse.text();
        if (!retryResponse.ok) {
          console.error("OpenAI retry call failed with status", retryResponse.status);
          if (shouldLog) {
            console.error("[llm] openai retry error body:", retryText);
          }
          return FALLBACK_REPLY;
        }

        const data = JSON.parse(retryText) as any;
        const content = data?.choices?.[0]?.message?.content;
        return typeof content === "string" ? content : FALLBACK_REPLY;
      }

      console.error("OpenAI call failed with status", response.status);
      if (shouldLog) {
        console.error("[llm] openai error body:", responseText);
      }
      return FALLBACK_REPLY;
    }

    const data = JSON.parse(responseText) as any;
    const content = data?.choices?.[0]?.message?.content;
    return typeof content === "string" ? content : FALLBACK_REPLY;
  } catch (err) {
    console.error("OpenAI chat failed:", err);
    return FALLBACK_REPLY;
  }
}
