'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Coffee, Sandwich, Utensils } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

interface Category {
  id: number
  name: string
  description: string
  icon: string
  items: Item[]
}

interface Item {
  id: number
  name: string
  description?: string
  price: number
  image?: string
}

export function MenuTabs() {
  const [categories, setCategories] = useState<Category[]>([])
  const { addToCart } = useCart()

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(setCategories)
  }, [])

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee': return <Coffee className="h-5 w-5" />
      case 'Burger': return <Sandwich className="h-5 w-5" />
      case 'Utensils': return <Utensils className="h-5 w-5" />
      default: return <Utensils className="h-5 w-5" />
    }
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Our Menu
      </motion.h2>
      <Tabs defaultValue="beverages" className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TabsTrigger value={category.name.toLowerCase().replace(' ', '-')} className="flex items-center gap-2 text-lg py-3" key={category.id}>
                  {getIcon(category.icon)}
                  {category.name}
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
        </motion.div>
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.name.toLowerCase().replace(' ', '-')} className="mt-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {category.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg overflow-hidden">
                    {item.image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    )}
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl text-gray-800">{item.name}</CardTitle>
                      <CardDescription className="text-gray-600">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <motion.p
                        className="text-3xl font-bold text-green-600"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        ₹{item.price.toFixed(2)}
                      </motion.p>
                    </CardContent>
                    <CardFooter>
                      <motion.div
                        className="w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={() => addToCart(item.id)}
                          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                        >
                          Add to Cart
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  )
}