import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { User } from "@/database/models";
import logger from "@/utils/logger";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    logger.apiRequest("GET", "/api/admin/users");
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== "admin") {
      logger.authFailed("Admin Users Access", "Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await User.findAll({
      attributes: ["id", "email", "firstName", "lastName", "role", "createdAt"],
      order: [["createdAt", "DESC"]],
    });

    logger.success("Admin users fetched", { count: users.length });
    return NextResponse.json(users);
  } catch (error) {
    logger.error("Admin users fetch error", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== "admin") {
      logger.authFailed("Create User", "Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { email, password, firstName, lastName, role } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: role || 'user',
      mustChangePassword: true,
    });

    logger.success("User created by admin", { id: user.id, email: user.email });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    logger.error("Create user error", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
