'use client'

import { useCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export function Cart() {
  const { cartItems, removeFromCart } = useCart()

  const total = cartItems.reduce((sum, item) => sum + item.item.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Items</h2>
            {cartItems.map((cartItem) => (
              <Card key={cartItem.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{cartItem.item.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {cartItem.quantity}</p>
                      <p className="text-sm text-gray-600">₹{cartItem.item.price.toFixed(2)} each</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{(cartItem.item.price * cartItem.quantity).toFixed(2)}</p>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFromCart(cartItem.itemId)}
                        className="mt-2"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-4">
                  <span>Total:</span>
                  <span className="font-bold text-lg">₹{total.toFixed(2)}</span>
                </div>
                <Link href="/checkout">
                  <Button className="w-full">Proceed to Checkout</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}