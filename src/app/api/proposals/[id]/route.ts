import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { errorMessage } from "@/lib/errors";

const COLUMNS =
  "id, userId:user_id, companyName:company_name, tableRows:table_rows, totalCampaignCost:total_campaign_cost, leadBenchmark:lead_benchmark, primaryObjective:primary_objective, secondaryObjective:secondary_objective, createdAt:created_at, updatedAt:updated_at";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const { data, error } = await supabaseServer
      .from("proposals")
      .update({
        company_name: body.companyName,
        table_rows: body.tableRows,
        total_campaign_cost: body.totalCampaignCost,
        lead_benchmark: body.leadBenchmark,
        primary_objective: body.primaryObjective,
        secondary_objective: body.secondaryObjective,
        updated_at: new Date().toISOString(),
      })
      .eq("id", parseInt(id))
      .select(COLUMNS)
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating proposal:", error);
    return NextResponse.json({ error: errorMessage(error) }, { status: 500 });
  }
}
