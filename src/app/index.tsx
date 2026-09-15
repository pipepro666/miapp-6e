import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

function OpcionMenu({
  icono,
  titulo,
  descripcion,
  onPress,
}: {
  icono: string;
  titulo: string;
  descripcion: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.iconoCaja}>
        <Text style={styles.icono}>{icono}</Text>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardTitulo}>{titulo}</Text>
        <Text style={styles.cardDescripcion}>{descripcion}</Text>
      </View>

      <Text style={styles.flecha}>›</Text>
    </Pressable>
  );
}

export default function Inicio() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* PORTADA PRINCIPAL */}
      <View style={styles.hero}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=800&auto=format&fit=crop",
          }}
          style={styles.imagenHero}
        />

        <View style={styles.overlay}>
          <Text style={styles.etiqueta}>BOUTIQUE APP</Text>
          <Text style={styles.titulo}>Boutique Urbana</Text>
          <Text style={styles.subtitulo}>
            Descubre moda, estilo y calidad en cada prenda.
          </Text>
        </View>
      </View>

      {/* BIENVENIDA */}
      <View style={styles.saludoBox}>
        <View>
          <Text style={styles.saludoTitulo}>Hola, amante de la moda</Text>
          <Text style={styles.saludoTexto}>
            ¿Qué estilo buscas hoy?
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>👕</Text>
        </View>
      </View>

      {/* RESUMEN */}
      <View style={styles.resumen}>
        <View style={styles.resumenItem}>
          <Text style={styles.resumenNumero}>3</Text>
          <Text style={styles.resumenTexto}>Categorías</Text>
        </View>

        <View style={styles.separador} />

        <View style={styles.resumenItem}>
          <Text style={styles.resumenNumero}>100%</Text>
          <Text style={styles.resumenTexto}>Calidad</Text>
        </View>

        <View style={styles.separador} />

        <View style={styles.resumenItem}>
          <Text style={styles.resumenNumero}>Expo</Text>
          <Text style={styles.resumenTexto}>Router</Text>
        </View>
      </View>

      <Text style={styles.seccionTitulo}>Menú Principal</Text>

      {/* OPCIÓN PRINCIPAL */}
      <OpcionMenu
        icono="🛒"
        titulo="Hacer Pedido"
        descripcion="Registra tus datos y compra tu prenda favorita."
        onPress={() => router.push("/formulario" as any)}
      />

      <Text style={styles.subtituloSeccion}>Más opciones</Text>

      {/* CUADRÍCULA DE BOTONES */}
      <View style={styles.contenedorGrid}>
        
        {/* GALERÍA - BOTÓN GRANDE */}
        <Pressable
          style={styles.botonGridGrande}
          onPress={() => router.push("/imagenes" as any)}
        >
          <Text style={styles.emojiGrid}>📸</Text>
          <Text style={styles.textoGrid}>Galería de Ropa</Text>
        </Pressable>

        {/* CONTACTO */}
        <Pressable
          style={styles.botonGrid}
          onPress={() => router.push("/contacto" as any)}
        >
          <Text style={styles.emojiGrid}>📍</Text>
          <Text style={styles.textoGrid}>Contacto y Sucursales</Text>
        </Pressable>

        {/* VER PRENDA */}
        <Pressable
          style={styles.botonGrid}
          onPress={() => router.push("/producto" as any)}
        >
          <Text style={styles.emojiGrid}>✨</Text>
          <Text style={styles.textoGrid}>Ver Prenda del Día</Text>
        </Pressable>

      </View>

      {/* FOOTER */}
      <Text style={styles.footer}>
        Boutique Urbana · Desarrollo Móvil
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    padding: 18,
  },

  hero: {
    height: 280,
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 6,
  },

  imagenHero: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 22,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },

  etiqueta: {
    color: "#E0E0E0",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.8,
    marginBottom: 6,
  },

  titulo: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 6,
  },

  subtitulo: {
    color: "#F5F5F5",
    fontSize: 14,
    lineHeight: 21,
  },

  saludoBox: {
    backgroundColor: "#F9F9F9",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  saludoTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111111",
  },

  saludoTexto: {
    marginTop: 3,
    color: "#666666",
    fontSize: 14,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EAEAEA",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarTexto: {
    fontSize: 24,
  },

  resumen: {
    backgroundColor: "#F9F9F9",
    borderRadius: 20,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 24,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  resumenItem: {
    flex: 1,
    alignItems: "center",
  },

  resumenNumero: {
    color: "#111111",
    fontSize: 18,
    fontWeight: "bold",
  },

  resumenTexto: {
    color: "#666666",
    fontSize: 12,
    marginTop: 3,
  },

  separador: {
    width: 1,
    height: 35,
    backgroundColor: "#DDDDDD",
  },

  seccionTitulo: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#111111",
    marginBottom: 14,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    elevation: 2,
  },

  iconoCaja: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  icono: {
    fontSize: 25,
  },

  cardInfo: {
    flex: 1,
  },

  cardTitulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111111",
    marginBottom: 4,
  },

  cardDescripcion: {
    color: "#666666",
    fontSize: 13,
    lineHeight: 18,
  },

  flecha: {
    fontSize: 30,
    color: "#999999",
    marginLeft: 8,
  },

  subtituloSeccion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 12,
  },

  /* CONTENEDOR GRID */
  contenedorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },

  /* BOTÓN GRANDE - GALERÍA */
  botonGridGrande: {
    width: "100%",
    backgroundColor: "#F4F4F4",
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    elevation: 1,
  },

  /* BOTONES PEQUEÑOS */
  botonGrid: {
    width: "48%",
    backgroundColor: "#F4F4F4",
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    elevation: 1,
  },

  emojiGrid: {
    fontSize: 24,
    marginBottom: 6,
  },

  textoGrid: {
    fontSize: 13,
    fontWeight: "600",
    color: "#222222",
    textAlign: "center",
  },

  footer: {
    textAlign: "center",
    color: "#888888",
    fontSize: 12,
    marginTop: 24,
    marginBottom: 12,
  },
});