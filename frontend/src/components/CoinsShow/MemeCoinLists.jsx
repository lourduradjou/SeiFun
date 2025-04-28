// src/components/HackathonLists.js
import React, { useEffect, useState } from 'react'
import MemeCoinCard from './MemeCoinCard'
import axios from 'axios'
import GlowButton from '../ui/GlowButton'
import { useSelector } from 'react-redux'
import { ReactTyped } from 'react-typed'
import { fetchAllProjects } from '@/constants/factoryconfig.js'

import { BsTwitterX } from 'react-icons/bs'
import { FaGithub } from 'react-icons/fa'
import { AiFillYoutube } from 'react-icons/ai'
import { BiLogoTelegram } from 'react-icons/bi'
import SkeletanCard from '../ui/SkeletanCard'
import { ExchangeIcon, TokenIcon } from '@web3icons/react'
import { MdOutlineFeedback } from 'react-icons/md'
import { showToast } from '../ui/Toast'

export default function MemeCoinLists() {
    const [memeCoins, setMemeCoins] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const searchQuery = useSelector((state) => state.search.query) // Get the search query from Redux

    const fetchBackendCoins = async () => {
        try {
            const backendRes = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}api/coin/getCoins`
            )
            return backendRes.data // Returns the coins from MongoDB
        } catch (error) {
            showToast(`Error fetching coins from backend: ${error.message}`, 'error')
            ///console.error('Error fetching coins from backend:', err)
            return []
        }
    }
    const fetchChainData = async () => {
        const data = await fetchAllProjects()

        // Debug: Log raw contract data
        //console.log('Fetched projects from contract:', data)

        // Format the raw on-chain project data (if needed)
        const formatted = data.map((coin) => ({
            coin_name: coin.name,
            ticker: coin.symbol,
            token: coin.token,
        }))

        return formatted
    }

    const mergeData = async () => {
        const backendCoins = await fetchBackendCoins()
        const onChainData = await fetchChainData()

        // Create a hash map for fast lookup using token as key
        const onChainMap = {}
        for (const coin of onChainData) {
            onChainMap[coin.token] = coin
        }

        const enrichedCoins = []

        for (let coin of backendCoins) {
            const {
                token,
                marketplace,
                walletaddress,
                description,
                path,
                x_link,
                tele_link,
                website_link,
            } = coin

            const onCoin = onChainMap[token]
            if (onCoin) {
                enrichedCoins.push({
                    ...onCoin,
                    marketplace,
                    walletaddress,
                    description,
                    path,
                    x_link,
                    tele_link,
                    website_link,
                    createdAt: coin.createdAt,
                })
            }
        }

        // Sort by createdAt in descending order
        return enrichedCoins.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    }

    useEffect(() => {
        const initialFetch = async () => {
            setMemeCoins(await mergeData())
            setIsFetching(false)
        }

        initialFetch()
    }, [])

    // Filter memeCoins based on the search query
    const filteredMemeCoins = searchQuery
        ? memeCoins.filter(
              (coin) =>
                  coin.coin_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  coin.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  coin.description.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : memeCoins

    //console.log(memeCoins)
    return (
        <div className="text-white md:max-w-[1200px] w-full mx-auto min-h-screen">
            <div className="sm:px-12 px-6 mx-auto xl:px-0 my-4 flex justify-between space-x-4 items-center border-b-2 border-gray-200 border-opacity-20 mb-2 md:mb-12">
                <div className="hidden xl:flex xl:space-x-4 flex-wrap mx-auto xl:flex-col">
                    <div className="flex justify-center mb-6 space-x-8 items-center">
                        <div className="hover:text-blue-500 duration-300">
                            <a
                                href="https://x.com/SeiFunAI"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <BsTwitterX size={28} />
                            </a>
                        </div>
                        <div className="hover:text-blue-500 duration-300">
                            <a
                                href="https://github.com/mohitgit-hub/SeiFun"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGithub size={28} />
                            </a>
                        </div>
                        <div className="hover:text-blue-500 duration-300">
                            <a
                                href="https://t.me/SeiFunAI"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <BiLogoTelegram size={28} />
                            </a>
                        </div>
                        <div className="hover:text-blue-500 duration-300">
                            <a
                                href="https://www.youtube.com/watch?v=EI7vDf_F7i8"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <AiFillYoutube size={30} />
                            </a>
                        </div>
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <div className="mb-4 xl:mb-0 mx-4 xl:mx-0">
                            <GlowButton path="/" text="Existing Coins" color={'pink'}>
                                <TokenIcon symbol="sei" variant="mono" size="24" color="#FFFFFF" />
                            </GlowButton>
                        </div>
                        <div className="mb-4 xl:mb-0 mx-4 xl:mx-0">
                            <GlowButton path="/userTransactions" text="My Transactions">
                                <ExchangeIcon
                                    id="gemini"
                                    variant="mono"
                                    size="24"
                                    color="#FFFFFF"
                                />{' '}
                            </GlowButton>
                        </div>
                        <div className="mb-4 xl:mb-0 mx-4 xl:mx-0">
                            <a href="/form.html" target="_blank" rel="noopener noreferrer">
                                <GlowButton text="Feedback">
                                    <MdOutlineFeedback size={20} />
                                </GlowButton>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center max-w-2xl mb-4">
                    <div className="flex-1 font-poppins text-center  font-bold pr-2">
                        <div className="text-wrap text-4xl mr-2 mb-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
                            Deploy your Tokens{' '}
                            <span className="hidden md:inline-block">With</span>{' '}
                        </div>
                        <div className=" mb-4">
                            <span className="hidden md:inline-block text-sky-500 text-xl font-montserrat">
                                OUR 💪NO CODE
                                <span className="text-slate-100">
                                    {' '}
                                    SEIFUN<span className="text-sm text-blue-500">.xyz</span> 👉
                                </span>
                            </span>
                            <span className="text-xl ml-2">
                                <ReactTyped
                                    className="text-md text-center font-bold"
                                    strings={[
                                        'Easy😄 To Create😎',
                                        'AI🔭 Generation!🤞',
                                        'Faster⏩ Deployment',
                                        'Secure🔐 Creation',
                                    ]}
                                    typeSpeed={30}
                                    backSpeed={30}
                                    loop
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-2xl border-b-2 border-opacity-20 border-gray-200 text-center font-bold md:hidden tracking-widest mb-6 pb-3">
                Existing Coins
            </div>
            <div className="flex flex-wrap gap-8 justify-center max-w-[1200px] mx-auto">
                {isFetching ? (
                    <SkeletanCard count={16} />
                ) : (
                    filteredMemeCoins.map((event, index) => (
                        <MemeCoinCard
                            key={index}
                            token={event.token}
                            createdAt={event.createdAt}
                            description={event.description}
                            imageUrl={event.path}
                            x_link={event.x_link}
                            tele_link={event.tele_link}
                            website_link={event.website_link}
                            tokenName={event.coin_name}
                            ticker={event.ticker}
                            creator={event.walletaddress}
                            marketplace={event.marketplace}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
