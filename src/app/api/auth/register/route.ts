import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { User } from '@/database/models';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().optional(),
  securityQuestion1: z.string().optional(),
  securityAnswer1: z.string().optional(),
  securityQuestion2: z.string().optional(),
  securityAnswer2: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Hash security answers if provided
    const hashedAnswer1 = validatedData.securityAnswer1
      ? await bcrypt.hash(validatedData.securityAnswer1.toLowerCase().trim(), 10)
      : null;
    const hashedAnswer2 = validatedData.securityAnswer2
      ? await bcrypt.hash(validatedData.securityAnswer2.toLowerCase().trim(), 10)
      : null;

    // Create user
    const user = await User.create({
      email: validatedData.email,
      password: hashedPassword,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      role: 'user',
      mustChangePassword: true,
      ...(validatedData.dateOfBirth && { dateOfBirth: new Date(validatedData.dateOfBirth) }),
      ...(validatedData.securityQuestion1 && { securityQuestion1: validatedData.securityQuestion1 }),
      ...(hashedAnswer1 && { securityAnswer1: hashedAnswer1 }),
      ...(validatedData.securityQuestion2 && { securityQuestion2: validatedData.securityQuestion2 }),
      ...(hashedAnswer2 && { securityAnswer2: hashedAnswer2 }),
    });

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
