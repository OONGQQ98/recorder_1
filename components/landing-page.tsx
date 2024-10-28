'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mic, FastForward, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: <Mic className="w-6 h-6 text-orange-500" />,
    title: 'Easy Recording',
    description: 'Start recording with a single click. Capture your voice clearly and efficiently.',
  },
  {
    icon: <FastForward className="w-6 h-6 text-orange-500" />,
    title: 'Real-time Transcription',
    description: 'Watch your words transform into text instantly as you speak.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-orange-500" />,
    title: 'High Accuracy',
    description: 'Powered by advanced AI for precise and reliable transcriptions.',
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      <header className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-orange-100">
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text">
              Vivo
            </div>
            <Link href="/transcribe">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                Start Recording
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-32 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Recording made easy
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Transform your voice into text instantly with our powerful transcription service
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2">
                      {feature.icon}
                      <span>{feature.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="/transcribe">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                Try It Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}