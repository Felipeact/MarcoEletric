import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-neutral-primary-soft mt-24">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="flex items-cente gap-1">

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

                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-heading uppercase">Follow us</h2>
                            <ul className="text-body font-medium">
                                <li className="mb-4">
                                    <a href="https://www.linkedin.com/in/marco-aur%C3%A9lio-95964615b/" target="_blank" className="hover:underline ">Linkedin</a>
                                </li>
                                <li>
                                    <a href="https://wa.me/5511960742500" target="_blank" className="hover:underline">WhatsApp</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-heading uppercase">Legal</h2>
                            <ul className="text-body font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-default sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-body sm:text-center">© {new Date().getFullYear()} LAB Studios. All rights reserved.
                    </span>

                </div>
            </div>
        </footer>



    );
}



