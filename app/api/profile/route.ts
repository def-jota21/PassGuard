import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const { 
        name,
        email,
        profileimage, 
        username,
        id,
    } = await request.json();
    if(!name || !email || !profileimage || !username || !id) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    const profile = await db.user.update({
        where: {
            id: id,
        },
        data: {
            name,
            email,
            profileimage,
            username,
        },
    });

    if(!profile) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }
    
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json("Internal Error", { status: 500 });
  }
}