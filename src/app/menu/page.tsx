'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCart } from '@/hooks/useCart'
import { Star, Clock, ChefHat, Plus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Item {
  id: number
  name: string
  description?: string
  price: number
  image?: string
  categoryId: number
}

interface Category {
  id: number
  name: string
  description?: string
  icon?: string
  items: Item[]
}

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(setCategories)
      .finally(() => setLoading(false))
  }, [])

  const getCategoryIcon = (categoryId: number) => {
    switch (categoryId) {
      case 1: return '☕'
      case 2: return '🍔'
      case 3: return '👨‍🍳'
      default: return '🍽️'
    }
  }

  const getCategoryColor = (categoryId: number) => {
    switch (categoryId) {
      case 1: return 'from-blue-500 to-cyan-500'
      case 2: return 'from-orange-500 to-red-500'
      case 3: return 'from-green-500 to-emerald-500'
      default: return 'from-purple-500 to-pink-500'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Menu</h1>
            <p className="text-gray-600">Explore our complete collection of delicious dishes</p>
          </div>

          {/* Menu Tabs */}
          <Tabs defaultValue={categories[0]?.id.toString()} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id.toString()}
                  className="flex items-center gap-2"
                >
                  <span className="text-lg">{getCategoryIcon(category.id)}</span>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id.toString()}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Category Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                      <div className="text-4xl">{getCategoryIcon(category.id)}</div>
                      <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                        {category.name}
                      </Badge>
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
                      {category.name}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                      {category.description}
                    </p>
                  </div>

                  {/* Items Grid */}
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {category.items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="group"
                      >
                        <Card className="h-full hover:shadow-2xl transition-all duration-300 border border-gray-100 shadow-lg overflow-hidden bg-white hover:bg-gray-50/50 mx-2">
                          {/* Image Section - Full Top */}
                          {item.image && (
                            <div className="relative h-72 overflow-hidden bg-gray-50 rounded-t-xl">
                              <motion.img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 rounded-t-xl"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-t-xl" />

                              {/* Category Badge */}
                              <div className="absolute top-4 left-4">
                                <Badge className={`bg-gradient-to-r ${getCategoryColor(category.id)} text-white font-medium px-3 py-1 text-xs shadow-lg`}>
                                  {getCategoryIcon(category.id)} {category.name}
                                </Badge>
                              </div>

                              {/* Price Badge */}
                              <div className="absolute top-4 right-4">
                                <Badge variant="secondary" className="bg-white/95 text-gray-800 font-bold px-3 py-1 text-sm shadow-lg">
                                  ₹{item.price.toFixed(2)}
                                </Badge>
                              </div>

                              {/* Title Overlay */}
                              <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 drop-shadow-lg">
                                  {item.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-medium text-white">4.9</span>
                                  </div>
                                  <span className="text-xs text-white/80">•</span>
                                  <span className="text-xs text-white/80">12-15 min</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Content Section - Compact */}
                          <div className="p-3">
                            {/* Description */}
                            {item.description && (
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2 leading-relaxed">
                                {item.description}
                              </p>
                            )}

                            {/* Features */}
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Fresh Daily
                              </span>
                              <span className="flex items-center gap-1">
                                <ChefHat className="h-3 w-3" />
                                Expert Made
                              </span>
                            </div>

                            {/* Add to Cart Button */}
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                onClick={() => addToCart(item.id)}
                                className={`w-full bg-gradient-to-r ${getCategoryColor(category.id)} hover:opacity-90 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2`}
                              >
                                <Plus className="h-4 w-4" />
                                Add to Cart
                              </Button>
                            </motion.div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>

                  {category.items.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">🍽️</div>
                      <h3 className="text-xl font-semibold mb-2">No items available</h3>
                      <p className="text-gray-600">Check back later for new dishes!</p>
                    </div>
                  )}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}