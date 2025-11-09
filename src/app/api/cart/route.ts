import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('sessionId')?.value || 'default'

    const cartItems = await prisma.cartItem.findMany({
      where: { sessionId },
      include: { item: true },
    })

    return NextResponse.json(cartItems)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { itemId, quantity } = await request.json()
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('sessionId')?.value || 'default'

    const existingItem = await prisma.cartItem.findFirst({
      where: { sessionId, itemId },
    })

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      })
    } else {
      await prisma.cartItem.create({
        data: { sessionId, itemId, quantity },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { itemId } = await request.json()
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('sessionId')?.value || 'default'

    await prisma.cartItem.deleteMany({
      where: { sessionId, itemId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove from cart' }, { status: 500 })
  }
}