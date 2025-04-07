import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#474747] text-white py-16 ">
      <div className="container mx-auto px-4 flex flex-col justify-between">
        <div className="flex flex-wrap justify-between gap-1">
          {/* Logo and Description */}
          <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image src="/Logo2.svg" alt="Bistro Bliss Logo" width={250} height={250} />
            </Link>
            <p className="text-sm text-gray-400 mb-6 pr-10">
              In the new era of technology we look a in the future with certainty and pride to for our company and.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="bg-primary p-2 rounded-full hover:bg-primary-dark duration-300">
                <FaTwitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="bg-primary p-2 rounded-full hover:bg-primary-dark duration-300">
                <FaFacebookF className="w-5 h-5" />
              </Link>
              <Link href="#" className="bg-primary p-2 rounded-full hover:bg-primary-dark duration-300">
                <FaInstagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="bg-primary p-2 rounded-full hover:bg-primary-dark duration-300">
                <FaGithub className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Pages */}
          <div className="w-full sm:w-1/2 lg:w-1/5 mb-8 lg:mb-0">
            <h3 className="text-lg font-semibold mb-4">Pages</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Menu', 'Pricing', 'Blog', 'Contact', 'Delivery'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Utility Pages */}
          <div className="w-full sm:w-1/2 lg:w-1/5 mb-8 lg:mb-0">
            <h3 className="text-lg font-semibold mb-4">Utility Pages</h3>
            <ul className="space-y-2">
              {[
                'Start Here',
                'Styleguide',
                'Password Protected',
                '404 Not Found',
                'Licenses',
                'Changelog',
                'View More',
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Instagram Feed */}
          <div className="w-full lg:w-1/3 flex flex-col items-start">
            <h3 className="text-lg font-semibold mb-4 ">Follow Us On Instagram</h3>
            <div className="grid grid-cols-2 gap-4">
              <Image src="/footer/footerPic1.jpg" alt="Instagram post 1" width={200} height={200} className="rounded-lg" />
              <Image src="/footer/footerPic2.jpg" alt="Instagram post 2" width={200} height={200} className="rounded-lg" />
              <Image src="/footer/footerPic3.jpg" alt="Instagram post 3" width={200} height={200} className="rounded-lg" />
              <Image src="/footer/footerPic4.jpg" alt="Instagram post 4" width={200} height={200} className="rounded-lg" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[#393939] text-center text-sm text-gray-400">
          <p>Copyright © {new Date().getFullYear()} Hashtag Developer. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}