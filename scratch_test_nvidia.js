const OpenAI = require("openai");

const nvidiaApiKey = "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";

async function testNvidia() {
  console.log("Testing NVIDIA NIM API...");
  const openai = new OpenAI({
    apiKey: nvidiaApiKey,
    baseURL: "https://integrate.api.nvidia.com/v1",
    timeout: 8000,
  });

  try {
    const start = Date.now();
    const completion = await openai.chat.completions.create({
      model: "deepseek-ai/deepseek-v4-flash-0731",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "hi" },
      ],
      temperature: 0.6,
      max_tokens: 100,
    });
    console.log("Success in", Date.now() - start, "ms!");
    console.log("Reply:", completion.choices[0]?.message?.content);
  } catch (err) {
    console.error("NVIDIA call failed:", err.message, err.status, err.code);
  }
}

testNvidia();
