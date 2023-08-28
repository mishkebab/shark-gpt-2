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
    let elon_score;
    let beyonce_score;
    let warren_score;
    let mark_score;
    let serena_score;
    
    const generateResponse = async(judge) => {
      console.log(judge)
      const response = await fetch("http://localhost:3005/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ auto_pitch: auto_pitch, category: category, pitch: pitch, judge: judge})
      });

      const data = await response.json()
      return data.response
    };

    const generateScore = async(judge, tweet) => {
      console.log(judge)
      const response = await fetch("http://localhost:3005/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ auto_pitch: auto_pitch, category: category, pitch: pitch, judge: judge, tweet: tweet})
      });

      const data = await response.json()
      return data.response
    };

    const allJudgeResponses = async() => {
      elon = await generateResponse("Elon Musk");
      console.log(elon)
      beyonce = await generateResponse("Beyonce");
      warren = await generateResponse("Warren Buffett");
      mark = await generateResponse("Mark Cuban");
      serena = await generateResponse("Serena Williams");

      elon_score = await generateScore("Elon Musk", elon) 
      console.log(elon_score)
      beyonce_score = await generateScore("Beyonce", beyonce)  
      warren_score = await generateScore("Warren Buffett", warren)  
      mark_score = await generateScore("Mark Cuban", mark)
      serena_score = await generateScore("Serena Williams", serena)
    }

    allJudgeResponses()
      .then(() => {
            for (let i = 0; i < elements.length; i++) {
              const element = elements[i];
              element.style.display = "none"
            }
            musicPlayer.remove();
        renderScreen4(elon, elon_score, beyonce, beyonce_score, warren, warren_score, mark, mark_score, serena, serena_score, pitch)
    })
  
  }