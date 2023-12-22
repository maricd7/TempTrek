import logo from './logo.svg';
import './App.css';
import { Temperature } from './components';
import { HeroText } from './components/UI/Text/HeroText';

function App() {
  return (
    <div className="flex items-center justify-center gap-4 w-full h-screen">
     <HeroText/>
     <Temperature/>
    </div>
  );
}

export default App;
