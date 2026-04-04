import React, { useState } from "react";
import { toast } from "sonner";
import { Mic, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type VoiceState = "idle" | "listening" | "processing" | "success" | "error";

interface VoiceSearchButtonProps {
  onTranscript: (text: string) => void;
}

const VoiceSearchButton: React.FC<VoiceSearchButtonProps> = ({ onTranscript }) => {
  const [state, setState] = useState<VoiceState>("idle");
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error("Voice search is not supported in your browser");
      return;
    }

    const apiKey = localStorage.getItem("openai_api_key");
    if (!apiKey) {
      toast.error("Please set your OpenAI API key in settings (click the mic and hold)");
      const key = prompt("Enter your OpenAI API key for voice search:");
      if (key) {
        localStorage.setItem("openai_api_key", key);
        toast.success("API key saved! Try voice search again.");
      }
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        setState("processing");

        const blob = new Blob(chunks, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("file", blob, "audio.webm");
        formData.append("model", "whisper-1");
        formData.append("response_format", "text");

        try {
          const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}` },
            body: formData,
          });

          if (!res.ok) throw new Error("API error");

          const text = await res.text();
          if (!text.trim()) {
            toast.error("Couldn't hear anything. Please try again");
            setState("idle");
            return;
          }

          setState("success");
          onTranscript(text.trim());
          setTimeout(() => setState("idle"), 1500);
        } catch {
          toast.error("Voice search failed. Please try again or type your search");
          setState("error");
          setTimeout(() => setState("idle"), 1500);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setState("listening");

      setTimeout(() => {
        if (recorder.state === "recording") recorder.stop();
      }, 5000);
    } catch {
      toast.error("Please allow microphone access to use voice search");
      setState("idle");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder?.state === "recording") {
      mediaRecorder.stop();
    }
  };

  const handleClick = () => {
    if (state === "listening") {
      stopRecording();
    } else if (state === "idle") {
      startRecording();
    }
  };

  return (
    <div className="relative flex items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClick}
        className={cn(
          "relative h-11 w-11 rounded-full border border-border/70 bg-white/75 transition-all shadow-sm",
          state === "listening" && "text-red-500",
          state === "processing" && "text-muted-foreground",
          state === "success" && "text-green-500",
          state === "error" && "animate-shake text-destructive"
        )}
      >
        {state === "listening" && (
          <span className="absolute inset-0 rounded-full border-2 border-red-500 animate-pulse-ring" />
        )}
        {state === "processing" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : state === "success" ? (
          <Check className="h-4 w-4" />
        ) : (
          <Mic className="h-4 w-4" />
        )}
      </Button>
      {state === "listening" && (
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-red-500 whitespace-nowrap font-medium">
          Listening...
        </span>
      )}
      {state === "processing" && (
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
          Processing...
        </span>
      )}
    </div>
  );
};

export default VoiceSearchButton;
