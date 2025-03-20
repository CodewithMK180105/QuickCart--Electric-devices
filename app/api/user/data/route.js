import connectDB from "@/config/db";
import User from "@/models/user.models";
import { getAuth } from "@clerk/nextjs/server";
// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(request){
    try{
        const {userId}=getAuth(request);
        // console.log(userId);
        await connectDB();
        const user=await User.findById(userId);

        if(!user){
            return NextResponse.json({ success: false, message: "User not Found" });
        }
        return NextResponse.json({success: true, user});
    } catch(error){
        return NextResponse.json({ success: false, message: error.message });
    }
}
