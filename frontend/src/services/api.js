import axios from 'axios'

export const uploadImage = async (imageFile, setStatus) => {
    try {
        const formData = new FormData()
        formData.append('file', imageFile)
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
        formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)

        //setStatus('Sending image to the server...','info')
        const res = await axios.post(import.meta.env.VITE_CLOUDINARY_BASE_URL, formData)
        // console.log(res)
        // console.log(res.data)

        const url = res.data.secure_url
        // console.log('Image uploaded:', url)
        //setStatus('Image uploaded successfully','success')
        return url
    } catch (error) {
        // console.error('Image upload failed:', error)
        setStatus(`Image upload failed: ${error.message}`, 'error')
        return ''
    }
}

export const createCoinInDB = async (coinData, setStatus) => {
    try {
        await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}api/coin/createCoin`,
            coinData
        )
        // console.log('Coin created:', res.data)
        setStatus('Coin created successfully!', 'success')
    } catch (error) {
        console.error('Coin creation failed:', error)
        setStatus(`Error: ${error.message}`, 'error')
    }
}
