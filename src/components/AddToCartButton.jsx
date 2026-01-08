"use client"

import { useState } from "react"
import { useCart } from "../app/contexts/CartContext"
import { ShoppingBag, Check } from "lucide-react"



export default function AddToCartButton({ product }) {
  const { dispatch } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product })
    setIsAdded(true)

   

    // Reset the button state after 2 seconds
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full flex items-center justify-center space-x-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
        isAdded ? "bg-amberVar text-white" : "bg-amberVar] text-blackVar hover:bg-amberhover"
      }`}
    >
      {isAdded ? (
        <>
          <Check className="w-5 h-5" />
          <span>Added to Order</span>
        </>
      ) : (
        <>
          <ShoppingBag className="w-5 h-5" />
          <span>Add to Order</span>
        </>
      )}
    </button>
  )
}
