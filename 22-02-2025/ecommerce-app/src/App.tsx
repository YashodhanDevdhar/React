
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './routes';
import { GlobalProvider } from './context/GlobalContext';


const App :React.FC = () => {

  return (
    <GlobalProvider>
      <div className="container">
        <AppRoutes />
      </div>
    </GlobalProvider>
  )
}

export default App
