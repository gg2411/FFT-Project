// AudioRecorder.js
/**
 * AudioRecorder Component
 * Handles audio recording and interaction with the backend
 */
import React, { useState, useRef } from 'react';
import axios from 'axios';
import TimeDomainChart from './TimeDomainChart';
import FrequencyDomainChart from './FrequencyDomainChart';

function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [timeDomainData, setTimeDomainData] = useState(null);
  const [frequencyDomainData, setFrequencyDomainData] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        audioChunksRef.current = [];
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setIsRecording(true);

        mediaRecorder.ondataavailable = e => {
          audioChunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          processAudio(audioBlob);
        };
      })
      .catch(error => {
        console.error('Error accessing microphone', error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processAudio = (audioBlob) => {
    const formData = new FormData();
    formData.append('audio_data', audioBlob, 'recording.wav');

    axios.post('https://your-backend-url.com/process_audio', formData)
      .then(response => {
        setTimeDomainData(response.data.time_domain);
        setFrequencyDomainData(response.data.frequency_domain);
      })
      .catch(error => {
        console.error('Error processing audio', error);
      });
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>

      {timeDomainData && (
        <div>
          <h2>Time Domain Signal</h2>
          <TimeDomainChart data={timeDomainData} />
        </div>
      )}

      {frequencyDomainData && (
        <div>
          <h2>Frequency Domain Signal</h2>
          <FrequencyDomainChart data={frequencyDomainData} />
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
