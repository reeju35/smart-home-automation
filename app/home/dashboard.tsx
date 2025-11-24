// app/home/dashboard.tsx
import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useDevices } from "../Context/DeviceContext";

export default function Dashboard() {
  const { devices, devicesOnCount } = useDevices();
  const router = useRouter();

  // group by room
  const rooms = Array.from(new Set(devices.map((d) => d.room)));
  const countsByRoom = rooms.map((r) => ({
    room: r,
    total: devices.filter((d) => d.room === r).length,
    on: devices.filter((d) => d.room === r && d.isOn).length,
  }));

  // FIXED PATHS FOR ALL ROOMS
  const pathMap: any = {
    "Living Room": "/home/rooms/living",
    Bedroom: "/home/rooms/bedroom",
    Kitchen: "/home/rooms/kitchen",
    Bathroom: "/home/rooms/bathroom",
    Balcony: "/home/rooms/balcony",
    Hall: "/home/rooms/hall",
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>

      <Text style={styles.title}>Smart Home Dashboard</Text>
      <TouchableOpacity
  style={styles.logoutBtn}
  onPress={() => router.replace("/login")}
>
  <Text style={styles.logoutText}>Logout</Text>
</TouchableOpacity>


      <TouchableOpacity
  style={styles.highcard}
  onPress={() => router.push("/home/devices-on")}
>
  <Text style={styles.bigGreen}>Devices ON: {devicesOnCount}</Text>
  <Text style={styles.muted}>Total devices: {devices.length}</Text>
</TouchableOpacity>


      <Text style={styles.section}>By Room</Text>

      {countsByRoom.map((c) => (
        <TouchableOpacity
          key={c.room}
          style={styles.roomCard}
          onPress={() => router.push(pathMap[c.room])} // FIXED ROUTING
        >
          <Text style={styles.roomTitle}>{c.room}</Text>
          <Text style={styles.roomSub}>ON: {c.on} / {c.total}</Text>
        </TouchableOpacity>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f1113" },
  title: { color: "#fff", fontSize: 26, fontWeight: "700", marginTop: 40, marginBottom: 12 },
  highcard: {
    backgroundColor: "#11161a",
    padding: 18,
    borderRadius: 12,
    marginBottom: 18,
  },
  bigGreen: { color: "#00d400", fontSize: 20, fontWeight: "700" },
  muted: { color: "#9aa0a6", marginTop: 6 },
  section: { color: "#ddd", fontSize: 18, marginBottom: 8 },
  roomCard: { backgroundColor: "#1b1f23", padding: 12, borderRadius: 10, marginBottom: 10 },
  roomTitle: { color: "#fff", fontWeight: "600" },
  roomSub: { color: "#9aa0a6", marginTop: 6 },
  logoutBtn: {
  backgroundColor: "#d40000",
  padding: 10,
  borderRadius: 8,
  alignSelf: "flex-end",
  marginBottom: 10,
},
logoutText: {
  color: "#fff",
  fontWeight: "700",
},

});
