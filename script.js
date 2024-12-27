const audioPlayer = document.getElementById('audioPlayer');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const statusDiv = document.getElementById('status');

let recognition = null;

// Initialize speech recognition
function initializeSpeechRecognition() {
  // Check for browser support
  if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
  } else if ('SpeechRecognition' in window) {
    recognition = new SpeechRecognition();
  } else {
    alert('Speech recognition is not supported in your browser');
    return;
  }

  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onstart = () => {
    statusDiv.textContent = 'Listening for commands...';
    statusDiv.className = 'status listening';
  };

  recognition.onend = () => {
    statusDiv.textContent = 'Not listening';
    statusDiv.className = 'status not-listening';
  };

  recognition.onresult = (event) => {
    const command = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
    statusDiv.textContent = `Command recognized: ${command}`;

    if (command.includes('play')) {
      audioPlayer.play();
      statusDiv.textContent = 'Playing audio...';
    } else if (command.includes('stop') || command.includes('pause')) {
      audioPlayer.pause();
      statusDiv.textContent = 'Audio paused';
    }
  };

  recognition.onerror = (event) => {
    statusDiv.textContent = 'Error occurred: ' + event.error;
    statusDiv.className = 'status not-listening';
  };
}

// Initialize on page load
initializeSpeechRecognition();

// Button event listeners
startButton.addEventListener('click', () => {
  if (recognition) {
    recognition.start();
  }
});

stopButton.addEventListener('click', () => {
  if (recognition) {
    recognition.stop();
  }
});