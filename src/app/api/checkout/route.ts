import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { name, email, phone, address, paymentMethod } = await request.json()
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('sessionId')?.value || 'default'

    // Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { sessionId },
      include: { item: true },
    })

    if (cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Create user
    const user = await prisma.user.create({
      data: { name, email, phone, address },
    })

    // Calculate total
    const totalAmount = cartItems.reduce(
      (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
      0
    )

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalAmount,
        paymentMethod,
        orderItems: {
          create: cartItems.map(cartItem => ({
            itemId: cartItem.itemId,
            quantity: cartItem.quantity,
            price: cartItem.item.price,
          })),
        },
      },
    })

    // Clear cart
    await prisma.cartItem.deleteMany({
      where: { sessionId },
    })

    return NextResponse.json({ orderId: order.id, success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process checkout' }, { status: 500 })
  }
}