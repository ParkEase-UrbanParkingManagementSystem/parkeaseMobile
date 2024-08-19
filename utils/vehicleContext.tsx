import React, { createContext, useState, ReactNode } from 'react';

// Define the Vehicle type
interface Vehicle {
  type_id: number;
  name: string;
  vehicle_number: string;
}

// Define the shape of the context
interface VehicleContextProps {
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
}

// Create the context with default values
export const VehicleContext = createContext<VehicleContextProps>({
  selectedVehicle: null,
  setSelectedVehicle: () => {},
});



// Create a provider component
export const VehicleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  
  return (
    <VehicleContext.Provider value={{ selectedVehicle, setSelectedVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
};
