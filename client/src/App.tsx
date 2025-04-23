import { MapView } from "./components/MapView";
import { CapitalList } from "./components/CapitalList";
import { AddCityPopup } from "./components/AddCityPopup";

function App() {
  return (
    <div className="flex h-screen">
      <CapitalList />
      <MapView />
    </div>
  );
}

export default App;