import React, { useState } from 'react';
import { FaMicrophone, FaCheck, FaTimes } from 'react-icons/fa';
import './MicrophoneTest.css';

const MicrophoneTest = ({ onClose }) => {
  const [status, setStatus] = useState('idle'); // idle, testing, success, error
  const [error, setError] = useState('');

  const testMicrophone = async () => {
    setStatus('testing');
    setError('');

    try {
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true,
        video: false 
      });
      
      // If we get here, permission was granted
      setStatus('success');
      
      // Stop the stream immediately
      stream.getTracks().forEach(track => track.stop());
      
      // Close after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (err) {
      console.error('Microphone error:', err);
      setStatus('error');
      
      if (err.name === 'NotAllowedError') {
        setError('Microphone permission denied. Please allow microphone access in your browser settings.');
      } else if (err.name === 'NotFoundError') {
        setError('No microphone found. Please connect a microphone.');
      } else {
        setError('Microphone error: ' + err.message);
      }
    }
  };

  return (
    <div className="microphone-test-overlay">
      <div className="microphone-test-modal">
        <div className="microphone-test-header">
          <h3>🎤 Microphone Permission Test</h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="microphone-test-content">
          {status === 'idle' && (
            <div className="test-idle">
              <FaMicrophone size={60} className="mic-icon" />
              <h4>Test Microphone Access</h4>
              <p>Click the button below to test if your microphone is accessible.</p>
              <button className="test-button" onClick={testMicrophone}>
                <FaMicrophone /> Test Microphone
              </button>
            </div>
          )}

          {status === 'testing' && (
            <div className="test-testing">
              <div className="spinner"></div>
              <h4>Testing Microphone...</h4>
              <p>Please allow microphone access when prompted by your browser.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="test-success">
              <FaCheck size={60} className="success-icon" />
              <h4>✅ Microphone Access Granted!</h4>
              <p>Your microphone is working. You can now use voice messages!</p>
            </div>
          )}

          {status === 'error' && (
            <div className="test-error">
              <FaTimes size={60} className="error-icon" />
              <h4>❌ Microphone Access Denied</h4>
              <p className="error-message">{error}</p>
              <div className="error-solutions">
                <h5>Solutions:</h5>
                <ol>
                  <li>Click the lock/info icon in your address bar</li>
                  <li>Change microphone from "Block" to "Allow"</li>
                  <li>Refresh the page</li>
                  <li>Try again</li>
                </ol>
              </div>
              <button className="retry-button" onClick={() => setStatus('idle')}>
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MicrophoneTest;
