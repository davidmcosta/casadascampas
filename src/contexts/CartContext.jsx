"use client"

import  React, { useContext } from "react"
import { createContext, useReducer } from "react"


const CartContext = createContext(null)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context // { state, dispatch }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.product._id === action.payload._id)

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.product._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item,
        )
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalAmount: state.totalAmount + action.payload.price,
        }
      } else {
        const newItem = { product: action.payload, quantity: 1 }
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalAmount: state.totalAmount + action.payload.price,
        }
      }
    }

    case "REMOVE_ITEM": {
      const itemToRemove = state.items.find((item) => item.product._id === action.payload)
      if (!itemToRemove) return state

      const updatedItems = state.items.filter((item) => item.product._id !== action.payload)
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems - itemToRemove.quantity,
        totalAmount: state.totalAmount - itemToRemove.product.price * itemToRemove.quantity,
      }
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((item) => {
        if (item.product._id === action.payload.id) {
          const quantityDiff = action.payload.quantity - item.quantity
          return { ...item, quantity: action.payload.quantity }
        }
        return item
      })

      const newTotalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
      const newTotalAmount = updatedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

      return {
        ...state,
        items: updatedItems,
        totalItems: newTotalItems,
        totalAmount: newTotalAmount,
      }
    }

    case "CLEAR_CART":
      return {
        items: [],
        totalItems: 0,
        totalAmount: 0,
      }

    default:
      return state
  }
}

export function CartProvider({ children, lang }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalAmount: 0,
  })

  return (
    <CartContext.Provider value={{ state, dispatch ,  lang }}>
      {children}
    </CartContext.Provider>
  )
}

