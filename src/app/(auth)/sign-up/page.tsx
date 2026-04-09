import { SignUpForm } from '@/features/auth/_components/sign-up-form'
import { getCurrent } from '@/features/auth/queries';
import { redirect } from "next/navigation";

const SignUpPage = async () => {
    const user = await getCurrent();
    
    if (user) redirect("/");
    return (
        <SignUpForm/>
    )
}

export default SignUpPage