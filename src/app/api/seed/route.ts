import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    // Create categories
    const beverages = await prisma.category.create({
      data: {
        name: 'Beverages',
        description: 'Refreshing drinks and beverages',
        icon: 'Coffee',
      },
    })

    const fastFood = await prisma.category.create({
      data: {
        name: 'Fast Food',
        description: 'Quick and delicious fast food',
        icon: 'Burger',
      },
    })

    const cuisine = await prisma.category.create({
      data: {
        name: 'Cuisine',
        description: 'Traditional and international cuisine',
        icon: 'Utensils',
      },
    })

    // Create items
    await prisma.item.createMany({
      data: [
        { name: 'Coffee', description: 'Fresh brewed coffee', price: 3.50, image: '/images/beverages/coffee.jpg', categoryId: beverages.id },
        { name: 'Tea', description: 'Hot tea varieties', price: 2.50, image: '/images/beverages/tea.jpg', categoryId: beverages.id },
        { name: 'Soda', description: 'Carbonated soft drinks', price: 2.00, image: '/images/beverages/soda.jpg', categoryId: beverages.id },
        { name: 'Burger', description: 'Classic cheeseburger', price: 8.99, image: '/images/fast-food/burger.jpg', categoryId: fastFood.id },
        { name: 'Fries', description: 'Crispy french fries', price: 4.50, image: '/images/fast-food/fries.jpg', categoryId: fastFood.id },
        { name: 'Pizza', description: 'Margherita pizza', price: 12.99, image: '/images/fast-food/pizza.jpg', categoryId: fastFood.id },
        { name: 'Pasta', description: 'Creamy Alfredo pasta', price: 11.99, image: '/images/cuisine/pasta.jpg', categoryId: cuisine.id },
        { name: 'Salad', description: 'Fresh garden salad', price: 7.99, image: '/images/cuisine/salad.jpg', categoryId: cuisine.id },
        { name: 'Steak', description: 'Grilled ribeye steak', price: 24.99, image: '/images/cuisine/steak.jpg', categoryId: cuisine.id },
      ],
    })

    // Update existing items with images if they exist
    await prisma.item.updateMany({
      where: { categoryId: beverages.id, image: null },
      data: {
        image: '/images/beverages/coffee.jpg'
      }
    })
    await prisma.item.updateMany({
      where: { categoryId: fastFood.id, image: null },
      data: {
        image: '/images/fast-food/burger.jpg'
      }
    })
    await prisma.item.updateMany({
      where: { categoryId: cuisine.id, image: null },
      data: {
        image: '/images/cuisine/pasta.jpg'
      }
    })

    return NextResponse.json({ success: true, message: 'Database seeded successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 })
  }
}