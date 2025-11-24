import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useDevices } from "../Context/DeviceContext";
import { useRouter } from "expo-router";

export default function DevicesOnScreen() {
  const { devices, toggleDevice } = useDevices();
  const router = useRouter();

  const devicesOn = devices.filter((d) => d.isOn);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Devices ON ({devicesOn.length})</Text>

      {devicesOn.length === 0 && (
        <Text style={styles.empty}>No devices are currently ON</Text>
      )}

      {devicesOn.map((d) => (
        <View key={d.id} style={styles.card}>
          <Text style={styles.name}>{d.name}</Text>
          <Text style={styles.room}>{d.room}</Text>

          <TouchableOpacity
            style={styles.toggle}
            onPress={() => toggleDevice(d.id)}
          >
            <Text style={styles.toggleText}>Turn Off</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f1113" },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 18,
    marginTop: 10,
  },
  back: { color: "#00d400", fontSize: 18, marginBottom: 20 },
  empty: { color: "#999", fontSize: 16 },
  card: {
    backgroundColor: "#1b1f23",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: { color: "#fff", fontSize: 18, fontWeight: "600" },
  room: { color: "#9aa0a6", marginTop: 4, marginBottom: 10 },
  toggle: {
    backgroundColor: "#d40000",
    padding: 10,
    borderRadius: 8,
    width: 100,
  },
  toggleText: { color: "#fff", textAlign: "center" },
});
