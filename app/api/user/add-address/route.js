import connectDB from "@/config/db";
import Address from "@/models/address.models";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(request){
    try{
        const {userId}=getAuth(request);
        const {address}= await request.json();

        await connectDB();
        const newAddress=await Address.create({...address, userId});

        return NextResponse.json({success: true, message: "Address added successfuly", newAddress});

    } catch(error){
        return NextResponse.json({success: false, meessage: error.message});
    }
}
