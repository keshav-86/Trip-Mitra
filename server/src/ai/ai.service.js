"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTripPlan = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const ai_prompts_1 = require("./ai.prompts");
const groq = new groq_sdk_1.default({
    apiKey: process.env.GROQ_API_KEY,
});
const generateTripPlan = async (data) => {
    const prompt = (0, ai_prompts_1.buildTripPlannerPrompt)(data);
    console.log("======================================");
    console.log("Calling Groq API...");
    console.log("API Key:", process.env.GROQ_API_KEY?.substring(0, 8) + "...");
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
        return JSON.parse(cleaned);
    }
    catch (err) {
        console.log("Raw AI Output:");
        console.log(cleaned);
        throw new Error("Groq returned invalid JSON. Check terminal output.");
    }
};
exports.generateTripPlan = generateTripPlan;
//# sourceMappingURL=ai.service.js.map