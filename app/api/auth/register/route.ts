import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import {hash} from "bcrypt";

export async function POST(request: Request) {
  try {
    console.log(request.body);
    const { 
        email, 
        password, 
        username,
    } = await request.json();
    const hashedPassword = await hash(password, 10);   
    if(!email || !password || !username) {
        return NextResponse.json("Missing fields", { status: 400 });
    }
    const user = await db.user.create({ data: { 
        email, 
        hashedPassword, 
        username,
    } });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json("Internal Error", { status: 500 });
  }
}