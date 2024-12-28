import { forgotPasswordAction } from '@/app/_lib/actions';
import Input from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import { experimental_useFormStatus as useFormStatus } from 'react';
import Link from 'next/link';

function ForgotPasswordPage() {
  const { pending, error } = useFormStatus();

  return (
    <div>
      <h2 className="font-bold text-[25px] mb-[31px]">Forgot your password?</h2>
      <form action={forgotPasswordAction} method="post" className="flex flex-col gap-4">
        <Input
          type="email"
          name="email"
          placeholder="Enter Email"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" disabled={pending}>
          {pending ? 'Sending...' : 'Recover Password'}
        </Button>
      </form>
      <div className="text-end mt-4">
        <Link href="/auth/signin" className="text-blue-500 hover:underline">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
