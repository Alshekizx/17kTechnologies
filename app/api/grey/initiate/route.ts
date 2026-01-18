//file: api/grey/initiate/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, itemId } = await req.json();

  // 🔴 Call Grey API here
  // attach metadata { email, itemId }

  return NextResponse.json({
    paymentUrl: "https://grey.co/pay/xxxx"
  });
}
