import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/database/models';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'Email not found' }, { status: 404 });
    }

    if (!user.securityQuestion1 || !user.securityQuestion2) {
      return NextResponse.json(
        { error: 'Security questions not set up for this account. Please contact admin.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      questions: [user.securityQuestion1, user.securityQuestion2],
    });
  } catch (error) {
    console.error('Verify email error:', error);
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    );
  }
}
