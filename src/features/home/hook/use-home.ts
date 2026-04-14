import { useMutation } from "@tanstack/react-query"
import { uploadRequestType, uploadResponseType } from "../types/types";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

export const useUploadVideo = () => {
    const mutation = useMutation<uploadResponseType, Error, uploadRequestType>({
        mutationFn: async (data) => {
            const response = await client.api.home["upload-video"].$post(data);
            if (!response.ok) {
                throw new Error("Failed to upload video");
            }
            return response.json();
        },
        onSuccess: () => {
            toast.success("Video uploaded successfully!");
        },
        onError: (error) => {
            toast.error(error.message || "An error occurred during video upload.");
        }
    });

    return mutation;
}