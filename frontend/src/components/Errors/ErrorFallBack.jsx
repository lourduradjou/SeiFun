// simple fallback component
function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div role="alert" style={{ padding: '20px', textAlign: 'center' }}>
            <p>Something went wrong 😢</p>
            <pre style={{ color: 'red' }}>{error.message}</pre>
            <button onClick={resetErrorBoundary} style={{ marginTop: '10px' }}>
                Try again
            </button>
        </div>
    )
}

export default ErrorFallback
