import Groq from "groq-sdk";
import { buildTripPlannerPrompt } from "./ai.prompts";
import {
  TripPlanRequest,
  TripPlanResponse,
} from "./ai.types";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateTripPlan = async (
  data: TripPlanRequest
): Promise<TripPlanResponse> => {
  const prompt = buildTripPlannerPrompt(data);

  console.log("======================================");
  console.log("Calling Groq API...");
  console.log(
    "API Key:",
    process.env.GROQ_API_KEY?.substring(0, 8) + "..."
  );
  console.log("======================================");

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const text = completion.choices[0]?.message?.content;

  if (!text) {
    throw new Error("Groq returned an empty response.");
  }

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned) as TripPlanResponse;
  } catch (err) {
    console.log("Raw AI Output:");
    console.log(cleaned);

    throw new Error(
      "Groq returned invalid JSON. Check terminal output."
    );
  }
};