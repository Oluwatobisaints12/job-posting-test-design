import React from 'react'
import Image from 'next/image'
import { montserratBold, montserratMedium } from '../../../fonts'
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#282828] w-full px-4 sm:px-6 md:pl-[3.75rem] py-6 md:py-[1.8125rem]">
      <div className="max-w-[1362px] w-full mx-auto">
        {/* Main footer content */}
        <div className="flex flex-col">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <Image
              src="/assets/images/footer-africa.png"
              alt="Africa Business Radio"
              width={140}
              height={64}
              className="h-16 w-auto"
            />
          </div>

          {/* Navigation and social icons */}
          <div className="flex flex-col lg:flex-row lg:items-center mt-6 md:mt-[3.0625rem]">
            <nav className="w-full lg:w-auto overflow-x-auto">
              <ul className="flex flex-nowrap lg:flex-wrap whitespace-nowrap">
                <li className="flex items-center">
                  <Link
                    href="/"
                    className={`${montserratBold.className} text-[#C9C9C9] text-[1rem] hover:text-white transition-colors`}
                  >
                    HOME
                  </Link>
                  <span className="hidden sm:block h-[34px] bg-[#C9C9C9] w-[1.5px] border border-gray-300 mx-[12px] md:mx-[24px]"></span>
                </li>
                <li className="flex items-center">
                  <Link
                    href="/about"
                    className={`${montserratBold.className} text-[#C9C9C9] text-[1rem] hover:text-white transition-colors`}
                  >
                    ABOUT US
                  </Link>
                  <span className="hidden sm:block h-[34px] bg-[#C9C9C9] w-[1.5px] border border-gray-300 mx-[12px] md:mx-[24px]"></span>
                </li>
                <li className="flex items-center">
                  <Link
                    href="/contact"
                    className={`${montserratBold.className} text-[#C9C9C9] text-[1rem] hover:text-white transition-colors`}
                  >
                    CONTACT US
                  </Link>
                  <span className="hidden sm:block h-[34px] bg-[#C9C9C9] w-[1.5px] border border-gray-300 mx-[12px] md:mx-[24px]"></span>
                </li>
                <li className="flex items-center">
                  <Link
                    href="/podcasts"
                    className={`${montserratBold.className} text-[#C9C9C9] text-[1rem] hover:text-white transition-colors`}
                  >
                    ALL PODCAST
                  </Link>
                  <span className="hidden sm:block h-[34px] bg-[#C9C9C9] w-[1.5px] border border-gray-300 mx-[12px] md:mx-[24px]"></span>
                </li>
                <li className="flex items-center">
                  <Link
                    href="/advertise"
                    className={`${montserratBold.className} text-[#C9C9C9] text-[1rem] hover:text-white transition-colors`}
                  >
                    ADVERTISE
                  </Link>
                  <span className="hidden sm:block h-[34px] bg-[#C9C9C9] w-[1.5px] border border-gray-300 mx-[12px] md:mx-[24px]"></span>
                </li>
                <li className="flex items-center">
                  <Link
                    href="/resources"
                    className={`${montserratBold.className} text-[#C9C9C9] text-[1rem] hover:text-white transition-colors`}
                  >
                    RESOURCES
                  </Link>
                  <span className="hidden sm:block h-[34px] bg-[#C9C9C9] w-[1.5px] border border-gray-300 mx-[12px] md:mx-[24px]"></span>
                </li>
                <li className="flex items-center">
                  <Link
                    href="/connect"
                    className={`${montserratBold.className} text-[#C9C9C9] text-[1rem] hover:text-white transition-colors`}
                  >
                    CONNECT WITH ABR
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Social media icons */}
            <div className="flex flex-row items-center gap-2 mt-6 lg:mt-0 lg:ml-[10px]">
              <Link href="#" className="text-white hover:text-[#C9C9C9] transition-colors">
                <Image src="/footer-insta.svg" alt="Instagram" width={24} height={24} />
              </Link>
              <Link href="#" className="text-white hover:text-[#C9C9C9] transition-colors">
                <Image src="/footer-facebook.svg" alt="Facebook" width={24} height={24} />
              </Link>
              <Link href="#" className="text-white hover:text-[#C9C9C9] transition-colors">
                <Image src="/footer-tweeter.svg" alt="Twitter" width={24} height={24} />
              </Link>
              <Link href="#" className="text-white hover:text-[#C9C9C9] transition-colors">
                <Image src="/footer.svg" alt="Social Media" width={24} height={24} />
              </Link>
              <Link href="#" className="text-white hover:text-[#C9C9C9] transition-colors">
                <Image src="/footer-linkedin.svg" alt="LinkedIn" width={24} height={24} />
              </Link>
            </div>
          </div>

          {/* Copyright and legal links */}
          <div className="flex flex-col sm:flex-row sm:items-center text-white mt-6 md:mt-[3.0625rem]">
            <div className="flex items-center mb-3 sm:mb-0">
              <span className="w-[5px] h-[5px] rounded-full bg-white mr-[8px]"></span>
              <span className={`${montserratMedium.className} text-[14px] mr-[2.5rem] sm:mr-[2rem]`}>
                © Copyright 2021. All Rights Reserved.
              </span>
            </div>
            <div className="flex gap-4">
              <Link
                href="/terms"
                className={`${montserratMedium.className} text-[14px] hover:text-white transition-colors`}
              >
                Terms & conditions
              </Link>
              <Link
                href="/privacy"
                className={`${montserratMedium.className} text-[14px] hover:text-white transition-colors`}
              >
                Privacy policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

