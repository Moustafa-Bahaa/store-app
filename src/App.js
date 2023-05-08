import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/mdc-light-indigo/theme.css";
import { useTranslation } from "react-i18next";
import "./styles/shared.css"
import './App.css';
import AllStoresTable from './components/store/all-stores/all-stores-table';
import Header from "./components/header/Header";

function App() {

 const { i18n } = useTranslation();
 document.body.dir = i18n.dir();

  return (
    <div className="App">
      <div>
        <Header/>
      </div>
      <div className="store-container">
      <AllStoresTable/>
      </div>
      
    </div>
  );
}

export default App;
