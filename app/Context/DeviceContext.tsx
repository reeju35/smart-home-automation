// app/context/DeviceContext.tsx
import React, { createContext, useContext, useMemo, useState } from "react";

/**
 * Simple device model:
 * { id, name, room, type, isOn }
 *
 * You can replace the initialData with dynamic data later (API / Firebase).
 */

type Device = {
  id: string;
  name: string;
  room: string;
  type: string;
  isOn: boolean;
};

type DeviceContextShape = {
  devices: Device[];
  toggleDevice: (id: string) => void;
  getDevicesByRoom: (room: string) => Device[];
  devicesOnCount: number;
};

const DeviceContext = createContext<DeviceContextShape | undefined>(undefined);

const initialData: Device[] = [
  // 🛋️ LUXURY LIVING ROOM
  { id: "lr-light-main", name: "Main Ceiling Light", room: "Living Room", type: "light", isOn: false },
  { id: "lr-light-ambient", name: "Ambient Strip Lighting", room: "Living Room", type: "light", isOn: false },
  { id: "lr-fan-ceiling", name: "Ceiling Fan", room: "Living Room", type: "fan", isOn: false },
  { id: "lr-ac-main", name: "Central AC", room: "Living Room", type: "ac", isOn: false },
  { id: "lr-curtains", name: "Smart Curtains", room: "Living Room", type: "curtain", isOn: false },
  { id: "lr-tv", name: "Smart OLED TV", room: "Living Room", type: "tv", isOn: false },
  { id: "lr-speaker", name: "Home Theater Speakers", room: "Living Room", type: "speaker", isOn: false },
  { id: "lr-camera", name: "Security Camera", room: "Living Room", type: "camera", isOn: false },
  { id: "lr-airpurifier", name: "Air Purifier", room: "Living Room", type: "appliance", isOn: false },
  { id: "lr-chandelier", name: "Chandelier", room: "Living Room", type: "light", isOn: false },

  // 🛏️ MASTER BEDROOM (Luxury)
  { id: "br-light-main", name: "Main Light", room: "Bedroom", type: "light", isOn: false },
  { id: "br-light-bedside", name: "Bedside Lamps", room: "Bedroom", type: "light", isOn: false },
  { id: "br-fan", name: "Ceiling Fan", room: "Bedroom", type: "fan", isOn: false },
  { id: "br-ac", name: "Bedroom AC", room: "Bedroom", type: "ac", isOn: false },
  { id: "br-curtains", name: "Smart Curtains", room: "Bedroom", type: "curtain", isOn: false },
  { id: "br-tv", name: "Smart TV", room: "Bedroom", type: "tv", isOn: false },
  { id: "br-speaker", name: "Smart Speaker", room: "Bedroom", type: "speaker", isOn: false },
  { id: "br-fragrance", name: "Aroma Diffuser", room: "Bedroom", type: "appliance", isOn: false },

  // 🍳 MODERN KITCHEN (Luxury)
  { id: "kt-light-main", name: "Kitchen Light", room: "Kitchen", type: "light", isOn: false },
  { id: "kt-strip", name: "Cabinet Strip Lighting", room: "Kitchen", type: "light", isOn: false },
  { id: "kt-fridge", name: "Smart Refrigerator", room: "Kitchen", type: "appliance", isOn: false },
  { id: "kt-oven", name: "Smart Oven", room: "Kitchen", type: "appliance", isOn: false },
  { id: "kt-chimney", name: "Auto Chimney", room: "Kitchen", type: "appliance", isOn: false },
  { id: "kt-stove", name: "Electric Stove", room: "Kitchen", type: "appliance", isOn: false },
  { id: "kt-dishwasher", name: "Dishwasher", room: "Kitchen", type: "appliance", isOn: false },
  { id: "kt-waterfilter", name: "Water Purifier", room: "Kitchen", type: "appliance", isOn: false },

  // 🚿 LUXURY BATHROOM
  { id: "bath-light", name: "Bathroom Light", room: "Bathroom", type: "light", isOn: false },
  { id: "bath-mirror", name: "Smart Mirror Light", room: "Bathroom", type: "light", isOn: false },
  { id: "bath-geyser", name: "Geyser", room: "Bathroom", type: "appliance", isOn: false },
  { id: "bath-fan", name: "Exhaust Fan", room: "Bathroom", type: "fan", isOn: false },
  { id: "bath-shower", name: "Smart Shower", room: "Bathroom", type: "appliance", isOn: false },

  // 🌇 BALCONY
  { id: "bal-light", name: "Balcony Light", room: "Balcony", type: "light", isOn: false },
  { id: "bal-mood", name: "Mood Lighting", room: "Balcony", type: "light", isOn: false },
  { id: "bal-fountain", name: "Mini Fountain", room: "Balcony", type: "appliance", isOn: false },
  { id: "bal-camera", name: "Balcony Camera", room: "Balcony", type: "camera", isOn: false },

  // 🏠 HALLWAY
  { id: "hall-light", name: "Hall Light", room: "Hall", type: "light", isOn: false },
  { id: "hall-lamp", name: "Hallway Lamp", room: "Hall", type: "light", isOn: false },
  { id: "hall-sensor", name: "Motion Sensor", room: "Hall", type: "sensor", isOn: false },
  { id: "hall-camera", name: "Hall Camera", room: "Hall", type: "camera", isOn: false },
];


export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [devices, setDevices] = useState<Device[]>(initialData);

  const toggleDevice = (id: string) => {
    setDevices((d) => d.map((x) => (x.id === id ? { ...x, isOn: !x.isOn } : x)));
  };

  const getDevicesByRoom = (room: string) => devices.filter((d) => d.room === room);

  const devicesOnCount = useMemo(() => devices.filter((d) => d.isOn).length, [devices]);

  const value = { devices, toggleDevice, getDevicesByRoom, devicesOnCount };

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
}

export function useDevices() {
  const ctx = useContext(DeviceContext);
  if (!ctx) throw new Error("useDevices must be used within DeviceProvider");
  return ctx;
}
