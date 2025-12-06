import { NextRequest, NextResponse } from 'next/server';
import { Settings } from '@/database/models';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        let settings = await Settings.findOne();

        if (!settings) {
            settings = await Settings.create({
                storeName: 'E-Shop',
                email: 'admin@eshop.com',
                phone: '+1234567890',
                shippingFee: 5.00,
                freeShippingThreshold: 50.00,
                taxRate: 8.50,
            });
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch settings' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        let settings = await Settings.findOne();

        if (settings) {
            await settings.update(body);
        } else {
            settings = await Settings.create(body);
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json(
            { error: 'Failed to update settings' },
            { status: 500 }
        );
    }
}
