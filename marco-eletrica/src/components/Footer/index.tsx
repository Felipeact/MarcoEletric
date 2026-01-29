import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-white text-black text-xl mt-8">
            <div className=" mx-auto px-12 py-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-8">
                    {/* Logo */}
                    <div className="flex gap-2 ">
                        <span className="sm:block text-xl font-bold">
                            Marc
                        </span>

                        <Image
                            src="/raio-logo.svg"
                            alt="Logo"
                            width={20}
                            height={20}
                            priority
                        />

                        <span className="sm:block text-xl font-bold">
                            Eletrica
                        </span>
                    </div>

                    {/* Links Section */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full">
                        <div>
                            <h4 className="font-semibold mb-2 ">Contact</h4>
                            <p>Email: <Link href="junior.aurelio@hotmail.com" className="text-blue-600 block overflow-hidden text-clip">junior.aurelio@hotmail.com</Link></p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Social</h4>
                            <p><Link href="https://www.linkedin.com/in/marco-aur%C3%A9lio-95964615b/" target="_blank" className="text-black">LinkedIn</Link></p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">More</h4>
                            <p><Link href="/#about" className="text-black">About Me</Link></p>
                            <p><Link href="https://wa.me/5511960742500" className="text-black">Contact Us</Link></p>
                        </div>
                    </div>
                </div>

                
                <div className="mt-16 flex flex-col sm:flex-row sm:justify-between sm:items-center border-t pt-6">
                    <div className="text-xl text-black text-center text-xs sm:text-right">
                        © {new Date().getFullYear()} LAB Studios. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}