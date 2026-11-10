import { View, Text, StyleSheet } from "react-native";

export default function Contacto() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contáctanos</Text>
      <View style={styles.tarjeta}>
        <Text style={styles.info}>📍 Dirección: Calle Principal #123</Text>
        <Text style={styles.info}>📞 WhatsApp: +57 300 000 0000</Text>
        <Text style={styles.info}>✉️ Correo: hola@boutiqueurbana.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FAF7F5", justifyContent: "center" },
  titulo: { fontSize: 28, fontWeight: "bold", color: "#1A1A1A", marginBottom: 20, textAlign: "center" },
  tarjeta: { backgroundColor: "#FFF", padding: 25, borderRadius: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  info: { fontSize: 16, color: "#4A4440", marginBottom: 15 }
});
