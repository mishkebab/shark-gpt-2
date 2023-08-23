import { Configuration, OpenAIApi } from 'openai';
import { update } from 'immutable';

export function renderScreen3(pitch, category, renderScreen4) {
    const canvasEl = document.getElementById("game-canvas");
    const ctx = canvasEl.getContext("2d");

    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
    
    // background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1839, 800);
    
    const elements = document.getElementsByClassName("page3")
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      element.style.display = "block"
    }

    let musicPlayer = document.getElementById('musicPlayer');
    let isPlaying = false;
    let playButton = document.getElementById("playButton")

    function togglePlay() {
        isPlaying ? musicPlayer.pause() : musicPlayer.play();
    };
    
    musicPlayer.onplaying = function() {
        isPlaying = true;
    };
    musicPlayer.onpause = function() {
        isPlaying = false;
    };
    
    // let pageMusic = document.addEventListener("mousemove", togglePlay);
    
    playButton.addEventListener("click", togglePlay)

    // text
    const submittedPitch = document.getElementById("submitted-pitch")
    submittedPitch.placeholder = pitch;
    
    let auto_pitch;
  
    if (category === "consumer") {
      auto_pitch = "sustainable footwear made from premium natural materials, designed for everyday wear";
    } else {
      auto_pitch = "payment processing platform";
    }

    let elon;
    let beyonce;
    let warren;
    let mark;
    let serena;

    const generateText = async() => {
      const apiKeyResponse = await fetch("/api");
      const apiKeyData = await apiKeyResponse.json();
      const configuration = new Configuration({
        apiKey: apiKeyData.apiKey
      })
      delete configuration.baseOptions.headers['User-Agent'];
      const openai = new OpenAIApi(configuration)
      
      let GPT_response = async (judge) => {
        console.log(judge)
        const GPT35TurboMessage = [
          { role: "system", content: `Pretend that you are ${judge} and you are deciding between two startups to invest in` },
          {
            role: "system",
            content: `The pitches from both startups will be in the ${category} space`,
          },
          {
            role: "system",
            content: `The first pitch is this: ${auto_pitch} . Please wait for the second pitch and then decide which one you like better`,
          },
          {
            role: "system",
            content: `The second pitch is this: ${pitch} . Now please decide which pitch you liked better and write a summary of your decision as a tweet.`,
          }];
    
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: GPT35TurboMessage,
        });
        const gpt_response = response.data.choices[0].message.content;
        return gpt_response;
      };

      elon = await GPT_response("Elon Musk");
      beyonce = await GPT_response("Beyonce");
      warren = await GPT_response("Warren Buffett");
      mark = await GPT_response("Mark Cuban")
      serena = await GPT_response("Serena Williams")

    }

    let elon_score;
    let beyonce_score;
    let warren_score;
    let mark_score;
    let serena_score;

    const generateScores = async() => {

      let GPT_score = async (judge, tweet) => {
        const GPT35TurboMessage = [
          { role: "system", content: `Pretend that you are ${judge} and you are deciding between two startups to invest in` },
          {
            role: "system",
            content: `The pitches from both startups will be in the ${category} space`,
          },
          {
            role: "system",
            content: `The first pitch is this: ${auto_pitch}. The second pitch is this: ${pitch} . Here is your response: ${tweet}. Based on this pre-written response, if you decided to invest in the first pitch, only print the number 1. If you decided to invest in the second pitch, only print the number 2. Don't print any other text, just the number indicating your choice.`,
          }];
    
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: GPT35TurboMessage,
        });

        const gpt_response = response.data.choices[0].message.content;
        return gpt_response;
      }

      elon_score = await GPT_score("Elon Musk", elon) 
      beyonce_score = await GPT_score("Beyonce", beyonce)  
      warren_score = await GPT_score("Warren Buffett", warren)  
      mark_score = await GPT_score("Mark Cuban", mark)
      serena_score = await GPT_score("Serena Williams", serena)
    };
  

    // async function allFiveJudges() {
    //   elon = await GPT_response("Elon Musk");
    //   elon_score = await GPT_score("Elon Musk", elon) 
    //   beyonce = await GPT_response("Beyonce");
    //   beyonce_score = await GPT_score("Beyonce", beyonce)  
    //   warren = await GPT_response("Warren Buffett");
    //   warren_score = await GPT_score("Warren Buffett", warren)  
    //   mark = await GPT_response("Mark Cuban")
    //   mark_score = await GPT_score("Mark Cuban", mark)
    //   serena = await GPT_response("Serena Williams")
    //   serena_score = await GPT_score("Serena Williams", serena)
    // }  

    generateText()

    generateScores()
      .then(() => {
            for (let i = 0; i < elements.length; i++) {
              const element = elements[i];
              element.style.display = "none"
            }
            musicPlayer.remove();
        renderScreen4(elon, elon_score, beyonce, beyonce_score, warren, warren_score, mark, mark_score, serena, serena_score, pitch)
    })
  
  }