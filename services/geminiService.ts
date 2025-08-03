import { GoogleGenAI, Type } from "@google/genai";
import { DialogueLine } from '../types';

function getAiClient(apiKey: string) {
  if (!apiKey) {
    // This case should be handled in the UI, but as a safeguard:
    throw new Error("API Key is missing. Please provide a valid API key.");
  }
  return new GoogleGenAI({ apiKey });
}

const dialogueSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      character: {
        type: Type.STRING,
        description: 'The name of the character speaking.'
      },
      dialogue: {
        type: Type.STRING,
        description: 'The line of dialogue spoken by the character.'
      }
    },
    required: ['character', 'dialogue']
  }
};

export async function generateDialogue(apiKey: string, scenario: string): Promise<DialogueLine[]> {
  try {
    const ai = getAiClient(apiKey);
    const prompt = `
You are a master storyteller and dialogue writer for fantasy RPGs. 
Based on the following scenario, generate between 5 and 10 lines of engaging and in-character dialogue.
The dialogue should reveal something about the world, the characters' personalities, or the current plot.

Scenario:
---
${scenario}
---

Return the dialogue as a valid JSON array where each object has a "character" and a "dialogue" field.
Do not include any other text or markdown formatting in your response.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: dialogueSchema,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    const text = response.text.trim();
    if (!text.startsWith('[')) {
        throw new Error("AI returned an invalid response format.");
    }
    const dialogue = JSON.parse(text) as DialogueLine[];
    return dialogue;

  } catch (error) {
    console.error("Error generating dialogue:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate dialogue from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating dialogue.");
  }
}

export async function generateSceneImage(apiKey: string, scenario: string): Promise<string> {
  try {
    const ai = getAiClient(apiKey);
    const prompt = `Generate a vivid, atmospheric, and high-quality fantasy art image that visually represents the setting described in the following RPG scenario. Focus on the environment, mood, and key landmarks mentioned. Avoid depicting specific characters. The style should be reminiscent of epic fantasy concept art.

Scenario:
---
${scenario}
---
`;

    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image?.imageBytes) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("The AI did not return a valid image.");
    }

  } catch (error) {
    console.error("Error generating image:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the image.");
  }
}
