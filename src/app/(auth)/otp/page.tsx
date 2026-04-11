import { OtpForm } from '@/features/auth/_components/otp-form'
import { getCurrent } from '@/features/auth/queries';
import { redirect } from 'next/navigation';

const OtpPage = async () => {
    const user = await getCurrent();

    if (user) redirect("/");
    return (
        <OtpForm />
    )
}

export default OtpPage