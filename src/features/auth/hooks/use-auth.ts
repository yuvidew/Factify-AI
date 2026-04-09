import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SignInRequestType, SignInResponseType, SignUpRequestType, SignUpResponseType, LogOutRequestType, LogOutResponseType } from "../types/types";


// Hooks for authentication actions: sign-in, sign-up, and log-out. Each hook uses React Query's useMutation to handle the respective API calls and manage success/error states. On success, the user is redirected to the appropriate page, and on error, a toast notification is displayed with the error message.

// The useSignIn hook manages the user sign-in process. It sends a POST request to the sign-in endpoint with the user's email and password. If the sign-in is successful, it redirects the user to the home page. If there's an error during sign-in, it shows a toast notification with the error message.
export const useSignIn = () => {
    const router = useRouter();
    // const queryClient = useQueryClient();

    const mutation = useMutation<SignInResponseType, Error, SignInRequestType>({
        mutationFn: async (data) => {
            const response = await client.api.auth["sign-in"].$post(data);
            return response.json();
        },
        onSuccess: () => {
            // queryClient.invalidateQueries(["auth", "me"]);
            router.push("/");
        },
            onError: (error) => {
                toast.error(error.message || "An error occurred during sign-in.");
            }
    });

    return mutation;
};

// The useSignUp hook handles user registration. It sends a POST request to the sign-up endpoint with the user's name, email, and password. On successful registration, it redirects the user to the home page. If there's an error during registration, it shows a toast notification with the error message.
export const useSignUp = () => {
    const router = useRouter();
    // const queryClient = useQueryClient();

    const mutation = useMutation<SignUpResponseType, Error, SignUpRequestType>({
        mutationFn: async (data) => {
            const response = await client.api.auth["sign-up"].$post(data);
            return response.json();
        },
        onSuccess: () => {
            // queryClient.invalidateQueries(["auth", "me"]);
            router.push("/");
        },
        onError: (error) => {
            toast.error(error.message || "An error occurred during sign-up.");
        }
    });

    return mutation;
};

// The useLogOut hook manages the user log-out process. It sends a POST request to the log-out endpoint, and on success, it redirects the user to the sign-in page. If there's an error during log-out, it displays a toast notification with the error message.
export const useLogOut = () => {
    const router = useRouter();
    // const queryClient = useQueryClient();

    const mutation = useMutation<LogOutResponseType, Error, LogOutRequestType>({
        mutationFn: async () => {
            const response = await client.api.auth["log-out"].$post();
            return response.json();
        },
        onSuccess: () => {
            // queryClient.invalidateQueries(["auth", "me"]);
            router.push("/sign-in");
        },
        onError: (error) => {
            toast.error(error.message || "An error occurred during log-out.");
        }
    });

    return mutation;

};