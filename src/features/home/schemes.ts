import z from "zod";

export const upload_video_schema = z.object({
    video: z.union([
        z.instanceof(File),
        z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional()
});