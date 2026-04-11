import { ModeToggle } from "@/components/ui/mode-toggle";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10 relative">
            <div className="absolute top-4 right-4 ">
                <ModeToggle />
            </div>
            <div className="w-full max-w-sm">
                {children}
            </div>
        </main>
    )
}

export default AuthLayout;