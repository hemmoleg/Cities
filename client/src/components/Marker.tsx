import { useMarkerStore } from "../store/markers";

interface MarkerComponentProps {
  color: string;
  cityId: number;
}

export function MarkerComponent({ color, cityId }: MarkerComponentProps) {
  
  useMarkerStore((state) => color = state.cityColors[cityId]); 
  
  return (
    <div
      className="cursor-pointer w-[2rem] h-[2rem] rounded-full border-2 border-red-500"
      style={{ borderColor: color }}
    />
  );
}