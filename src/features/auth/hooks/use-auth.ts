import { client } from "@/lib/rpc";
import { useMutation, useQueryClient} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    SignInRequestType,
    SignInResponseType,
    SignUpRequestType,
    SignUpResponseType,
    LogOutRequestType,
    LogOutResponseType,
    VerifyEmailResponseType,
    VerifyEmailRequestType,
    VerifyOtpResponseType,
    VerifyOtpRequestType,
    ResetPasswordRequestType,
    ResetPasswordResponseType,
    ResendOtpResponseType,
    ResendOtpRequestType,
} from "../types/types";

// Hooks for authentication actions: sign-in, sign-up, and log-out. Each hook uses React Query's useMutation to handle the respective API calls and manage success/error states. On success, the user is redirected to the appropriate page, and on error, a toast notification is displayed with the error message.

// The useSignIn hook manages the user sign-in process. It sends a POST request to the sign-in endpoint with the user's email and password. If the sign-in is successful, it redirects the user to the home page. If there's an error during sign-in, it shows a toast notification with the error message.
export const useSignIn = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<SignInResponseType, Error, SignInRequestType>({
        mutationFn: async (data) => {
            const response = await client.api.auth["sign-in"].$post(data);
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["current-user"] });
            router.push("/");
        },
        onError: (error) => {
            toast.error(error.message || "An error occurred during sign-in.");
        },
    });

    return mutation;
};

// The useSignUp hook handles user registration. It sends a POST request to the sign-up endpoint with the user's name, email, and password. On successful registration, it redirects the user to the home page. If there's an error during registration, it shows a toast notification with the error message.
export const useSignUp = () => {
    const router = useRouter();

    const mutation = useMutation<SignUpResponseType, Error, SignUpRequestType>({
        mutationFn: async (data) => {
            const response = await client.api.auth["sign-up"].$post(data);
            return response.json();
        },
        onSuccess: () => {
            router.push("/");
        },
        onError: (error) => {
            toast.error(error.message || "An error occurred during sign-up.");
        },
    });

    return mutation;
};

// The useLogOut hook manages the user log-out process. It sends a POST request to the log-out endpoint, and on success, it redirects the user to the sign-in page. If there's an error during log-out, it displays a toast notification with the error message.
export const useLogOut = () => {
    const router = useRouter();

    const mutation = useMutation<LogOutResponseType, Error, LogOutRequestType>({
        mutationFn: async () => {
            const response = await client.api.auth["log-out"].$post();
            return response.json();
        },
        onSuccess: () => {
            router.push("/sign-in");
        },
        onError: (error) => {
            toast.error(error.message || "An error occurred during log-out.");
        },
    });

    return mutation;
};

// The useVerifyEmail hook handles the email verification process. It sends a POST request to the verify-email endpoint with the user's email address. On successful verification, it redirects the user to an OTP page with the user ID as a query parameter. If there's an error during email verification, it shows a toast notification with the error message.
export const useVerifyEmail = () => {
    const router = useRouter();

    const mutation = useMutation<
        VerifyEmailResponseType,
        Error,
        VerifyEmailRequestType
    >({
        mutationFn: async (data) => {
            const response = await client.api.auth["verify-email"].$post(data);
            return response.json();
        },
        onSuccess: (data) => {
            router.push(`/otp?userId=${data.userId}`);
        },
        onError: (error) => {
            toast.error(
                error.message || "An error occurred during email verification.",
            );
        },
    });

    return mutation;
};

// The useVerifyOtp hook manages the OTP verification process. It sends a POST request to the verify-otp endpoint with the user ID and OTP code. On successful verification, it redirects the user to the reset password page. If there's an error during OTP verification, it displays a toast notification with the error message.
export const useVerifyOtp = () => {
    const router = useRouter();
    const mutation = useMutation<
        VerifyOtpResponseType,
        Error,
        VerifyOtpRequestType
    >({
        mutationFn: async (data) => {
            const response = await client.api.auth["verify-otp"].$post(data);
            return response.json();
        },
        onSuccess: () => {
            router.push("/reset-password");
        },
        onError: (error) => {
            toast.error(
                error.message || "An error occurred during OTP verification.",
            );
        },
    });

    return mutation;
};


// The useResetPassword hook handles the password reset process. It sends a POST request to the reset-password endpoint with the new password. On successful password reset, it redirects the user to the sign-in page. If there's an error during password reset, it shows a toast notification with the error message.
export const useResetPassword = () => {
    const router = useRouter();

    const mutation = useMutation<
        ResetPasswordResponseType,
        Error,
        ResetPasswordRequestType
    >({
        mutationFn: async (data) => {
            const response = await client.api.auth["reset-password"].$post(data);
            return response.json();
        },
        onSuccess: () => {
            router.push("/sign-in");
        },
        onError: (error) => {
            toast.error(error.message || "An error occurred during password reset.");
        },
    });

    return mutation;
};

// The useResendOtp hook manages the OTP resend process. It sends a POST request to the resend-otp endpoint with the user ID. On successful OTP resend, it shows a toast notification indicating that the OTP has been resent. If there's an error during OTP resend, it displays a toast notification with the error message.
export const useResendOtp = () => {
    const mutation = useMutation< ResendOtpResponseType, Error, ResendOtpRequestType >({
        mutationFn: async (data) => {
            const response = await client.api.auth["resend-otp"].$post(data);
            return response.json();
        },
        onSuccess: () => {
            toast.success("OTP resent successfully. Please check your email.");
        },
        onError: (error) => {
            toast.error(error.message || "An error occurred while resending OTP.");
        },
    });

    return mutation;
}

