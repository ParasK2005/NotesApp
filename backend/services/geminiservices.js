const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");

const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
        retryOptions: {
            attempts: 5,
            initialDelay: 2.0,
        }
    }
});

async function uploadAndProcessFile(filepath, mimetype, displayname) {
    console.log(`Uploading ${displayname} to Gemini File API...`);

    const uploadresult = await ai.files.upload({
        file: filepath,
        mimeType: mimetype,
        config: {
            displayName: displayname,
        },
    });

    let file = await ai.files.get({ name: uploadresult.name });

    while (file.state === "PROCESSING") {
        console.log("waiting for video processing to complete...");
        await new Promise((resolve) => setTimeout(resolve, 3000));
        file = await ai.files.get({ name: uploadresult.name });
    }

    if (file.state !== "ACTIVE") {
        throw new Error(`File processing failed, current state: ${file.state}`);
    }

    console.log(`File is active at: ${file.uri}`);
    return file;
}

async function generateNotesFromFile(file, mimetype, isquestionpaper = false) {
    const modelname = "gemini-3.5-flash";
    let prompt = "";

    if (isquestionpaper) {
        prompt = `You are an expert tutor. This is a question paper document.
Analyze the questions in this document and generate a comprehensive study note containing:
1. An organized list of all the questions.
2. Detailed, accurate, and step-by-step answers for each question.
Format the entire output in clean, readable Markdown.`;
    } else {
        prompt = `Analyze this video or document and extract highly detailed notes.
Organize the notes into:
1. A high-level summary.
2. Detailed key concepts discussed (with approximate timestamps or sections if available).
3. A list of action items, terms, or difficult topics explained.
Format the entire output in clean, readable Markdown.`;
    }

    console.log("Generating Notes using Gemini...");

    const response = await ai.models.generateContent({
        model: modelname,
        contents: [
            {
                role: "user",
                parts: [
                    {
                        fileData: {
                            fileUri: file.uri,
                            mimeType: mimetype,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            }
        ],
    });

    return response.text;
}

module.exports = {
    uploadAndProcessFile,
    generateNotesFromFile,
};