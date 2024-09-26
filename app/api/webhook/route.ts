/* eslint-disable camelcase */
import { createUser, updateUser } from "@/actions/user.action";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("Please add WEBHOOK_SECRET in .env or .env.local");
  }

  const headersPayload = headers();

  const svixId = headersPayload.get("svix-id");
  const svixTimestamp = headersPayload.get("svix-timestamp");
  const svixSignature = headersPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error occured - no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    const user = await createUser({
      clerkId: id,
      email: email_addresses[0].email_address,
      fullName: `${first_name} ${last_name}`,
      picture: image_url,
    });

    return NextResponse.json({ message: "ok", user });
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    const user = await updateUser({
      clerkId: id,
      updatedData: {
        email: email_addresses[0].email_address,
        fullName: `${first_name} ${last_name}`,
        picture: image_url,
      },
    });

    return NextResponse.json({ message: "ok", user });
  }
}
