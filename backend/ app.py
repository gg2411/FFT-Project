# app.py
"""
Flask Backend Application for Audio Processing
Author: Gilad, Yaniv, Bar
Date: 2024-11-21
Description:
This Flask application receives audio data from the frontend,
processes it using FFT, and returns the time-domain and frequency-domain data.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import scipy.io.wavfile as wavfile
import io
import base64

app = Flask(__name__)
CORS(app)

@app.route('/process_audio', methods=['POST'])
def process_audio():
    if 'audio_data' not in request.files:
        return jsonify({'error': 'No audio_data field in request'}), 400

    audio_file = request.files['audio_data']
    audio_bytes = audio_file.read()

    # Read WAV file from bytes
    rate, data = wavfile.read(io.BytesIO(audio_bytes))

    # Convert data to float32
    data = data.astype(np.float32)

    # Handle stereo audio
    if len(data.shape) > 1:
        data = np.mean(data, axis=1)

    # Perform FFT
    fft_result = np.fft.fft(data)
    fft_magnitude = np.abs(fft_result)[:len(fft_result)//2]  # One-sided spectrum

    # Prepare data for JSON serialization
    time_domain = data.tolist()
    frequency_domain = fft_magnitude.tolist()

    return jsonify({
        'time_domain': time_domain,
        'frequency_domain': frequency_domain
    })

if __name__ == '__main__':
    app.run(debug=True)
