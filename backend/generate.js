import openaiClient from "./api.js"

const generate = async (queryDescription) => {
    const response = await openaiClient.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `What do you associate with these words: ${queryDescription}.`}],
    })
    return response.choices[0].message.content
}

export default generate