// speechSynth.js

const synth = window.speechSynthesis;
let voices;

window.addEventListener('DOMContentLoaded', init);

function init() {
  document.body.style.backgroundColor = '#4DA8DA';
  setTimeout(() => populateVoices(), 50);
  bindListeners();
}

function populateVoices() {
  const voiceSelect = document.querySelector('#voice-select');
  voices = synth.getVoices();
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.innerHTML = `${voice.name} (${voice.lang})`;
    option.setAttribute('value', `${voice.name} (${voice.lang})`);
    option.setAttribute('data-index', voiceSelect.children.length - 1)
    voiceSelect.appendChild(option);
  });
}

function bindListeners() {
  const talkBtn = document.querySelector('#explore > button');
  const textarea = document.querySelector('#explore > textarea');

  talkBtn.addEventListener('click', () => {
    let textToSpeak = textarea.value;
    let utterThis = new SpeechSynthesisUtterance(textToSpeak);
    utterThis.voice = voices[getOptionIndex()];
    synth.speak(utterThis);
    openMouth();
  })
}

function getOptionIndex() {
  const voiceSelect = document.querySelector('#voice-select');
  const option = voiceSelect.options[voiceSelect.selectedIndex];
  return option.getAttribute('data-index');
}

function openMouth() {
  let face = document.querySelector('#explore > img');

  face.setAttribute('src', 'assets/images/smiling-open.png');
  // document.body.style.backgroundColor = '#80D8C3';

  const interval = setInterval(() => {
    if (!synth.speaking) {
      face.setAttribute('src', 'assets/images/smiling.png');
      // document.body.style.backgroundColor = '#4DA8DA'; // reset color
      clearInterval(interval);
    }
  }, 100);
  // setTimeout(() => {
  //   if (synth.speaking) {
  //     openMouth();
  //   } else {
  //     document.body.style.backgroundColor = '#4DA8DA';
  //     face.setAttribute('src', 'assets/images/smiling.png');
  //   }
  // }, 100);
}
