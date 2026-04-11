import { VerifyEmail } from '@/features/auth/_components/verify-email'
import { getCurrent } from '@/features/auth/queries';
import { redirect } from 'next/navigation';


const VerifyEmailPage = async () => {
    const user = await getCurrent();
    
        if (user) redirect("/");
    return (
        <VerifyEmail/>
    )
}

export default VerifyEmailPage