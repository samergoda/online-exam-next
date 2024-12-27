'use server';
import { getServerSession } from 'next-auth/next';
import { OPTIONS } from './../api/auth/[...nextauth]/route';
// import { signIn } from 'next-auth/react';

export async function create() {
  const session = await getServerSession(OPTIONS);

  console.log(session);
  return session;
}

export async function handleSignup(formData) {
  const { firstName, lastName, email, password, rePassword } =
    Object.fromEntries(formData.entries());

  // Validation logic
  if (password !== rePassword) {
    throw new Error('Passwords do not match');
  }

  if (password.length < 6 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    throw new Error(
      'Password must be at least 6 characters, include an uppercase letter, and a number.'
    );
  }

  try {
    const response = await fetch(
      'https://exam.elevateegy.com/api/v1/auth/signup',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to sign up.');
    }

    // Redirect on success
    return { redirect: '/auth/signin' };
  } catch (error) {
    // Return error to be displayed
    return { error: error.message };
  }
}
