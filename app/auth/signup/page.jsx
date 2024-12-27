import { handleSignup } from '@/app/_lib/action';
import Link from 'next/link';
import Input from '@/app/_components/Input';
import Button from '@/app/_components/Button';

function SignupPage() {
  return (
    <div>
      <h2 className="font-bold text-[25px] mb-[31px]">Sign up</h2>
      <form action={handleSignup} method="post" className="flex flex-col gap-4">
        <Input type="text" name="firstName" placeholder="First Name" required />
        <Input type="text" name="lastName" placeholder="Last Name" required />
        <Input type="email" name="email" placeholder="Email" required />
        <Input type="password" name="password" placeholder="Password" required />
        <Input
          type="password"
          name="rePassword"
          placeholder="Confirm Password"
          required
        />
        <div className="text-center">
          <Link href="/auth/signin" className="text-[#122D9C]">
            Already have an account?
          </Link>
        </div>
        <Button>Sign Up</Button>
      </form>
    </div>
  );
}

export default SignupPage;
