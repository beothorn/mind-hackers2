import axios from 'axios';

const openAiUrl = 'https://api.openai.com/v1';
export const openAiModel = 'gpt-5.4-mini';

type ResponseContent = {
    type?: string,
    text?: string,
};

type ResponseOutput = {
    content?: ResponseContent[],
};

type OpenAiResponse = {
    output_text?: string,
    output?: ResponseOutput[],
};

const extractResponseText = (response: OpenAiResponse): string => {
    if (response.output_text) {
        return response.output_text.trim();
    }

    return response.output
        ?.flatMap(output => output.content ?? [])
        .map(content => content.text ?? '')
        .join('')
        .trim() ?? '';
};

const buildTextResponseRequest = (input: string, maxOutputTokens: number) => ({
    model: openAiModel,
    input,
    max_output_tokens: maxOutputTokens,
    reasoning: { effort: 'low' },
    text: { verbosity: 'low' },
});

const requestTextResponse = (openAiKey: string, input: string, maxOutputTokens: number) => axios.post<OpenAiResponse>(
    `${openAiUrl}/responses`,
    buildTextResponseRequest(input, maxOutputTokens),
    {
        headers: {
            'Authorization': `Bearer ${openAiKey}`,
            'Content-Type': 'application/json'
        }
    }
).then((result) => {
    const text = extractResponseText(result.data);
    console.log({query: input, text, model: openAiModel});
    return text;
});

const getCompletionWithSize = (openAiKey: string, query: string, size: number) => requestTextResponse(openAiKey, query, size);

export const getSmallCompletion = (openAiKey: string, query: string) => getCompletionWithSize(openAiKey, query, 30);

export const getCompletion = (openAiKey: string, query: string) => getCompletionWithSize(openAiKey, query, 256);

const buildQuestionPrompt = (situation: string, question: string) => `===
${situation}
===
From this scene:
${question}(yes or no)
`;

export const answerQuestion = (openAiKey: string, situation: string, question: string) => {
    const query = buildQuestionPrompt(situation, question);

    return requestTextResponse(openAiKey, query, 3).then((text) => text.toLocaleLowerCase().includes('yes'));
};

export const checkOpenAiModel = (openAiKey: string) => axios.get(`${openAiUrl}/models/${openAiModel}`, {
    headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json'
    }
});
