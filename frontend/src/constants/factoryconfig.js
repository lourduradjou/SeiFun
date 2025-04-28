import { ethers } from 'ethers'
import factoryABI from './factory.json'
import { showToast } from '@/components/ui/Toast'

const factoryAddress = import.meta.env.VITE_FACTORY_ADDRESS
const RPC_URL = import.meta.env.VITE_RPC_URL

// For write transactions using MetaMask
export async function getFactoryContractWithSigner() {
    if (!window.ethereum) {
        throw new Error('MetaMask is not installed')
    }

    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()

        return new ethers.Contract(factoryAddress, factoryABI, signer)
    } catch (error) {
        showToast(`Error connecting to wallet or contract: ${error.message}`, 'error')
        //console.error('Error connecting to wallet or contract:', err)
    }
}

// For read-only contract interaction
export function getFactoryContractReadOnly() {
    const rpcUrl = RPC_URL
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl)

    return new ethers.Contract(factoryAddress, factoryABI, provider)
}

// Fetch all created meme coin projects
export async function fetchAllProjects() {
    try {
        const contract = getFactoryContractReadOnly()
        const projects = await contract.getAllProjects()
        return projects
    } catch (err) {
        console.error('Error fetching projects:', err)
        return []
    }
}
