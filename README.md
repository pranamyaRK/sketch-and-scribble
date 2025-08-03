# Sketch 'n' Scribble: Scene and Dialogue Generator

A web application that uses Google AI Studio (Gemini Pro) to generate immersive branching dialogues and scene descriptions for fantasy or sci-fi scenarios. Ideal for storytellers, writers, and game developers prototyping interactive narratives.

## Overview

This app allows users to:
- Describe a scene and character
- Generate RPG-style branching dialogue trees using AI
- (Optionally) generate an image of the scene
- Download the output (text or image)

![Image showing the application's initial screen](<image_demo.png>)

**Note:** This is my submission for [DEV Education Track: Build Apps with Google AI Studio](https://dev.to/deved/build-apps-with-google-ai-studio).

## Description

Using prompt engineering and the Gemini API, this tool dynamically builds game-like conversations between characters and players. Users input a custom scene, define a character's traits, and specify the player's intent. The AI responds with a formatted dialogue tree and can optionally generate a visual of the scene (for users with a billed Gemini API key).

The app is designed to work securely - all API keys are entered client-side and are never stored or transmitted.

Built with:
- [Google AI Studio (Gemini)](https://aistudio.google.com/app/apps)
- Vite + React + TypeScript
- Deployable on Netlify or Vercel

## Live Demo & Blog

- 🌐 **Live Demo**: [here](#)
- ✍️ **Blog Post**: [Read about how it was built](#)


## Dependencies

Make sure you have **Node.js (v16 or above)** installed.

Main dependencies:
- `react`
- `vite`
- `typescript`
- `dotenv`
- `@google/generative-ai`


## Installing the Project

1. Clone the repository.
```bash
git clone https://github.com/yourusername/narrative-dialogue-generator.git
```

2. Install dependencies.
```bash
npm install
```
<!-- 
3. Create environment file `.env.local`.
4. Then add your Google Gemini API key inside `.env.local`:
```bash
GEMINI_API_KEY=your_api_key_here
``` -->

3. Run the App Locally
```bash 
npm run dev
```

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
