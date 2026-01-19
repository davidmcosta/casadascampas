'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import { useStore } from "../components/lib/store"
import { LanguageSwitcher } from "./LanguageSwitcher"
import Logo from "./Logo"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { toggleCart, getTotalItems } = useStore()
  const totalItems = getTotalItems()
  const lang = pathname.split("/")[1] || "pt"

  useEffect(() => setMounted(true), [])
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    setScrolled(typeof window !== 'undefined' ? window.scrollY > 20 : false)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setIsOpen(false), [pathname])

  const labels = {
    pt: { home: "Início", about: "Sobre Nós", products: "Produtos", blog: "Blogue", contact: "Contacto" },
    en: { home: "Home", about: "About Us", products: "Products", blog: "Blog", contact: "Contact" }
  }
  const t = labels[lang] || labels['pt']

  const navLinks = [
    { href: `/${lang}`, label: t.home },
    { href: `/${lang}/about`, label: t.about },
    { href: `/${lang}/products`, label: t.products },
    { href: `/${lang}/blog`, label: t.blog },
    { href: `/${lang}/contact`, label: t.contact }
  ]

  const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )

  const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )

  return (
    <header
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-blackDark shadow-xl border-b border-white/10' : 'bg-blackDark shadow-lg'}`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center" aria-label="Home">
              <div className="transform transition-transform duration-200 hover:scale-105">
                <Logo alt="Logo da Casa das Campas" />
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-all duration-300 pb-1 px-2 py-1 hover:scale-105 border-b-2 ${pathname === link.href ? "text-amberVar border-amberVar" : "text-white border-transparent hover:text-amberVar hover:border-amberVar"}`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center space-x-2 ml-2 xl:ml-4">
              <button
                onClick={toggleCart}
                className="relative p-2 xl:p-3 text-white hover:text-amberVar transition-all duration-300 hover:bg-blackVar/50 rounded-lg group"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5 xl:w-6 xl:h-6 transition-transform duration-200 group-hover:scale-110" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amberVar text-white text-xs font-bold rounded-full w-5 h-5 xl:w-6 xl:h-6 flex items-center justify-center animate-pulse">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>
              <LanguageSwitcher className="hidden lg:flex" currentLocale={lang} />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 rounded-lg"
              aria-label="Toggle menu"
            >
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
<nav
  className={`
    lg:hidden absolute top-full left-0 w-full z-40
    flex flex-col items-center space-y-5
    border-t border-white/10
    bg-black/50 backdrop-blur-md text-white
    transition-all duration-300 ease-out
    ${isOpen 
      ? "opacity-100 translate-y-0 pointer-events-auto py-6" 
      : "opacity-0 -translate-y-3 pointer-events-none py-0"
    }
  `}
>
  {navLinks.map(link => (
    <Link
      key={link.href}
      href={link.href}
      onClick={() => setIsOpen(false)}
      className={`
        text-lg font-medium tracking-wide transition-colors
        ${pathname === link.href
          ? "text-amberVar"
          : "text-white hover:text-amberVar"
        }
      `}
    >
      {link.label}
    </Link>
  ))}

  <LanguageSwitcher className="flex mt-2" currentLocale={lang} />
</nav>


)}
    </header>
  )
}