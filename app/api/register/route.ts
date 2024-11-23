import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import {
  personalInfoSchema,
  stokvelDetailsSchema,
} from '@/lib/validation/stokvel-schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate incoming data
    const personalInfo = personalInfoSchema.parse(body.personalInfo);
    const stokvelDetails = stokvelDetailsSchema.parse(body.stokvelDetails);

    // Create user
    const user = await prisma.user.create({
      data: {
        phoneNumber: personalInfo.phoneNumber,
        fullName: personalInfo.fullName,
        idNumber: personalInfo.idNumber,
        email: personalInfo.email,
      },
    });

    // Create Stokvel
    const stokvel = await prisma.stokvel.create({
      data: {
        name: stokvelDetails.name,
        type: stokvelDetails.type,
        description: stokvelDetails.description,
        contributionAmount: stokvelDetails.contributionAmount,
        frequency: stokvelDetails.frequency,
        admins: {
          create: [
            {
              userId: user.id,
              permissions: ['full'],
              isPrimary: true,
            },
          ],
        },
      },
    });

    return NextResponse.json(
      {
        message: 'Registration successful',
        userId: user.id,
        stokvelId: stokvel.id,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Registration failed',
        error: error.message,
      },
      { status: 400 }
    );
  }
}
