'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, Menu, Package, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart'

export function Navbar() {
  const { cartItems } = useCart()

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Swarg Swad
            </Link>
          </motion.div>
          <div className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/menu">
                <Button variant="ghost" className="text-gray-700 hover:text-orange-600 hover:bg-orange-50 font-medium px-4 py-2 rounded-lg transition-all duration-200">
                  Menu
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/admin">
                <Button variant="ghost" size="icon" className="text-gray-700 hover:text-orange-600 hover:bg-orange-50 w-10 h-10 rounded-lg transition-all duration-200">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/orders">
                <Button variant="ghost" size="icon" className="text-gray-700 hover:text-orange-600 hover:bg-orange-50 w-10 h-10 rounded-lg transition-all duration-200">
                  <Package className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon" className="text-gray-700 hover:text-orange-600 hover:bg-orange-50 w-10 h-10 rounded-lg transition-all duration-200 relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <motion.span
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    >
                      {cartItems.length}
                    </motion.span>
                  )}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}