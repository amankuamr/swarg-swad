# Swarg Swad - Restaurant Ordering System

A modern, full-stack restaurant ordering application built with Next.js, featuring a beautiful UI and comprehensive order management system.

## 🍽️ About Swarg Swad

Swarg Swad is a heavenly Indian cuisine restaurant ordering platform that allows customers to browse delicious food items, add them to cart, place orders, and track their order history. The application features an intuitive interface with categories for Beverages, Fast Food, and Cuisine, providing an exceptional dining experience.

## 🚀 Features

- **Browse Menu**: Explore food items organized by categories (Beverages, Fast Food, Cuisine)
- **Shopping Cart**: Add/remove items with quantity management
- **Order Management**: Place orders and track order status
- **Order History**: View past orders with detailed information
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Live cart updates and order status tracking
- **Beautiful UI**: Modern design with smooth animations using Framer Motion

## 🛠️ Technologies Used

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth transitions
- **Lucide React** - Beautiful icons
- **shadcn/ui** - Modern UI components

### Backend & Database
- **Next.js API Routes** - Server-side API endpoints
- **Prisma** - Database ORM and migration tool
- **SQLite** - Lightweight database for development

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **TypeScript** - Type checking

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🏃‍♂️ Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd restaurant
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up the Database

#### Initialize Prisma
```bash
npx prisma generate
```

#### Run Database Migrations
```bash
npx prisma migrate dev
```

#### Seed the Database with Sample Data
```bash
npx prisma db seed
```

This will populate your database with sample categories and food items.

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Management with Prisma Studio

Prisma Studio provides a beautiful GUI to view and edit your database.

### Start Prisma Studio

```bash
npx prisma studio
```

By default, Prisma Studio runs on [http://localhost:5555](http://localhost:5555)

### Alternative: Run on Different Port

```bash
npx prisma studio --port 5556
```

Then access it at [http://localhost:5556](http://localhost:5556)

### What You Can Do in Prisma Studio

- **View Tables**: See all your data in User, Category, Item, Order, OrderItem, and CartItem tables
- **Edit Data**: Add, modify, or delete records directly from the interface
- **Query Data**: Use the query interface to run custom database queries
- **Monitor Changes**: See real-time updates as users interact with the application

## 📁 Project Structure

```
restaurant/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── dev.db                 # SQLite database file
├── public/
│   └── images/                # Food item images
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── api/               # API routes
│   │   │   ├── cart/          # Cart management
│   │   │   ├── categories/    # Category endpoints
│   │   │   ├── checkout/      # Order processing
│   │   │   ├── items/         # Item management
│   │   │   ├── orders/        # Order history
│   │   │   └── seed/          # Database seeding
│   │   ├── cart/              # Shopping cart page
│   │   ├── checkout/          # Checkout page
│   │   ├── menu/              # Full menu page
│   │   ├── orders/            # Order history page
│   │   ├── order-success/     # Order confirmation
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/                # Reusable UI components
│   │   ├── Cart.tsx           # Shopping cart component
│   │   ├── CheckoutForm.tsx   # Checkout form
│   │   ├── Footer.tsx         # Site footer
│   │   ├── Hero.tsx           # Hero section
│   │   ├── MenuSection.tsx    # Menu category section
│   │   ├── MenuTabs.tsx       # Menu tabs component
│   │   ├── Navbar.tsx         # Navigation bar
│   │   └── OrderSuccess.tsx   # Order success component
│   ├── hooks/                 # Custom React hooks
│   │   └── useCart.tsx        # Cart state management
│   └── lib/                   # Utility libraries
│       ├── prisma.ts          # Prisma client
│       └── utils.ts           # Utility functions
├── package.json               # Dependencies and scripts
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## 🎯 Usage Guide

### For Customers

1. **Browse Menu**: Visit the home page to see featured items from each category
2. **View Full Menu**: Click the "Menu" button in the navbar or "View All Items" buttons to see all items
3. **Add to Cart**: Click "Add to Cart" on any item to add it to your shopping cart
4. **Manage Cart**: Use the cart icon in the navbar to view, modify, or remove items
5. **Checkout**: Proceed to checkout to place your order
6. **Track Orders**: Use the orders icon in the navbar to view your order history and status

### For Developers

#### Adding New Menu Items

1. Open Prisma Studio: `npx prisma studio`
2. Navigate to the "Item" table
3. Click "Add record" to add new food items
4. Fill in the required fields: name, price, categoryId, etc.

#### Modifying Categories

1. In Prisma Studio, go to the "Category" table
2. Edit existing categories or add new ones
3. Update the corresponding items to use the new category IDs

#### Customizing Styling

- **Colors**: Modify Tailwind classes in component files
- **Layout**: Adjust responsive breakpoints in the components
- **Animations**: Customize Framer Motion animations in component files

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma studio    # Open Prisma Studio
npx prisma migrate dev  # Run migrations
npx prisma db seed   # Seed database
npx prisma generate  # Generate Prisma client
```

## 🌟 Key Features Explained

### Smart Menu Display
- **Home Page**: Shows 6 items per category (2 rows) with "View All" buttons
- **Menu Page**: Complete catalog with tabbed navigation by category
- **Search & Filter**: Easy navigation between different food categories

### Cart Management
- **Persistent Cart**: Items remain in cart across page refreshes
- **Quantity Control**: Increase/decrease item quantities
- **Real-time Updates**: Cart total updates instantly
- **Remove Items**: Easy removal of unwanted items

### Order System
- **Order Tracking**: Real-time order status updates
- **Order History**: Complete order history with itemized bills
- **Payment Integration**: Ready for payment gateway integration
- **Order Confirmation**: Success pages with order details

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Perfect display on tablets
- **Desktop Experience**: Full-featured desktop interface
- **Touch-Friendly**: Large touch targets for mobile users

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions, please open an issue in the repository or contact the development team.

---

**Enjoy your heavenly dining experience with Swarg Swad! 🍽️✨**
