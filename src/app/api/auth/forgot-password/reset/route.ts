import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { User } from '@/database/models';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      firstName,
      lastName,
      dateOfBirth,
      answer1,
      answer2,
      newPassword,
    } = await request.json();

    if (!email || !firstName || !lastName || !answer1 || !answer2 || !newPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify personal information
    if (
      user.firstName.toLowerCase() !== firstName.toLowerCase() ||
      user.lastName.toLowerCase() !== lastName.toLowerCase()
    ) {
      return NextResponse.json(
        { error: 'Personal information does not match' },
        { status: 400 }
      );
    }

    // Verify date of birth if provided
    if (dateOfBirth && user.dateOfBirth) {
      const userDob = new Date(user.dateOfBirth).toISOString().split('T')[0];
      if (userDob !== dateOfBirth) {
        return NextResponse.json(
          { error: 'Date of birth does not match' },
          { status: 400 }
        );
      }
    }

    // Verify security answers
    const answer1Valid = await bcrypt.compare(
      answer1.toLowerCase().trim(),
      user.securityAnswer1 || ''
    );
    const answer2Valid = await bcrypt.compare(
      answer2.toLowerCase().trim(),
      user.securityAnswer2 || ''
    );

    if (!answer1Valid || !answer2Valid) {
      return NextResponse.json(
        { error: 'Security answers do not match' },
        { status: 400 }
      );
    }

    // All verifications passed, update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({
      password: hashedPassword,
      mustChangePassword: false,
    });

    return NextResponse.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    );
  }
}
