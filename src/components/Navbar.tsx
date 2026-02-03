import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="/images/logo-transparent.png"
                alt="Almweiß Logo"
                width={180}
                height={180}
                className="h-[135px] w-auto object-contain"
                priority
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
