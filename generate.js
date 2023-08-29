import openaiClient from "./api.js"

const generate = async (judge, category, auto_pitch, pitch) => {

    const response = await openaiClient.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: `Pretend that you are ${judge} and you are deciding between two startups to invest in` },
            { role: "system", content: `The pitches from both startups will be in the ${category} space`, },
            { role: "system", content: `The first pitch is this: ${auto_pitch} . Please wait for the second pitch and then decide which one you like better`, },
            { role: "system", content: `The second pitch is this: ${pitch} . Now please decide which pitch you liked better and write a summary of your decision as a tweet.`, } 
        ]
    })
    return response.choices[0].message.content
}

export default generate