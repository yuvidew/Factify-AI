import { SignInForm } from '@/features/auth/_components/sign-in-form'
import { getCurrent } from '@/features/auth/queries';
import { redirect } from "next/navigation";

const SignInPage = async () => {
    const user = await getCurrent();

    if (user) redirect("/");
    return (
        <SignInForm/>
    )
}

export default SignInPage