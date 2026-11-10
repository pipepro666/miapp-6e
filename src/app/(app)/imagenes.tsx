import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Imagenes() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Lookbook / Galería</Text>
      <Text style={styles.subtitulo}>Inspírate con nuestros mejores outfits.</Text>

      <View style={styles.grid}>
        <View style={[styles.caja, { backgroundColor: "#FFD1DC" }]}>
          <Text style={styles.emoji}>👗</Text>
          <Text style={styles.textoEtiqueta}>Vestidos Urbanos</Text>
        </View>
        <View style={[styles.caja, { backgroundColor: "#AEC6CF" }]}>
          <Text style={styles.emoji}>🧢</Text>
          <Text style={styles.textoEtiqueta}>Accesorios</Text>
        </View>
        <View style={[styles.caja, { backgroundColor: "#FDFD96" }]}>
          <Text style={styles.emoji}>🕶️</Text>
          <Text style={styles.textoEtiqueta}>Gafas Streetwear</Text>
        </View>
        <View style={[styles.caja, { backgroundColor: "#B39EB5" }]}>
          <Text style={styles.emoji}>🎒</Text>
          <Text style={styles.textoEtiqueta}>Mochilas</Text>
        </View>
        <View style={[styles.caja, { backgroundColor: "#FFDFBA" }]}>
          <Text style={styles.emoji}>👟</Text>
          <Text style={styles.textoEtiqueta}>Calzado</Text>
        </View>
        <View style={[styles.caja, { backgroundColor: "#C1E1C1" }]}>
          <Text style={styles.emoji}>🧥</Text>
          <Text style={styles.textoEtiqueta}>Chaquetas Oversize</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#FAF7F5" 
  },
  titulo: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#1A1A1A", 
    marginBottom: 5 
  },
  subtitulo: { 
    fontSize: 14, 
    color: "#6E655F", 
    marginBottom: 20 
  },
  grid: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between" 
  },
  caja: { 
    width: "48%", 
    aspectRatio: 1, 
    borderRadius: 12, 
    justifyContent: "center", 
    alignItems: "center", 
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  emoji: { 
    fontSize: 50,
    marginBottom: 10
  },
  textoEtiqueta: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    textAlign: "center"
  }
});