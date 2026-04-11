import { client } from "@/lib/rpc";
import { CurrentUserResponse } from "@/types/current-user-types";
import { useQuery } from "@tanstack/react-query";


// The useCurrentUser hook fetches the current user's information from the API. It uses React Query's useQuery to manage the data fetching and caching. The query key is set to ["current-user"], and the query function sends a GET request to the "current-user" endpoint. The response is expected to be in JSON format, and the types for the request and response are defined in the current-user-types file. This hook can be used throughout the application to access the current user's information in a type-safe manner.
export const useCurrentUser = () => {
    const query = useQuery<CurrentUserResponse, Error>({
        queryKey: ["current-user"],
        queryFn: async () => {
            const response = await client.api.auth["current-user"].$get();
            return response.json() as Promise<CurrentUserResponse>;
        },
        retry: false,
    });

    return query;
}