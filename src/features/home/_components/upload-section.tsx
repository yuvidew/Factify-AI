"use client";

import { useState, useRef, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Upload,
    Link,
    Shield,
    Zap,
    Layers,
    FileText,
    Globe,
    ScanLineIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";

type AnalysisType = "deepfake" | "metadata" | "frame";

export const UploadSection = () => {
    const [activeTab, setActiveTab] = useState("upload");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [videoUrl, setVideoUrl] = useState("");
    const [analysisType, setAnalysisType] = useState<AnalysisType>("deepfake");
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith("video/")) {
                setSelectedFile(file);
            }
        }
    }, []);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };

    const handleAnalyze = () => {
        if (activeTab === "upload" && selectedFile) {
            console.log("Analyzing file:", selectedFile.name, "Type:", analysisType);
        } else if (activeTab === "url" && videoUrl) {
            console.log("Analyzing URL:", videoUrl, "Type:", analysisType);
        }
    };

    const analysisOptions = [
        { id: "deepfake", label: "Deepfake Detection" },
        { id: "metadata", label: "Metadata Analysis" },
        { id: "frame", label: "Frame Analysis" },
    ];

    const features = [
        { icon: Zap, label: "Real-time processing", color: "text-yellow-500" },
        { icon: Layers, label: "Multi-model ensemble", color: "text-pink-500" },
        { icon: FileText, label: "Detailed reports", color: "text-pink-400" },
        { icon: Globe, label: "40+ languages", color: "text-primary" },
    ];

    return (
        <section className="w-full max-w-3xl mx-auto mt-12 px-4">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-xl">
                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 h-14! mb-6 bg-background/50">
                        <TabsTrigger
                            value="upload"
                            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                            <Upload className="w-4 h-4" />
                            Upload File
                        </TabsTrigger>
                        <TabsTrigger
                            value="url"
                            className="flex items-center gap-2 data-[state=active]:bg-transparent"
                        >
                            <Link className="w-4 h-4" />
                            Paste URL
                        </TabsTrigger>
                    </TabsList>

                    {/* Upload Tab Content */}
                    <TabsContent value="upload" className="mt-0">
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`
                                border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
                                ${isDragging
                                    ? "border-primary bg-primary/10"
                                    : "border-border/50 hover:border-primary/50 hover:bg-primary/5"
                                }
                                ${selectedFile ? "border-green-500 bg-green-500/10" : ""}
                            `}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="video/mp4,video/mov,video/avi,video/webm"
                                onChange={handleFileSelect}
                                className="hidden"
                            />

                            <div className="flex flex-col items-center gap-4">
                                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                                    <Upload className="w-7 h-7 text-primary" />
                                </div>

                                {selectedFile ? (
                                    <>
                                        <p className="text-foreground font-medium">
                                            {selectedFile.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-foreground font-medium text-lg">
                                            Drop your video here
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Supports MP4, MOV, AVI, WebM — under 1 hour
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    {/* URL Tab Content */}
                    <TabsContent value="url" className="mt-0">
                        <div className=" rounded-xl ">
                            <div className="flex flex-col  gap-4">
                                <Label
                                    htmlFor="video-url"
                                    className="text-sm text-muted-foreground"
                                >
                                    Enter the URL of the video you want to analyze
                                </Label>
                                <Input
                                    type="url"
                                    placeholder="https://example.com/video.mp4"
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                    className=" bg-background/50 h-12 border-border/50"
                                />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>

                {/* Analysis Options */}
                <div className="flex flex-wrap gap-2 mt-8">
                    {analysisOptions.map((option) => (
                        <Button
                            key={option.id}
                            variant={analysisType === option.id ? "default" : "outline"}
                            size="lg"
                            onClick={() => setAnalysisType(option.id as AnalysisType)}
                            className={`
                                        rounded-full text-sm cursor-pointer
                                        ${analysisType === option.id
                                    ? "bg-primary/5 text-primary border-primary/50 hover:bg-primary/10"
                                    : "bg-transparent border-border/50 hover:border-border"
                                }
                                    `}
                        >
                            <span
                                className={`w-2 h-2 rounded-full mr-2 ${analysisType === option.id
                                        ? "bg-primary"
                                        : "bg-muted-foreground"
                                    }`}
                            />
                            {option.label}
                        </Button>
                    ))}
                </div>

                {/* Analyze Button */}
                <Button
                    onClick={handleAnalyze}
                    disabled={activeTab === "upload" ? !selectedFile : !videoUrl}
                    className="w-full mt-6 py-6   rounded-xl "
                >
                    <ScanLineIcon />
                    Analyze Video
                </Button>

                {/* Security Note */}
                <p className="text-center text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4 text-yellow-500" />
                    Your video is processed securely and never stored.
                </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 px-4 py-2 bg-card/30 border border-border/30 rounded-full text-sm"
                    >
                        <feature.icon className={`w-4 h-4 ${feature.color}`} />
                        <span className="text-muted-foreground">{feature.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};
