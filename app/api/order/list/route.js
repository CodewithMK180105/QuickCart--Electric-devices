import connectDB from "@/config/db";
import Address from "@/models/address.models";
import Order from "@/models/order.models";
import Product from "@/models/product.models";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



export async function GET(request){
    try {
        const {userId}=getAuth(request);
        await connectDB();
        Address.length
        Product.length

        const orders=await Order.find({userId, $or: [{paymentType: 'COD'}, {paymentType: 'Stripe', isPaid: true}]}).populate("address items.product");

        return NextResponse.json({ success: true, orders});
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message});
    }
}