import { client } from '@/lib/rpc';
import { InferRequestType, InferResponseType } from 'hono';

// Type definitions for the current user API endpoint. These types are inferred from the API route defined in the server router, ensuring type safety when making API calls from the client side. The currentUserResponseType defines the expected structure of the response when fetching the current user's information, while the currentUserRequestType defines the expected structure of the request (if any) for this endpoint.

// User type based on Appwrite user model
export interface User {
    id: string;
    name: string;
    email: string;
    emailVerification: boolean;
    prefs: {
        avatarUrl?: string;
        [key: string]: unknown;
    };
}

export interface CurrentUserResponse {
    user: User | null;
}

// The currentUserResponseType is inferred from the GET request to the "current-user" endpoint, which typically returns the user's information if they are authenticated, or null if they are not. The currentUserRequestType may not require any fields since it's a GET request, but it can be defined based on the actual request structure expected by the API.
export type currentUserResponseType = InferResponseType<(typeof client.api.auth["current-user"])["$get"]>;
export type currentUserRequestType = InferRequestType<(typeof client.api.auth["current-user"])["$get"]>;

