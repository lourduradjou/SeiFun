import React from 'react'

export default function Footer() {
    return (
        <footer className="md:max-w-[1200px] mx-auto rounded-lg bg-gradient-to-r from-fuchsia-600 to-purple-600 mb-[100px] mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-14 py-4 md:py-7 gap-4">
                <div>
                    <div className="font-extrabold self-center text-2xl text-white">
                        SEIFUN<span className="text-lg">.xyz</span>
                    </div>
                </div>
                <div className="hidden md:block">
                    <ul className="flex flex-row gap-5 text-white items-center text-lg font-medium tracking-wider font-montserrat">
                        <li>
                            <a href="/" className="underLight">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="/" className="underLight">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="/" className="underLight">
                                Licensing
                            </a>
                        </li>
                        <li>
                            <a href="/" className="underLight">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
