# ⚡ QuickCart – Full Stack Electronics E-commerce Platform

QuickCart full-stack e-commerce application designed for selling electronic products. It supports both buyers and sellers with distinct experiences. Buyers can browse items, manage their cart, and complete purchases securely using Stripe. Sellers can add/manage products and track orders through a personalized dashboard.

## 🌐 Live Demo

🔗 [QuickCart Live](https://quick-cart-electric-devices.vercel.app/)  
> Replace the link with your actual deployed site.

---

## 🚀 Features

### 🛒 For Buyers
- **🧭 Product Browsing** – Explore a wide range of electronics with filters and search.
- **🛍️ Add to Cart & Cart Management** – Add items, update quantities, and remove products from your cart.
- **💳 Stripe Integration** – Secure checkout and payment flow using Stripe.
- **📦 Order Placement** – Seamless order flow with real-time order confirmation.

### 🧑‍💼 For Sellers
- **📋 Seller Dashboard** – Authenticated sellers can manage all their operations.
- **➕ Add Product** – Upload images (via Cloudinary) and add descriptions, prices, and categories.
- **📃 Product List** – View and manage all uploaded products with data from MongoDB.
- **📬 Order Management** – See a list of orders received for your products.

### 💡 System Features
- **🔐 Authentication with Clerk** – Role-based authentication and secure session handling.
- **📨 Event Handling with Inngest** – Efficient backend event processing (like order creation).
- **📸 Cloudinary for Images** – Dynamic image upload and CDN delivery.
- **🖥️ Fully Responsive UI** – Optimized for both desktop and mobile experiences.

---

## 🛠️ Tech Stack

| Tech                  | Purpose                          |
|-----------------------|----------------------------------|
| **Next.js**           | Frontend framework               |
| **TypeScript**        | Type safety                      |
| **React.js**          | Component-based UI               |
| **Tailwind CSS**      | Styling                          |
| **ShadCN UI**         | UI components                    |
| **MongoDB**           | Database                         |
| **Node.js & Express** | Backend server                   |
| **Clerk**             | Authentication                   |
| **Cloudinary**        | Image storage                    |
| **Inngest**           | Event handling                   |
| **Stripe**            | Payment processing               |

---

## 🧠 What I Learned

- Implemented buyer and seller logic with role-based routing.
- Used Clerk for full authentication flow and session management.
- Integrated Cloudinary for image handling.
- Built real-time cart logic with persistent updates.
- Used Stripe for secure payments and dynamic order creation.
- Leveraged Inngest for clean and scalable event-based backend tasks.

---

## 🙌 Acknowledgements

- [Clerk](https://clerk.dev) – For beautiful and secure auth
- [Cloudinary](https://cloudinary.com) – For fast media delivery
- [Inngest](https://www.inngest.com) – For event orchestration
- [Stripe](https://stripe.com) – For seamless online payments

---

