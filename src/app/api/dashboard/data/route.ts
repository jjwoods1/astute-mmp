import { NextResponse } from 'next/server';
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: excludedCompanies, error } = await supabase
      .from('excluded_companies')
      .select('company');

    if (error) throw error;

    return NextResponse.json({
      authenticated: true,
      excludedCompanies: (excludedCompanies || []).map(c => c.company)
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
