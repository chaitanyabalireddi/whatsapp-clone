import React, { useState, useRef } from 'react';
import { FaMicrophone, FaStop, FaPlay, FaPause, FaTimes } from 'react-icons/fa';
import './VoiceRecorder.css';

const VoiceRecorder = ({ onSendVoice, onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        setAudioBlob(audioBlob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please allow microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSend = async () => {
    if (audioBlob) {
      // Convert blob to base64 for sending
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = () => {
        const base64Audio = reader.result;
        onSendVoice(base64Audio, recordingTime);
        onClose();
      };
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="voice-recorder-overlay">
      <div className="voice-recorder-modal">
        <div className="voice-recorder-header">
          <h3>🎤 Voice Message</h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="voice-recorder-content">
          {!audioURL ? (
            // Recording view
            <div className="recording-view">
              <div className={`mic-animation ${isRecording ? 'recording' : ''}`}>
                <FaMicrophone size={60} />
              </div>
              
              <div className="recording-time">
                {formatTime(recordingTime)}
              </div>

              {isRecording ? (
                <div className="recording-indicator">
                  <span className="pulse"></span>
                  Recording...
                </div>
              ) : (
                <p className="instruction">Press and hold to record</p>
              )}

              <div className="recording-controls">
                {!isRecording ? (
                  <button 
                    className="record-button"
                    onMouseDown={startRecording}
                    onTouchStart={startRecording}
                  >
                    <FaMicrophone /> Start Recording
                  </button>
                ) : (
                  <button 
                    className="stop-button"
                    onClick={stopRecording}
                  >
                    <FaStop /> Stop Recording
                  </button>
                )}
              </div>
            </div>
          ) : (
            // Preview view
            <div className="preview-view">
              <div className="audio-preview">
                <FaMicrophone size={40} className="audio-icon" />
                <div className="audio-info">
                  <span className="audio-duration">{formatTime(recordingTime)}</span>
                  <span className="audio-label">Voice Message</span>
                </div>
              </div>

              <audio
                ref={audioRef}
                src={audioURL}
                onEnded={() => setIsPlaying(false)}
                style={{ display: 'none' }}
              />

              <div className="preview-controls">
                {!isPlaying ? (
                  <button className="play-button" onClick={playAudio}>
                    <FaPlay /> Play
                  </button>
                ) : (
                  <button className="pause-button" onClick={pauseAudio}>
                    <FaPause /> Pause
                  </button>
                )}

                <button className="record-again-button" onClick={() => {
                  setAudioURL(null);
                  setAudioBlob(null);
                  setRecordingTime(0);
                  setIsPlaying(false);
                }}>
                  Record Again
                </button>
              </div>

              <button className="send-voice-button" onClick={handleSend}>
                Send Voice Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceRecorder;

