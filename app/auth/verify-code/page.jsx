import { verifyResetCodeAction } from '@/app/_lib/actions';
import Input from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import { experimental_useFormStatus as useFormStatus } from 'react';

function VerifyCodePage() {
  const { pending, error } = useFormStatus();

  return (
    <div>
      <h2 className="font-bold text-[25px] mb-[31px]">Verify Code</h2>
      <form action={verifyResetCodeAction} method="post" className="flex flex-col gap-4">
        <Input
          type="text"
          name="resetCode"
          placeholder="Enter code"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" disabled={pending}>
          {pending ? 'Verifying...' : 'Verify Code'}
        </Button>
      </form>
      <div className="text-end mt-4">
        <a href="/auth/forgetPassword" className="text-blue-500 hover:underline">
          Recover password
        </a>
      </div>
    </div>
  );
}

export default VerifyCodePage;
