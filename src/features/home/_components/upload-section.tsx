"use client";

import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

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
import { Spinner } from "@/components/ui/spinner";
import { useUploadVideo } from "../hook/use-home";

const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/mov", "video/avi", "video/webm"];
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

const uploadFormSchema = z.object({
    activeTab: z.enum(["upload", "url"]),
    video: z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, "File size must be less than 500MB")
        .refine(
            (file) => ACCEPTED_VIDEO_TYPES.includes(file.type),
            "Only MP4, MOV, AVI, WebM formats are supported"
        )
        .optional(),
    videoUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    analysisType: z.enum(["deepfake", "metadata", "frame"]),
}).refine(
    (data) => {
        if (data.activeTab === "upload") return !!data.video;
        if (data.activeTab === "url") return !!data.videoUrl && data.videoUrl !== "";
        return false;
    },
    {
        message: "Please provide a video file or URL",
        path: ["video"],
    }
);

type UploadFormValues = z.infer<typeof uploadFormSchema>;

export const UploadSection = () => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { mutate: uploadVideo, isPending } = useUploadVideo();

    const form = useForm<UploadFormValues>({
        resolver: zodResolver(uploadFormSchema),
        defaultValues: {
            activeTab: "upload",
            video: undefined,
            videoUrl: "",
            analysisType: "deepfake",
        },
    });

    const activeTab = form.watch("activeTab");
    const selectedFile = form.watch("video");

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
                form.setValue("video", file, { shouldValidate: true });
            }
        }
    }, [form]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            form.setValue("video", files[0], { shouldValidate: true });
        }
    };

    const onSubmit = (data: UploadFormValues) => {
        if (data.activeTab === "upload" && data.video) {
            uploadVideo({
                form: {
                    video: data.video,
                },
            });
        } else if (data.activeTab === "url" && data.videoUrl) {
            uploadVideo({
                form: {
                    video: data.videoUrl,
                },
            });
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
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-xl">
                        {/* Tabs */}
                        <Tabs
                            value={activeTab}
                            onValueChange={(value) => form.setValue("activeTab", value as "upload" | "url")}
                            className="w-full"
                        >
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
                                <FormField
                                    control={form.control}
                                    name="video"
                                    render={() => (
                                        <FormItem>
                                            <FormControl>
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
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>

                            {/* URL Tab Content */}
                            <TabsContent value="url" className="mt-0">
                                <FormField
                                    control={form.control}
                                    name="videoUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm text-muted-foreground">
                                                Enter the URL of the video you want to analyze
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="url"
                                                    placeholder="https://example.com/video.mp4"
                                                    className="bg-background/50 h-12 border-border/50"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TabsContent>
                        </Tabs>

                        {/* Analysis Options */}
                        <FormField
                            control={form.control}
                            name="analysisType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="flex flex-wrap gap-2 mt-8">
                                            {analysisOptions.map((option) => (
                                                <Button
                                                    key={option.id}
                                                    type="button"
                                                    variant={field.value === option.id ? "default" : "outline"}
                                                    size="lg"
                                                    onClick={() => field.onChange(option.id)}
                                                    className={`
                                                        rounded-full text-sm cursor-pointer
                                                        ${field.value === option.id
                                                            ? "bg-primary/5 text-primary border-primary/50 hover:bg-primary/10"
                                                            : "bg-transparent border-border/50 hover:border-border"
                                                        }
                                                    `}
                                                >
                                                    <span
                                                        className={`w-2 h-2 rounded-full mr-2 ${field.value === option.id
                                                            ? "bg-primary"
                                                            : "bg-muted-foreground"
                                                        }`}
                                                    />
                                                    {option.label}
                                                </Button>
                                            ))}
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Analyze Button */}
                        <Button
                            type="submit"
                            disabled={isPending || (activeTab === "upload" ? !selectedFile : !form.watch("videoUrl"))}
                            className="w-full mt-6 py-6 rounded-xl"
                        >
                            {isPending ? (
                                <Spinner className="w-5 h-5" />
                            ) : (
                                <ScanLineIcon />
                            )}
                            {isPending ? "Uploading..." : "Analyze Video"}
                        </Button>

                        {/* Security Note */}
                        <p className="text-center text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
                            <Shield className="w-4 h-4 text-yellow-500" />
                            Your video is processed securely and never stored.
                        </p>
                    </div>
                </form>
            </Form>

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
