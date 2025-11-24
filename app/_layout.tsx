import { Slot } from "expo-router";
import React from "react";
import { DeviceProvider } from "./Context/DeviceContext";

export default function RootLayout() {
  return (
    <DeviceProvider>
      <Slot />  
    </DeviceProvider>
  );
}
