// App.js
/**
 * Main Application Component
 */
import React from 'react';
import AudioRecorder from './components/AudioRecorder';

function App() {
  return (
    <div className="App">
      <h1>Audio FFT Analyzer</h1>
      <AudioRecorder />
    </div>
  );
}

export default App;
