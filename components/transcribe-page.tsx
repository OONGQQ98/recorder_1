'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, StopCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useDeepgram, LiveTranscriptionEvents, type LiveTranscriptionEvent } from '@/contexts/DeepgramContext';

export function TranscribePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const { connection, connectToDeepgram, disconnectFromDeepgram } = useDeepgram();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      await connectToDeepgram({
        language: 'en',
        smart_format: true,
        model: 'nova',
      });

      if (connection) {
        connection.addListener(LiveTranscriptionEvents.Transcript, (transcription: LiveTranscriptionEvent) => {
          const transcript = transcription.channel.alternatives[0].transcript;
          if (transcript) {
            setTranscript((prev) => prev + ' ' + transcript);
          }
        });

        mediaRecorderRef.current.addEventListener('dataavailable', async (event) => {
          if (event.data.size > 0 && connection) {
            connection.send(event.data);
          }
        });

        mediaRecorderRef.current.start(250);
        setIsRecording(true);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    disconnectFromDeepgram();
    setIsRecording(false);
  };

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        stopRecording();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center text-gray-600 hover:text-orange-500">
              <ArrowLeft className="mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 px-4">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Start Recording</h1>
            <p className="text-gray-600">Click the button below to begin transcribing</p>
          </div>

          <div className="flex justify-center mb-8">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-16 h-16 rounded-full ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                  } transition-all transform hover:scale-105`}
                >
                  {isRecording ? (
                    <StopCircle className="w-8 h-8 text-white" />
                  ) : (
                    <Mic className="w-8 h-8 text-white" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click me to start recording</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Transcript</h2>
            <div className="min-h-[200px] max-h-[400px] overflow-y-auto bg-gray-50 rounded-lg p-4">
              {transcript || 'Your transcript will appear here...'}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}