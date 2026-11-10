import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

export default function Coleccion() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Colecciones Exclusivas</Text>
      
      <View style={styles.card}>
        <Text style={styles.temporada}>🌞 Colección Verano</Text>
        <Text style={styles.descripcion}>Ropa ligera, fresca y con colores vibrantes para esta temporada.</Text>
        <Pressable style={styles.boton}><Text style={styles.botonTexto}>Ver colección</Text></Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.temporada}>❄️ Colección Invierno</Text>
        <Text style={styles.descripcion}>Chaquetas, abrigos y estilo urbano para protegerte del frío.</Text>
        <Pressable style={styles.boton}><Text style={styles.botonTexto}>Ver colección</Text></Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FAF7F5" },
  titulo: { fontSize: 24, fontWeight: "bold", color: "#1A1A1A", marginBottom: 20 },
  card: { backgroundColor: "#FFF", padding: 20, borderRadius: 12, marginBottom: 20, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  temporada: { fontSize: 18, fontWeight: "bold", color: "#1A1A1A", marginBottom: 10 },
  descripcion: { color: "#6E655F", marginBottom: 15, fontSize: 14, lineHeight: 20 },
  boton: { backgroundColor: "#1A1A1A", padding: 12, borderRadius: 8, alignItems: "center" },
  botonTexto: { color: "#FFF", fontWeight: "bold" }
});
