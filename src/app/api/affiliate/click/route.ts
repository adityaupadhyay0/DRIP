import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, retailer } = body;

    // In a real scenario, we would log this to Postgres (affiliate_clicks table)
    console.log(`Affiliate click recorded: Product ${productId} at ${retailer}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
