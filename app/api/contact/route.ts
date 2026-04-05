import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "maorhadad94@gmail.com",
      subject: `New message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: monospace; background: #0a0a0f; color: #e2e8f0; padding: 32px; border-radius: 12px; max-width: 600px;">
          <div style="border-left: 3px solid #00f5ff; padding-left: 16px; margin-bottom: 24px;">
            <h2 style="color: #00f5ff; margin: 0 0 4px;">New Contact Form Submission</h2>
            <p style="color: #64748b; margin: 0; font-size: 13px;">From your portfolio</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="color: #64748b; padding: 8px 0; font-size: 13px; width: 80px;">Name</td>
              <td style="color: #e2e8f0; padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="color: #64748b; padding: 8px 0; font-size: 13px;">Email</td>
              <td style="color: #00f5ff; padding: 8px 0;">${email}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 20px; background: #0f0f1a; border-radius: 8px; border: 1px solid #1e1e3a;">
            <p style="color: #64748b; font-size: 13px; margin: 0 0 8px;">Message</p>
            <p style="color: #e2e8f0; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #334155; font-size: 12px; margin-top: 24px;">Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
