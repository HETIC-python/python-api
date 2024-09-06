'use client'

// import { useState } from 'react'
import {
    PopoverGroup,
} from '@headlessui/react'
import { Link, useNavigate } from "react-router-dom";

export default function Layout({ userId, children }: { userId: any, children: React.ReactNode }) {
    //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navigate = useNavigate()
    return (
        <>
            <header className="bg-white">
                <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img alt="" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" className="h-8 w-auto" />
                        </a>
                    </div>
                    <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                        {userId === "" || userId === undefined ?
                            <>
                                <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">Singnup</Link>
                                <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">Login</Link>
                            </>
                            :
                            <>
                                <Link to={`/profil/${userId}`} className="text-sm font-semibold leading-6 text-gray-900">Infos</Link>
                                <Link to={`/profil/update/${userId}`} className="text-sm font-semibold leading-6 text-gray-900">Update</Link>
                            </>

                        }
                    </PopoverGroup>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">

                    { userId !== "" && userId !== undefined && 
                    <button className="text-sm font-semibold leading-6 text-gray-900" onClick={() => {
                        window.localStorage.removeItem('token');
                        navigate('/')

                    }}>Logout <span aria-hidden="true">&rarr;</span></button>
                  }
                                </div>

                </nav>
            </header>

            <div>
                {children}
            </div>
        </>
    )
}
