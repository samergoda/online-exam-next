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



export async function handleResetPassword(formData) {
  const { oldPassword, password, rePassword } = Object.fromEntries(formData.entries());

  // Validation
  if (password.length < 6 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    return { error: 'Password must be at least 6 characters, include an uppercase letter, and a number.' };
  }
  if (password !== rePassword) {
    return { error: 'Passwords do not match.' };
  }

  try {
    const response = await fetch('https://exam.elevateegy.com/api/v1/auth/changePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ oldPassword, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Something went wrong' };
    }

    // Success response
    return { success: 'Password changed successfully!' };
  } catch (err) {
    return { error: err.message };
  }
}



export async function verifyResetCodeAction(formData) {
  const resetCode = formData.get('resetCode');

  try {
    const response = await fetch('https://exam.elevateegy.com/api/v1/auth/verifyResetCode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resetCode }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to verify the code' };
    }

    return { success: 'Code verified successfully!' };
  } catch (error) {
    return { error: error.message };
  }
}



export async function forgotPasswordAction(formData) {
  const email = formData.get('email');

  try {
    const response = await fetch('https://exam.elevateegy.com/api/v1/auth/forgotPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.message || 'Failed to send recovery email' };
    }

    return { success: 'Recovery email sent successfully!' };
  } catch (error) {
    return { error: error.message };
  }
}
