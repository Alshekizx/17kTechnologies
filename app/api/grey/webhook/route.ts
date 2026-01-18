//file: api/grey/webhook/route.ts
import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface MarketplaceItem {
  title: string;
  driveLink: string;
}

export async function POST(req: Request) {
  const payload = await req.json();

  if (payload.status !== "success") {
    return NextResponse.json({ ok: true });
  }

  const { email, itemId } = payload.metadata;

  const ref = doc(db, "marketplaceItems", itemId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return NextResponse.json(
      { error: "Item not found" },
      { status: 404 }
    );
  }

  const item = snap.data() as MarketplaceItem;

  await resend.emails.send({
    from: "17k Technologies Marketplace <download@naijatalk.cloud>",
    to: email,
    subject: `Purchase successful: ${item.title}`,
    html: `
      <p>Thank you for your purchase</p>
      <a href="${item.driveLink}">Download from Google Drive</a>
    `,
  });

  await updateDoc(ref, {
    downloads: increment(1),
  });

  return NextResponse.json({ success: true });
}
