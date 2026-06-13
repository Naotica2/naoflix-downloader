import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const payload = await req.json();

    const donorName = payload.donation?.name || payload.name || "Anonim";
    const amount = payload.donation?.amount || payload.amount || 0;
    const message = payload.donation?.message || payload.message || null;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error: insertError } = await supabase
      .from("donators")
      .insert({ name: donorName, amount, message });

    if (insertError) {
      console.error("Insert donator error:", insertError);
      throw insertError;
    }

    const { data: activeGoal } = await supabase
      .from("donation_goals")
      .select("id, current_amount")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (activeGoal) {
      const { error: updateError } = await supabase
        .from("donation_goals")
        .update({
          current_amount: activeGoal.current_amount + amount,
          updated_at: new Date().toISOString(),
        })
        .eq("id", activeGoal.id);

      if (updateError) {
        console.error("Update goal error:", updateError);
        throw updateError;
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
