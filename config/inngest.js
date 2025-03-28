import { Inngest } from "inngest";
import connectDB from "./db.js";
import User from "@/models/user.models.js";
import Order from "@/models/order.models.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// Inngest Function to save user data to a database
export const syncUserCreation=inngest.createFunction(
    {
        id: "sync-user-from-clerk"
    },
    {
        event: "clerk/user.created"
    },
    async({event})=>{
        const {id, first_name, last_name, email_addresses, image_url}=event.data;
        const userData={
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name+" "+last_name,
            imageUrl: image_url,
        }
        await connectDB();
        await User.create(userData);
    }
)

// Inngest Function to update user data in the database
export const syncUserUpdation= inngest.createFunction(
    {
        id: "update-user-from-clerk"
    },
    {
        event: "clerk/user.updated"
    },
    async({event})=>{
        const {id, first_name, last_name, email_addresses, image_url}=event.data;
        const userData={
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name+" "+last_name,
            imageUrl: image_url,
        }
        await connectDB();
        await User.findByIdAndUpdate(id, userData);
    }
)

// Inngest Function to delete a user from the database
export const syncUserDeletion= inngest.createFunction(
    {
        id: "delete-user-with-clerk"
    },
    {
        event: "clerk/user.deleted"
    },
    async({event})=>{
        const {id}=event.data;
        await connectDB();
        await User.findByIdAndDelete(id);
    }
)


// We will use the batching process of the inngest to manage the read and the write operation to the database efficiently
// Inngest also provide the queue process and the concurrency process. But here we are using the batching process

// Inngest function to create the user's order in the database.
export const createUserOrder= inngest.createFunction(
    {
        id: "create-user-order",
        batchEvents: {
            maxSize: 5,
            timeout: "5s"
        }
    },
    {event: "order/created"},
    async({events})=>{
        const orders=events.map((event)=>{
            return {
                userId: event.data.userId,
                items: event.data.items,
                amount: event.data.amount,
                address: event.data.address,
                date: event.data.date
            }
        })

        await connectDB();
        await Order.insertMany(orders);

        return {
            success: true,
            processed: orders.length
        }
    }
)
