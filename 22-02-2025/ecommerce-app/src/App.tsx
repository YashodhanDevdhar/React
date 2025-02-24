
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './routes';
import { GlobalProvider } from './context/GlobalContext';
import Navbar from './components/Navbar';


const App :React.FC = () => {

  return (
    <GlobalProvider>
      <div className="container">
        <Navbar />
        <AppRoutes />
      </div>
    </GlobalProvider>
  )
}

export default App
