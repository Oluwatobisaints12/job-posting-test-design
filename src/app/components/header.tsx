"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "../components/ui/input"
import { Search, Menu, X } from "lucide-react"
import { cn } from "./lib/utils"
import { montserratBold } from "../../../fonts"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const renderNavigationLinks = () => (
    <>
      <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
        Home
      </Link>
      <Link href="/company" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
        Company
      </Link>
      <Link href="/resources" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
        Resources
      </Link>
      <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
        Contact us
      </Link>
      <Link href="/advertise" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
        Advertise
      </Link>
    </>
  );

  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto w-full max-w-[1355px] py-3">
        <div className="flex items-center ">
          {/* Logo */}
          <div className="flex-shrink-0 mr-auto">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/images/header-img.png"
                alt="Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden md:flex md:items-center md:space-x-6 lg:space-x-8  ${montserratBold.className}`}>
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/company" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Company
            </Link>
            <Link href="/resources" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Resources
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Contact us
            </Link>
            <Link href="/advertise" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Advertise
            </Link>
          </nav>

          {/* Search box - desktop */}
          <div className="hidden md:flex md:ml-[3.5rem] md:items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-white" />
              </div>
              <Input
                type="search"
                placeholder="Search"
                className="pl-10 w-[192px] h-[43px] rounded-[32px] bg-[#00000052] text-white placeholder:text-white  border-none"
              />
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
          <div className="pt-2 pb-3 space-y-1">
            {renderNavigationLinks()}
          </div>

          {/* Search box - mobile */}
          <div className="pt-2 pb-4 px-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-white" />
              </div>
              <Input
                type="search"
                placeholder="Search"
                className="pl-10 w-full md:w-[192px] h-[43px] rounded-[32px] bg-[#00000052] text-white placeholder:text-white border-none"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
