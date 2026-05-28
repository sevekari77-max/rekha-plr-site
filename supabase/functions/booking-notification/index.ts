import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface BookingData {
  full_name: string;
  email: string;
  phone: string;
  city?: string;
  country: string;
  preferred_contact: string;
  session_type: string;
  session_mode: string;
  session_date?: string;
  session_time?: string;
  timezone?: string;
  message?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const bookingData: BookingData = await req.json();

    // Format the email body
    const emailBody = `
New PLR Session Booking Request
================================

Client Information:
- Name: ${bookingData.full_name}
- Email: ${bookingData.email}
- Phone: ${bookingData.phone}
- City: ${bookingData.city || 'Not specified'}
- Country: ${bookingData.country}
- Preferred Contact: ${bookingData.preferred_contact}

Session Details:
- Session Type: ${bookingData.session_type}
- Session Mode: ${bookingData.session_mode}
- Preferred Date: ${bookingData.session_date || 'Not specified'}
- Preferred Time: ${bookingData.session_time || 'Not specified'}
- Timezone: ${bookingData.timezone || 'Not specified'}

Additional Message:
${bookingData.message || 'No additional message'}

---
This booking was submitted through the PLR website.
Reply to this email or contact the client directly at ${bookingData.email} or ${bookingData.phone}.
`;

    console.log('Booking notification received:', emailBody);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Booking notification processed',
        data: {
          to: 'rekhavasantkoranne@gmail.com',
          subject: 'New PLR Session Booking',
          body: emailBody,
        },
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error processing booking notification:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
