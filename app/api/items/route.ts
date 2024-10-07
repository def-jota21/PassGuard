import {db} from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { 
        typeElement, 
        isFavourite, 
        name, 
        directory, 
        username, 
        password, 
        url, 
        notes, 
        userId,
    } = await request.json();
    const element = await db.element.create({ data: { 
        typeElement, 
        isFavourite, 
        name, 
        directory, 
        username, 
        password, 
        url, 
        notes, 
        userId,
    } });
    return NextResponse.json(element);
  } catch (error) {
    return NextResponse.json("Internal Error", { status: 500 });
  }
}