import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <Toaster
        toastOptions={{
          classNames: {
          success: 'bg-green-400 border-columnBackgroundColor'
        }
      }}
    />
  </>
)
