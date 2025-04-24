import { useCityStore } from "../store/cities";

interface MarkerComponentProps {
  color: string;
  cityId: number;
}

export function MarkerComponent({ color, cityId }: MarkerComponentProps) {
  
  const city = useCityStore((state) => state.cities.find((c) => c.id === cityId)); 
  useCityStore((state) => color = state.cityColors[cityId]); 
  
  return (
    <div
      className="marker"
      style={{ backgroundColor: color }}
    />
  );
}