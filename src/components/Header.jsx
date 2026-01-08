"use client"

import { useState, useEffect,  } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, UserIcon } from "lucide-react"
import { useStore } from "../components/lib/store"
import { LanguageSwitcher } from "./LanguageSwitcher"

import Logo from "./Logo"

export default function Header () {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { toggleCart, getTotalItems } = useStore()
  const totalItems = getTotalItems()
const lang = pathname.split("/")[1];


  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    setScrolled(typeof window !== 'undefined' ? window.scrollY > 20 : false)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    closeMenu()
  }, [pathname])

  const labels = {
    pt: {
      home: "Início",
      about: "Sobre Nós",
      products: "Produtos",
      gallery: "Galeria",
      blog: "Blogue",
      contact: "Contacto"
    },
    en: {
      home: "Home",
      about: "About Us",
      products: "Products",
      gallery: "Gallery",
      blog: "Blog",
      contact: "Contact"
    }
  };

   const t = labels[lang] || labels['pt'];

  const navLinks = [
    { href: `/${lang}`, label: t.home },
    { href: `/${lang}/about`, label: t.about },
    { href: `/${lang}/products`, label: t.products },
    { href: `/${lang}/gallery`, label: t.gallery },
    { href: `/${lang}/blog`, label: t.blog },
    { href: `/${lang}/contact`, label: t.contact }
  ];





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

  const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  )

  return (
    <header
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "1.5",
        letterSpacing: "0.01em",
        WebkitFontSmoothing: "antialiased",
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-blackDark shadow-xl border-b border-white/10'
          : 'bg-blackDark shadow-lg'
      }`}
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-all duration-300 pb-1 border-b-2 px-2 py-1 hover:scale-105 ${
                  pathname === link.href
                    ? "text-amberVar border-amberVar"
                    : "text-white hover:text-amberVar border-transparent hover:border-amberVar"
                }`}
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
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amberVar text-white text-xs font-bold rounded-full w-5 h-5 xl:w-6 xl:h-6 flex items-center justify-center animate-pulse">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>
              <LanguageSwitcher className="hidden lg:flex" currentLocale={lang}/>
            </div>
          </nav>

          {/* Tablet Navigation */}
          <nav className="hidden md:flex lg:hidden items-center space-x-3">
            {navLinks.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-all duration-300 pb-1 border-b-2 px-2 py-1 ${
                  pathname === link.href
                    ? "text-amberVar border-amberVar"
                    : "text-white hover:text-amberVar border-transparent hover:border-amberVar"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center space-x-1">
              <LanguageSwitcher className="hidden md:flex lg:hidden" currentLocale={lang}/>
              <button
                onClick={toggleCart}
                className="relative p-2 text-white hover:text-amberVar transition-all duration-300 hover:bg-blackVar/50 rounded-lg group"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amberVar text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={toggleMenu}
                className="text-white hover:text-amberVar transition-colors duration-200 p-2"
                aria-label="More menu"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleCart}
              className="relative p-2 text-white hover:text-amberVar transition-all duration-300 hover:bg-blackVar/50 rounded-lg group"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amberVar text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            <button
              type="button"
              className="text-white hover:text-amberVar p-2 focus:outline-none transition-all duration-300 hover:bg-blackVar/50 rounded-lg"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <div className="transform transition-transform duration-200">
                {isOpen ? <CloseIcon /> : <MenuIcon />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-14 sm:top-16 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMenu}
          aria-hidden="true"
        />

        <div
          className={`relative bg-blackVar/95 backdrop-blur-md shadow-2xl border-b border-white/10 transform transition-transform duration-300 ${
            isOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="max-w-sm mx-auto px-4 py-6 space-y-3">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`block text-base font-medium px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${
                  pathname === link.href
                    ? "bg-amberVar/20 text-amberVar shadow-lg"
                    : "text-white hover:text-amberVar hover:bg-amberVar/10"
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                  animation: isOpen ? 'slideInDown 0.3s ease-out forwards' : 'none',
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Language Switcher */}
            <div className="px-4 py-3 border-t border-white/10">
              <p className="text-sm text-white/70 mb-2">Idioma/Language:</p>
              <LanguageSwitcher mobile currentLocale={lang}/>
            </div>

            {/* Mobile Contact Button */}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="flex items-center justify-center w-full bg-gradient-to-r from-amberVar to-amberhover hover:from-amberhover hover:to-amberVar text-blackDark px-6 py-4 rounded-lg text-base font-semibold transition-all duration-300 gap-3 mt-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              aria-label="Contact us"
            >
              <PhoneIcon />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 480px) {
          .max-w-sm {
            max-width: calc(100vw - 2rem);
          }
        }
      `}</style>
    </header>
  )
}
