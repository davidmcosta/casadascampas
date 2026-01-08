"use client"

import { useEffect } from "react"
import { CheckCircle, X } from "lucide-react"

/**
 * @param {{ 
 *   message: string, 
 *   isVisible: boolean, 
 *   onClose: () => void, 
 *   type?: "success" | "error" | "info" 
 * }} props
 */
export default function Toast({ message, isVisible, onClose, type = "success" }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className="bg-blackVar border border-amberVar/20 rounded-lg p-4 shadow-lg max-w-sm">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-amberVar flex-shrink-0" />
          <p className="text-amberVar text-sm font-medium">{message}</p>
          <button
            onClick={onClose}
            className="ml-auto text-amberVar/60 hover:text-amberVar transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
