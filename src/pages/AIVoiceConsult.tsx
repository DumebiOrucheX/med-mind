import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mic, MicOff, Volume2, VolumeX, ArrowLeft, Shield, Lock, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/Navigation";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

const AIVoiceConsult = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI medical assistant. Please describe your symptoms or health concerns. Remember, this is for informational purposes only and doesn't replace professional medical advice.",
      timestamp: new Date()
    }
  ]);
  const [currentTranscription, setCurrentTranscription] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      setIsRecording(true);
      
      toast({
        title: "Recording started",
        description: "Speak clearly about your symptoms or concerns",
      });
    } catch (error) {
      toast({
        title: "Microphone access required",
        description: "Please allow microphone access to use voice consultation",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Simulate transcription and AI response
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: "I've been experiencing headaches for the past few days, especially in the morning.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Simulate AI response after delay
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: "I understand you're experiencing morning headaches. This could be related to several factors like dehydration, sleep patterns, or stress. Can you tell me more about your sleep schedule and if you've noticed any triggers?",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 2000);
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      toast({
        title: "Playing AI response",
        description: "Audio playback started"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"> 
         <Navigation />
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Privacy Notice */}
        <Card className="mb-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  Medical Disclaimer & Privacy
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  This AI consultation is for informational purposes only. Always consult healthcare professionals for medical advice. 
                  Your conversation is encrypted and HIPAA-compliant.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Messages */}
          <div className="lg:col-span-2">
            <Card className="h-[500px] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Conversation</CardTitle>
                <CardDescription>
                  Speak naturally about your symptoms or health concerns
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-3 ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {currentTranscription && (
                    <div className="flex justify-end">
                      <div className="max-w-[80%] rounded-lg px-4 py-3 bg-primary/50 text-primary-foreground">
                        <p className="text-sm italic">{currentTranscription}</p>
                        <Badge variant="secondary" className="mt-2 text-xs">
                          Transcribing...
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
                
                <Separator className="mb-4" />
                
                {/* Voice Controls */}
                <div className="flex items-center justify-center gap-4">
                  <Button
                    size="lg"
                    variant={isRecording ? "destructive" : "default"}
                    className={`h-16 w-16 rounded-full ${
                      isRecording ? 'animate-pulse' : ''
                    }`}
                    onClick={isRecording ? stopRecording : startRecording}
                    aria-label={isRecording ? "Stop recording" : "Start recording"}
                  >
                    {isRecording ? (
                      <MicOff className="h-6 w-6" />
                    ) : (
                      <Mic className="h-6 w-6" />
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 w-12 rounded-full"
                    onClick={togglePlayback}
                    disabled={messages.length === 0}
                    aria-label={isPlaying ? "Stop playback" : "Play last response"}
                  >
                    {isPlaying ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                
                <p className="text-center text-xs text-muted-foreground mt-3">
                  {isRecording ? 'Listening... Tap to stop' : 'Tap microphone to start speaking'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Session Info & Quick Actions */}
          <div className="space-y-6">
            {/* Session Status */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Session Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Duration</span>
                  <span className="text-sm font-medium">5:24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Messages</span>
                  <span className="text-sm font-medium">{messages.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start text-left">
                  Request Medical Summary
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-left">
                  Find Nearby Doctors
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-left">
                  Schedule Follow-up
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-left">
                  Download Transcript
                </Button>
              </CardContent>
            </Card>

            {/* Safety Reminders */}
            <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-red-800 dark:text-red-200">
                  Emergency Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-red-700 dark:text-red-300 mb-3">
                  If you're experiencing a medical emergency, please:
                </p>
                <div className="space-y-2">
                  <Button variant="destructive" size="sm" className="w-full">
                    Call 911
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Find ER Near Me
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIVoiceConsult;