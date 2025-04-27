import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
// styles & services imports
import './App.css'
import './services/walletConnection.jsx'
// redux folder imports
import store from './redux/store.js'
import { SkeletonTheme } from 'react-loading-skeleton'
import Loader from './components/ui/Loader'

// lazy imports
const CreateCoins = lazy(() => import('./pages/CreateCoins'))
const Homepage = lazy(() => import('./pages/Homepage'))
const CoinDetails = lazy(() => import('./pages/CoinDetails'))
const WalletConnect = lazy(() => import('./components/Wallet/WalletConnect.jsx'))
const Layout = lazy(() => import('./components/ui/Layout.jsx'))
const UserTransactionTable = lazy(() => import('./components/Transaction/UserTransactionTable.jsx'))
const Toast = lazy(() => import('./components/ui/Toast.jsx'))
const ErrorFallback = lazy(() => import('./components/Errors/ErrorFallBack.jsx'))

function App() {
    return (
        <Provider store={store}>
            <SkeletonTheme baseColor="#a571d9" highlightColor="#f51cb27a">
                <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            <Route element={<Layout />}>
                                <Route path="/" element={<Homepage />} />
                                <Route path="/coin/:id" element={<CoinDetails />} />
                                <Route path="/addCoins" element={<CreateCoins />} />
                                <Route path="/wallet" element={<WalletConnect />} />
                                <Route
                                    path="/userTransactions"
                                    element={<UserTransactionTable />}
                                />
                            </Route>
                        </Routes>
                        <Toast />
                    </Suspense>
                </ErrorBoundary>
            </SkeletonTheme>
        </Provider>
    )
}

export default App
