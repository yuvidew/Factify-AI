"use client";

import { useRouter, useSearchParams } from "next/navigation";

/**
 * A custom hook to sync state with a URL query parameter.
 * @param key - The query parameter key to read/write.
 * @returns A tuple of [value, setValue] for the query parameter.
 */

export function useQueryState(key: string) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const value = searchParams.get(key) || "";

    const setValue = (newValue: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (newValue) {
        params.set(key, newValue);
        } else {
        params.delete(key);
        }

        router.replace(`?${params.toString()}`);
    };

    return [value, setValue] as const;
}