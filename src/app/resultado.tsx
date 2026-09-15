import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Resultado() {
  const router = useRouter();
  const { nombre, correo, telefono, ciudad } = useLocalSearchParams();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>¡Gracias por registrarte!</Text>
      <Text style={styles.subtitulo}>Aquí están tus datos:</Text>

      <View style={styles.card}>
        <View style={styles.datosRow}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.valor}>{nombre}</Text>
        </View>

        <View style={styles.datosRow}>
          <Text style={styles.label}>Correo:</Text>
          <Text style={styles.valor}>{correo}</Text>
        </View>

        <View style={styles.datosRow}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.valor}>{telefono}</Text>
        </View>

        <View style={styles.datosRow}>
          <Text style={styles.label}>Ciudad:</Text>
          <Text style={styles.valor}>{ciudad}</Text>
        </View>

        <Pressable
          style={styles.boton}
          onPress={() => router.push("/formulario")}
        >
          <Text style={styles.botonTexto}>Volver al formulario</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF7FA",
    padding: 20,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6C4051",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitulo: {
    color: "#8A727C",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F2D5E0",
    elevation: 3,
  },

  datosRow: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F2D5E0",
  },

  label: {
    color: "#684552",
    fontWeight: "600",
    marginBottom: 4,
  },

  valor: {
    color: "#6C4051",
    fontSize: 16,
  },

  boton: {
    backgroundColor: "#C96A8B",
    paddingVertical: 14,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 10,
  },

  botonTexto: {
    color: "white",
    fontWeight: "bold",
  },
});
