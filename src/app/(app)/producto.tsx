import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";

const productos = [
  { id: "1", nombre: "Camiseta Urbana Básica", precio: "$25.000", icono: "👕" },
  { id: "2", nombre: "Pantalón Cargo Negro", precio: "$80.000", icono: "👖" },
  { id: "3", nombre: "Chaqueta Oversize", precio: "$150.000", icono: "🧥" },
  { id: "4", nombre: "Tenis Streetwear", precio: "$120.000", icono: "👟" },
];

export default function Producto() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nuestros Productos</Text>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.icono}>{item.icono}</Text>
            <View style={styles.info}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.precio}>{item.precio}</Text>
            </View>
            <Pressable style={styles.boton}>
              <Text style={styles.botonTexto}>Añadir</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FAF7F5" },
  titulo: { fontSize: 24, fontWeight: "bold", color: "#1A1A1A", marginBottom: 20 },
  card: { flexDirection: "row", backgroundColor: "#FFF", padding: 15, borderRadius: 12, marginBottom: 15, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  icono: { fontSize: 40, marginRight: 15 },
  info: { flex: 1 },
  nombre: { fontSize: 16, fontWeight: "600", color: "#1A1A1A" },
  precio: { fontSize: 14, color: "#6E655F", marginTop: 4 },
  boton: { backgroundColor: "#1A1A1A", paddingHorizontal: 15, paddingVertical: 10, borderRadius: 8 },
  botonTexto: { color: "#FFF", fontWeight: "bold", fontSize: 14 }
});
