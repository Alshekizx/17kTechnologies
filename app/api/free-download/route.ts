//file: api/free-download/route.ts
import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email, itemId } = await req.json();

  if (!email || !itemId) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const ref = doc(db, "marketplaceItems", itemId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  const item = snap.data();

  if (!item.isFree) {
    return NextResponse.json({ error: "Not a free item" }, { status: 403 });
  }

  await resend.emails.send({
    from: "17k Technologies Marketplace <download@naijatalk.cloud>",
    to: email,
    subject: `Your download: ${item.title}`,
    html: `
      <p>Thanks for downloading <strong>${item.title}</strong></p>
      <p><a href="${item.driveLink}">Download from Google Drive</a></p>
    `,
  });



  await updateDoc(ref, {
    downloads: increment(1),
  });

  return NextResponse.json({ success: true });
}
