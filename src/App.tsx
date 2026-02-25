import Header from './components/Header';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <div className="h-screen flex flex-col bg-bloomberg-bg">
      <Header />
      <Dashboard />
    </div>
  );
}
