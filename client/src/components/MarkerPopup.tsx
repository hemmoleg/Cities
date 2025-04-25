import { useMarkerStore } from "../store/markers";

interface PopupComponentProps {
  cityId: number;
  cityName: string;
  countryName: string;
  color: string;
  onColorChange: (newColor: string) => void;
}

export function PopupComponent({ cityId, cityName, countryName, color, onColorChange }: PopupComponentProps) {
  
  useMarkerStore((state) => color = state.cityColors[cityId]); 

  return (
    <div>
      <div>
        {cityName}, {countryName}
      </div>
      <input
        type="color"
        value={color}
        onChange={(e) => onColorChange(e.target.value)}
      />
    </div>
  );
}