import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, {params} : { params: { itemId: string } }) {
  try {
    const {itemId} = params;
    const values = await request.json();

    if(!itemId) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    const element = await db.element.update({
        where: {
            id: itemId,
        },
        data: {...values},
    });
    return NextResponse.json(element);
  } catch (error) {
    return NextResponse.json("Internal Error", { status: 500 });
  }
}