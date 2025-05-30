import React from 'react'

export default function FormaticWalletButton() {
    return (
        <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
            <svg
                aria-hidden="true"
                class="h-4"
                viewBox="0 0 96 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M72.0998 0.600098H48.3998H24.5998H0.799805V24.4001V48.2001V49.7001V71.8001V71.9001V95.5001H24.5998V72.0001V71.9001V49.8001V48.3001V24.5001H48.3998H72.1998H95.9998V0.700104H72.0998V0.600098Z"
                    fill="#617BFF"
                />
                <path
                    d="M48.5 71.8002H72.1V95.6002H73C79.1 95.6002 84.9 93.2002 89.2 88.9002C93.5 84.6002 95.9 78.8002 95.9 72.7002V48.2002H48.5V71.8002Z"
                    fill="#617BFF"
                />
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Fortmatic</span>
        </div>
    )
}
