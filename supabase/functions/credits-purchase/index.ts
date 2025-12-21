import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Credit packages
const PACKAGES = {
  starter: { credits: 100, avaxPrice: 0.5 },
  pro: { credits: 500, avaxPrice: 2.0 },
  enterprise: { credits: 2000, avaxPrice: 7.0 },
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { wallet_address, package: packageName = 'starter', tx_hash } = await req.json();

    const selectedPackage = PACKAGES[packageName as keyof typeof PACKAGES];
    if (!selectedPackage) {
      return new Response(
        JSON.stringify({ error: 'Invalid package' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // For demo/development: Add credits directly
    // In production, this would verify the transaction on-chain first
    console.log(`Processing credit purchase for user ${user.id}, wallet: ${wallet_address}, package: ${packageName}`);

    // Update profile with credits
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        credits_balance: supabase.rpc('increment_credits', { amount: selectedPackage.credits }),
        wallet_address: wallet_address 
      })
      .eq('user_id', user.id);

    // Manually update credits since RPC might not exist
    const { data: profile } = await supabase
      .from('profiles')
      .select('credits_balance')
      .eq('user_id', user.id)
      .single();

    const newBalance = (profile?.credits_balance || 0) + selectedPackage.credits;

    await supabase
      .from('profiles')
      .update({ 
        credits_balance: newBalance,
        wallet_address: wallet_address 
      })
      .eq('user_id', user.id);

    // Record transaction
    await supabase
      .from('credit_transactions')
      .insert({
        user_id: user.id,
        type: 'purchase',
        credits: selectedPackage.credits,
        tx_hash: tx_hash || `demo_${Date.now()}`,
        description: `Purchased ${packageName} package (${selectedPackage.credits} credits)`,
      });

    console.log(`Successfully added ${selectedPackage.credits} credits to user ${user.id}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        credits: selectedPackage.credits,
        newBalance: newBalance
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Credits purchase error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
