import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { upload_video_schema } from "../schemes";
import { createSessionClientWithCookie } from "@/lib/appwrite";
import { APPWRITER_ENDPOINT, BUCKET_ID, PROJECT_ID } from "@/lib/config";
import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { getCookie } from "hono/cookie";
import { AUTH_COOKIE } from "@/lib/constants";

const app = new Hono()
    .post("/upload-video", zValidator("form", upload_video_schema), async(c) => {
        try {
            const { video } = c.req.valid("form");

            // Get session cookie from Hono context
            const sessionCookie = getCookie(c, AUTH_COOKIE);
            if (!sessionCookie) {
                return c.json({ success: false, error: "Unauthorized" }, 401);
            }

            let uploadedVideoUrl: string | undefined;

            if (video && video instanceof File) {
                const { storage } = createSessionClientWithCookie(sessionCookie);

                // Convert File to buffer for node-appwrite
                const buffer = Buffer.from(await video.arrayBuffer());
                const inputFile = InputFile.fromBuffer(buffer, video.name);

                // Upload the video to Appwrite Storage
                const uploadedFile = await storage.createFile(
                    BUCKET_ID, 
                    ID.unique(), 
                    inputFile
                );

                // Get the URL of the uploaded video
                uploadedVideoUrl = `${APPWRITER_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${PROJECT_ID}`;

                return c.json({ 
                    success: true, 
                    fileId: uploadedFile.$id,
                    url: uploadedVideoUrl 
                });
            }

            return c.json({ success: false, error: "No video provided" }, 400);
        } catch (error) {
            console.error("Upload error:", error);
            return c.json({ 
                success: false, 
                error: error instanceof Error ? error.message : "Upload failed" 
            }, 500);
        }
    })

export default app;