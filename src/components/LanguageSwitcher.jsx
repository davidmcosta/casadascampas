"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { ChevronDown, Globe } from "lucide-react"

const languages = [
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "en", name: "English", flag: "🇺🇸" },
]

export const LanguageSwitcher = ({ currentLocale, mobile = false, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const dropdownRef = useRef(null)

  const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0]

  const switchLanguage = (newLocale) => {
    const segments = pathname.split("/")
    segments[1] = newLocale
    const newPath = segments.join("/")
    router.push(newPath)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (mobile) {
    return (
      <div className={`flex flex-col space-y-3 w-full ${className}`}>
        <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
          Select Language
        </div>
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => switchLanguage(language.code)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
              language.code === currentLocale
                ? "bg-amberVar/20 text-amberVar"
                : "text-white hover:bg-white/10"
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <span>{language.name}</span>
          </button>
        ))}
      </div>
    )
  }

  // Tablet/Desktop version
  return (
    <div 
      ref={dropdownRef}
      className={`relative inline-block text-left ${className}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between space-x-2 px-3 py-2 
          text-sm transition-colors duration-200 rounded-lg
          hover:bg-blackVar/50
          ${isOpen ? 'text-amberVar' : 'text-white hover:text-amberVar'}
        `}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4" />
          {/* Show full name on desktop, flag on tablet */}
          <span className="hidden lg:inline">{currentLanguage.name}</span>
          <span className="lg:hidden">{currentLanguage.flag}</span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`
          absolute right-0 mt-2 w-48 bg-blackVar backdrop-blur-md 
          rounded-lg shadow-xl border border-white/10 z-50
          origin-top-right transition-all duration-100
        `}>
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => switchLanguage(language.code)}
                className={`
                  w-full text-left px-4 py-2 text-sm flex items-center space-x-3
                  transition-colors duration-150
                  ${
                    language.code === currentLocale
                      ? "bg-amberVar/20 text-amberVar"
                      : "text-white hover:bg-white/10"
                  }
                `}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}