
export const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!;
export const PROJECT_NAME = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_NAME!;
export const APPWRITER_KEY = process.env.NEXT_PUBLIC_APPWRITE_API_KEY!;
export const APPWRITER_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!;

export const GITHUB_REDIRECT_URL = process.env.NEXT_PUBLIC_GITHUB!;
export const GOOGLE_REDIRECT_URL = process.env.NEXT_PUBLIC_GOOGLE!;

// Provide a robust default for Appwrite Cloud and normalize region subdomains
const normalizeEndpoint = (raw?: string) => {
    const fallback = "https://cloud.appwrite.io/v1";
    if (!raw) return fallback;
    try {
        const url = new URL(raw);
        if (url.hostname.endsWith(".cloud.appwrite.io")) {
            url.hostname = "cloud.appwrite.io";
            return url.toString();
        }
        return url.toString();
    } catch {
        return raw || fallback;
    }
};

export const ENDPOINT = normalizeEndpoint(APPWRITER_ENDPOINT);
