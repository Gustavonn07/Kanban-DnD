import './style/App.css'
import Kanban_Board from './components/Kanban_Board'
import { Toaster } from 'sonner'


function App() {

  return (
    <>
      <Kanban_Board />
      <Toaster
        toastOptions={{
            classNames: {
            success: 'bg-green-400 border-columnBackgroundColor'
          }
        }}
      />
    </>
  )
}

export default App
