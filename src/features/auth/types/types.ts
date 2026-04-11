import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono";

// Type definitions for authentication-related API requests and responses. These types are inferred from the API routes defined in the server router, ensuring type safety when making API calls from the client side. Each type corresponds to a specific authentication action: sign-in, sign-up, and log-out.

// The SignInResponseType and SignInRequestType types define the expected structure of the request and response for the user sign-in process. The request type includes fields for the user's email and password, while the response type can be defined based on the actual response returned by the API.
export type SignInResponseType = InferResponseType<(typeof client.api.auth["sign-in"])["$post"]>;
export type SignInRequestType = InferRequestType<(typeof client.api.auth["sign-in"])["$post"]>;

// The SignUpResponseType and SignUpRequestType types define the expected structure of the request and response for the user registration process. The request type includes fields for the user's name, email, and password, while the response type can be defined based on the actual response returned by the API.
export type SignUpResponseType = InferResponseType<(typeof client.api.auth["sign-up"])["$post"]>;
export type SignUpRequestType = InferRequestType<(typeof client.api.auth["sign-up"])["$post"]>;

// The LogOutResponseType and LogOutRequestType types define the expected structure of the request and response for the user log-out process. The request type may not require any fields, while the response type can be defined based on the actual response returned by the API.
export type LogOutResponseType = InferResponseType<(typeof client.api.auth["log-out"])["$post"]>;
export type LogOutRequestType = InferRequestType<(typeof client.api.auth["log-out"])["$post"]>;


// The VerifyEmailResponseType and VerifyEmailRequestType types define the expected structure of the request and response for the email verification process. The request type includes a field for the user's email address, while the response type can be defined based on the actual response returned by the API.
export type VerifyEmailResponseType = InferResponseType<(typeof client.api.auth["verify-email"])["$post"]>;
export type VerifyEmailRequestType = InferRequestType<(typeof client.api.auth["verify-email"])["$post"]>;

// The VerifyOtpResponseType and VerifyOtpRequestType types define the expected structure of the request and response for the OTP verification process. The request type includes fields for the user ID and the OTP code, while the response type can be defined based on the actual response returned by the API.
export type VerifyOtpResponseType = InferResponseType<(typeof client.api.auth["verify-otp"])["$post"]>;
export type VerifyOtpRequestType = InferRequestType<(typeof client.api.auth["verify-otp"])["$post"]>;

// The ResetPasswordResponseType and ResetPasswordRequestType types define the expected structure of the request and response for the password reset process. The request type may include fields such as the user's email address, while the response type can be defined based on the actual response returned by the API.
export type ResetPasswordRequestType = InferRequestType<(typeof client.api.auth["reset-password"])["$post"]>;
export type ResetPasswordResponseType = InferResponseType<(typeof client.api.auth["reset-password"])["$post"]>;

export type ResendOtpRequestType = InferRequestType<(typeof client.api.auth["resend-otp"])["$post"]>;
export type ResendOtpResponseType = InferResponseType<(typeof client.api.auth["resend-otp"])["$post"]>;