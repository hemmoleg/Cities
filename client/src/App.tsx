import { MapView } from "./components/MapView";
import { CityList } from "./components/CityList";

function App() {
  return (
    <div className="flex h-screen">
      <CityList />
      <MapView />
    </div>
  );
}

export default App;