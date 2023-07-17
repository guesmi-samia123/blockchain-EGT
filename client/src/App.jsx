import {Navbar, Footer, Services, Transactions, Welcomee, Loader} from './Components';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import DeliveryPage from './Components/DeliveryPage';
import PendingTransaction from './Components/PendingTransaction';

const App = () => (
  <Router>
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcomee />
      </div>
      <Services />
      
      <Transactions />
      <PendingTransaction />
      <DeliveryPage />
      
      
      <Footer />
    </div>
    
  </Router>
);


export default App;
