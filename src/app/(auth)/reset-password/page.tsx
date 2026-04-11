import { ResetPasswordForm } from '@/features/auth/_components/reset-password-form';
import { getCurrent } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

const ResetPasswordPage = async () => {
    const user = await getCurrent();
    
        if (user) redirect("/");
    return (
        <ResetPasswordForm />
    )
}

export default ResetPasswordPage