// app/home/rooms/living.tsx
import React from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { useDevices } from "../../Context/DeviceContext";

export default function LivingRoom() {
  const { getDevicesByRoom, toggleDevice } = useDevices();
  const roomName = "Living Room";
  const devices = getDevicesByRoom(roomName);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>{roomName}</Text>

      {devices.map((d) => (
        <View key={d.id} style={styles.card}>
          <View>
            <Text style={styles.name}>{d.name}</Text>
            <Text style={styles.type}>{d.type}</Text>
          </View>

          <Switch
            value={d.isOn}
            onValueChange={() => toggleDevice(d.id)}
          />
        </View>
      ))}

      {devices.length === 0 && <Text style={styles.empty}>No devices configured for this room.</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f1113" },
  title: { color: "#fff", fontSize: 22, fontWeight: "700", marginTop: 40, marginBottom: 12 },
  card: {
    backgroundColor: "#1b1f23",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: { color: "#fff", fontSize: 17, fontWeight: "600" },
  type: { color: "#9aa0a6", marginTop: 4 },
  empty: { color: "#9aa0a6", marginTop: 20 },
});
