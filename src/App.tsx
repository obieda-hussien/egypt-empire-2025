import { useGameStore } from './store/gameStore';
import { useGameLoop } from './hooks/useGameLoop';
import { useEvents } from './hooks/useEvents';
import { Header } from './components/UI/Header';
import { Sidebar } from './components/UI/Sidebar';
import { Notifications } from './components/UI/Notifications';
import { EgyptMap } from './components/Map/EgyptMap';
import { MainDashboard } from './components/Dashboard/MainDashboard';
import { DiplomacyPanel } from './components/Diplomacy/DiplomacyPanel';
import { WarPanel } from './components/Diplomacy/WarPanel';
import { ResourceOverview } from './components/Resources/ResourceOverview';
import { HappinessPanel } from './components/Politics/HappinessPanel';
import { OrganizationsHub } from './components/Organizations/OrganizationsHub';
import { EventModal } from './components/Events/EventModal';

function App() {
  // Initialize game loops
  useGameLoop();
  useEvents();
  
  const { activePanel } = useGameStore();
  
  const renderMainContent = () => {
    switch (activePanel) {
      case 'map':
        return <EgyptMap />;
      case 'dashboard':
        return <MainDashboard />;
      case 'diplomacy':
        return <DiplomacyPanel />;
      case 'wars':
        return <WarPanel />;
      case 'resources':
        return <ResourceOverview />;
      case 'politics':
        return <HappinessPanel />;
      case 'organizations':
        return <OrganizationsHub />;
      default:
        return <EgyptMap />;
    }
  };
  
  return (
    <div className="min-h-screen bg-egyptian-gradient">
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-6 overflow-auto papyrus-texture animate-fade-in" style={{ height: 'calc(100vh - 80px)' }}>
          <div className="max-w-full">
            {renderMainContent()}
          </div>
        </main>
      </div>
      
      <Notifications />
      <EventModal />
    </div>
  );
}

export default App;
