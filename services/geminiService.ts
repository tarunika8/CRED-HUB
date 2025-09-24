
import { GoogleGenAI, Type } from "@google/genai";
import type { Certificate, RoadmapSuggestion } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const roadmapSchema = {
    type: Type.OBJECT,
    properties: {
        roadmap: {
            type: Type.ARRAY,
            description: "An array of 3 to 5 course or skill suggestions.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: {
                        type: Type.STRING,
                        description: "The name of the suggested course or skill.",
                    },
                    description: {
                        type: Type.STRING,
                        description: "A brief description of what this course/skill entails.",
                    },
                    rationale: {
                        type: Type.STRING,
                        description: "A concise explanation for why this is a good next step for the user.",
                    },
                },
                 required: ["title", "description", "rationale"]
            },
        },
    },
    required: ["roadmap"]
};


export const generateLearningRoadmap = async (certificates: Certificate[]): Promise<RoadmapSuggestion[]> => {
    const certificateList = certificates.map(c => `- ${c.title} by ${c.issuer}`).join('\n');
    
    const prompt = `
    I am a professional looking to advance my career. Based on my existing micro-credentials listed below, suggest a personalized learning roadmap. Provide 3-5 specific courses or skills I should learn next to fill skill gaps and become more valuable in the job market.

    My current credentials:
    ${certificateList}

    For each suggestion, provide a title, a brief description, and a rationale for why it's a good fit for my profile.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: roadmapSchema,
                temperature: 0.7,
            },
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);

        if (parsedJson && parsedJson.roadmap) {
            return parsedJson.roadmap as RoadmapSuggestion[];
        } else {
            throw new Error("Invalid JSON structure in response.");
        }
    } catch (error) {
        console.error("Error generating learning roadmap:", error);
        throw new Error("Failed to generate learning roadmap from AI. Please try again later.");
    }
};
