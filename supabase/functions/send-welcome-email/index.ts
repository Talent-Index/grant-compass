import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: WelcomeEmailRequest = await req.json();
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    
    console.log(`Sending welcome email to: ${email}`);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Grantees <onboarding@resend.dev>",
        to: [email],
        subject: "Welcome to Grantees! 🎉",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a2e; margin: 0; padding: 0; background-color: #f4f4f5;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="background: linear-gradient(135deg, #10b981 0%, #0d9488 100%); border-radius: 16px 16px 0 0; padding: 40px 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">
                  Account Created Successfully! 🎉
                </h1>
              </div>
              <div style="background: white; border-radius: 0 0 16px 16px; padding: 40px 30px; box-shadow: 0 4px 24px rgba(0,0,0,0.1);">
                <h2 style="color: #1a1a2e; margin: 0 0 16px 0; font-size: 22px;">
                  Welcome to Grantees
                </h2>
                <p style="color: #64748b; margin: 0 0 24px 0;">
                  You've just joined the smartest way to discover grants, travel funding, hackathons, and programs for Web3 builders.
                </p>
                
                <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 24px 0;">
                  <h3 style="color: #1a1a2e; margin: 0 0 12px 0; font-size: 16px;">What's next?</h3>
                  <ul style="color: #64748b; margin: 0; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">Complete your builder profile</li>
                    <li style="margin-bottom: 8px;">Get personalized grant matches</li>
                    <li style="margin-bottom: 8px;">Track deadlines and applications</li>
                  </ul>
                </div>
                
                <p style="color: #94a3b8; font-size: 14px; margin: 32px 0 0 0;">
                  Questions? Reply to this email or join our community.
                </p>
              </div>
              <div style="text-align: center; padding: 24px; color: #94a3b8; font-size: 12px;">
                <p style="margin: 0;">© 2025 Grantees. Built for builders.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Resend API error:", data);
      throw new Error(data.message || "Failed to send email");
    }

    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in send-welcome-email function:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
