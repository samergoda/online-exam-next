import { handleResetPassword } from '@/app/_lib/actions';
import Input from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import { experimental_useFormStatus as useFormStatus } from 'react';

function ResetPasswordPage() {
  const { error, pending } = useFormStatus();

  return (
    <div>
      <h2 className="font-bold text-[25px] mb-[31px]">Reset Password</h2>
      <form action={handleResetPassword} method="post" className="flex flex-col gap-4">
        <Input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="New Password"
          required
        />
        <Input
          type="password"
          name="rePassword"
          placeholder="Confirm Password"
          required
        />

        <Button type="submit">{pending ? 'Loading...' : 'Reset Password'}</Button>

        {/* Display error or success message */}
        {error && <p className="text-red-500 text-sm max-w-[400px]">{error}</p>}
      </form>
      <div className="text-end">
        <a href="/auth/forgetPassword">Recover Password</a>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
