import openaiClient from "./api.js"

const score = async (judge, category, auto_pitch, pitch, tweet) => {
    console.log("tweet2", tweet)

    const response = await openaiClient.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `Pretend that you are ${judge} and you are deciding between two startups to invest in` },
            { role: "system", content: `The pitches from both startups will be in the ${category} space`,},
            { role: "system", content: `The first pitch is this: ${auto_pitch}. The second pitch is this: ${pitch} . Here is your response: ${tweet}. Based on this pre-written response, if you decided to invest in the first pitch, only print the number 1. If you decided to invest in the second pitch, only print the number 2. Don't print any other text, just the number indicating your choice.`,}
        ]
    })
    return response.choices[0].message.content
}

export default score