import './style/App.css';
import Kanban_Board from './components/Kanban_Board';
import { Toaster } from 'sonner';
import Footer from './components/geral.Footer';

function App() {
  // Código autoral de Gustavonn07 - Gustavo Nepomuceno Nogueira

  return (
    <>
      <Kanban_Board />
      <Toaster
        toastOptions={{
            classNames: {
            success: 'bg-green-400 border-columnBackgroundColor',
            error: 'bg-rose-500 border-columnBackgroundColor text-gray-200'
          }
        }}
      />
      <Footer />
    </>
  )
}

export default App;
