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
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
              className="group"
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 shadow-xl overflow-hidden bg-white/80 backdrop-blur-sm">
                {item.image && (
                  <div className="relative h-64 overflow-hidden rounded-t-xl">
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-all duration-700 rounded-t-xl"
                      animate={{
                        scale: hoveredItem === item.id ? 1.1 : 1,
                        filter: hoveredItem === item.id ? 'brightness(1.1) contrast(1.05)' : 'brightness(1) contrast(1)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-t-xl" />

                    {/* Floating badges */}
                    <motion.div
                      className="absolute top-4 left-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: hoveredItem === item.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Badge className="bg-white/90 text-gray-800 font-semibold px-3 py-1">
                        Popular
                      </Badge>
                    </motion.div>

                    <motion.div
                      className="absolute top-4 right-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: hoveredItem === item.id ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <Badge className={`bg-gradient-to-r ${getCategoryColor()} text-white font-semibold px-3 py-1`}>
                        Premium
                      </Badge>
                    </motion.div>

                    {/* Enhanced image overlay with subtle effects */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-xl"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>
                )}

                <CardHeader className="pb-4 relative">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-2xl text-gray-800 group-hover:text-gray-900 transition-colors">
                      {item.name}
                    </CardTitle>
                    <motion.div
                      className="text-3xl font-bold"
                      animate={{
                        scale: hoveredItem === item.id ? 1.1 : 1,
                        color: hoveredItem === item.id ? '#16a34a' : '#16a34a'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      ${item.price.toFixed(2)}
                    </motion.div>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      4.9
                    </span>
                    <span>12-15 min</span>
                    <span>Free delivery</span>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <motion.div
                    className="w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => addToCart(item.id)}
                      className={`w-full bg-gradient-to-r ${getCategoryColor()} hover:opacity-90 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl`}
                    >
                      Add to Cart • ${item.price.toFixed(2)}
                    </Button>
                  </motion.div>
                </CardFooter>
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
          <p className="text-gray-600 mb-4">Love our {title.toLowerCase()}? Check out our other categories!</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              className="px-8 py-3 rounded-full border-2 hover:border-gray-400 transition-colors"
            >
              View All Categories
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}