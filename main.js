
const noans = ["i dont understand what you mean", "i dont understand, what you want to tell me?", "i dont understand what you said!", "can you please say clearly, what you want to tell me", "what"];
const search = document.getElementById('search');
const btn = document.querySelector('.talk');
const content = document.querySelector('.content');


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
//speech synthesis function
function playText(text) {

  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}


// vocie hearing on
recognition.onstart = function() {
   console.log('voice is activated, you can to  miceophone');
};

// from voice result
recognition.onresult = function (event) {
   const current = event.resultIndex;
   const transcript = event.results[current][0].transcript;
   const lower = transcript.toLowerCase();
   content.textContent = lower;
   //const checkcall =  lower.split(" ",1);
   // if (checkcall == "sara") {
      // const replacesara = lower.replace("what", '');
      // console.log(replacesara);
      api(lower);
   // }
};

// onclick recognization start
btn.addEventListener('click', function () {
   recognition.start();
 });

async function api(transcript) {
  const jsondata = await fetch("qna.json");

  const jsdata = await jsondata.json();
  if (transcript != '') {
    switch (transcript) {
      case jsdata[0].question:
        console.log('pros..');
          playText(jsdata[0].ans);
          break;
          case jsdata[1].question:
            console.log('pros..');
              playText(jsdata[1].ans);
              break;
              case jsdata[2].question:
            console.log('pros..');
              playText(jsdata[2].ans);
              break;
              case jsdata[3].question:
               console.log('pros..');
                 playText(jsdata[3].ans);
                 setTimeout(() => {
                  window.open(jsdata[3].link, "_newtab");
               }, 2000);
                 break;
              
    
      default:
        playText(noans[Math.floor(Math.random() * noans.length)]);
          break;
    }
  }
}


