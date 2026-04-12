import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono";

// Type definitions for home-related API requests and responses. These types are inferred from the API routes defined in the server router, ensuring type safety when making API calls from the client side. Each type corresponds to a specific action related to the home feature, such as uploading a video.

// The uploadResponseType and uploadRequestType types define the expected structure of the request and response for the video upload process. The request type may include fields such as the video file, while the response type can be defined based on the actual response returned by the API.
export type uploadResponseType = InferResponseType<(typeof client.api.home["upload-video"])["$post"]>;
export type uploadRequestType = InferRequestType<(typeof client.api.home["upload-video"])["$post"]>;