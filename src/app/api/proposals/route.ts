import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { errorMessage } from "@/lib/errors";

const COLUMNS =
  "id, userId:user_id, companyName:company_name, tableRows:table_rows, totalCampaignCost:total_campaign_cost, leadBenchmark:lead_benchmark, primaryObjective:primary_objective, secondaryObjective:secondary_objective, createdAt:created_at, updatedAt:updated_at";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("proposals")
      .select(COLUMNS)
      .order("id", { ascending: true })
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching proposal:", error);
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      companyName,
      tableRows,
      totalCampaignCost,
      leadBenchmark,
      primaryObjective,
      secondaryObjective,
    } = await req.json();

    const { data, error } = await supabaseServer
      .from("proposals")
      .insert({
        user_id: userId || "default",
        company_name: companyName,
        table_rows: tableRows,
        total_campaign_cost: totalCampaignCost,
        lead_benchmark: leadBenchmark,
        primary_objective: primaryObjective,
        secondary_objective: secondaryObjective,
      })
      .select(COLUMNS)
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating proposal:", error);
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
