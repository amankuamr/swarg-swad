'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/hooks/useCart'
import { Star, Clock, ChefHat, Plus } from 'lucide-react'

interface Item {
  id: number
  name: string
  description?: string
  price: number
  image?: string
}

interface MenuSectionProps {
  categoryId: number
  title: string
  subtitle: string
  backgroundColor?: string
}

export function MenuSection({ categoryId, title, subtitle, backgroundColor = "bg-white" }: MenuSectionProps) {
  const [items, setItems] = useState<Item[]>([])
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    fetch(`/api/items/${categoryId}`)
      .then(res => res.json())
      .then(setItems)
  }, [categoryId])

  const getCategoryIcon = () => {
    switch (categoryId) {
      case 1: return '☕'
      case 2: return '🍔'
      case 3: return '👨‍🍳'
      default: return '🍽️'
    }
  }

  const getCategoryColor = () => {
    switch (categoryId) {
      case 1: return 'from-blue-500 to-cyan-500'
      case 2: return 'from-orange-500 to-red-500'
      case 3: return 'from-green-500 to-emerald-500'
      default: return 'from-purple-500 to-pink-500'
    }
  }

  return (
    <section className={`py-20 ${backgroundColor} relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-4xl">{getCategoryIcon()}</div>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              Premium Quality
            </Badge>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="flex justify-center items-center gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>4.8 Rating</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Fresh Daily</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ChefHat className="h-4 w-4" />
              <span>Expert Chefs</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {items.slice(0, 6).map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
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
                      <Badge className={`bg-gradient-to-r ${getCategoryColor()} text-white font-medium px-3 py-1 text-xs shadow-lg`}>
                        {getCategoryIcon()} {categoryId === 1 ? 'Beverage' : categoryId === 2 ? 'Fast Food' : 'Cuisine'}
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
                      className={`w-full bg-gradient-to-r ${getCategoryColor()} hover:opacity-90 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2`}
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

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-4">Want to see more delicious options?</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              className="px-8 py-3 rounded-full border-2 hover:border-orange-400 hover:text-orange-600 transition-colors"
              onClick={() => window.location.href = '/menu'}
            >
              View All Items
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}