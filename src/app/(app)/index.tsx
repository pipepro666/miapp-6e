import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

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

  const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
    }
  };

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
          <Text style={styles.saludoTexto}>¿Qué estilo buscas hoy?</Text>
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
        onPress={() => router.push("/formulario")}
      />

      {/* OPCIÓN VER CLIENTES - NUEVA OPCIÓN */}
      <OpcionMenu
        icono="👥"
        titulo="Ver clientes registrados"
        descripcion="Consulta el listado de clientes en la base de datos."
        onPress={() => router.push("/resultado")}
      />

      <Text style={styles.subtituloSeccion}>Más opciones</Text>

      {/* CUADRÍCULA DE BOTONES */}
      <View style={styles.contenedorGrid}>
        {/* GALERÍA - BOTÓN GRANDE */}
        <Pressable
          style={styles.botonGridGrande}
          onPress={() => router.push("/imagenes")}
        >
          <Text style={styles.emojiGrid}>📸</Text>
          <Text style={styles.textoGrid}>Galería de Ropa</Text>
        </Pressable>

        {/* CONTACTO */}
        <Pressable
          style={styles.botonGrid}
          onPress={() => router.push("/contacto")}
        >
          <Text style={styles.emojiGrid}>📍</Text>
          <Text style={styles.textoGrid}>Contacto y Sucursales</Text>
        </Pressable>

        {/* VER PRENDA */}
        <Pressable
          style={styles.botonGrid}
          onPress={() => router.push("/producto")}
        >
          <Text style={styles.emojiGrid}>✨</Text>
          <Text style={styles.textoGrid}>Ver Prenda del Día</Text>
        </Pressable>
        
        {/* VER COLECCIONES */}
        <Pressable
          style={styles.botonGrid}
          onPress={() => router.push("/coleccion")}
        >
          <Text style={styles.emojiGrid}>🛍️</Text>
          <Text style={styles.textoGrid}>Ver Colecciones</Text>
        </Pressable>
      </View>

      {/* BOTÓN CERRAR SESIÓN */}
      <Pressable style={styles.botonCerrar} onPress={cerrarSesion}>
        <Text style={styles.textoCerrar}>Cerrar sesión</Text>
      </Pressable>

      {/* FOOTER */}
      <Text style={styles.footer}>Boutique Urbana · Desarrollo Móvil</Text>
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
    alignItems: "center",
  },
  resumenNumero: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111111",
  },
  resumenTexto: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  separador: {
    width: 1,
    height: 24,
    backgroundColor: "#DDDDDD",
  },
  seccionTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111111",
    marginBottom: 12,
  },
  subtituloSeccion: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 20,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#F9F9F9",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  iconoCaja: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EAEAEA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  icono: {
    fontSize: 22,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111111",
  },
  cardDescripcion: {
    fontSize: 13,
    color: "#666666",
    marginTop: 2,
  },
  flecha: {
    fontSize: 22,
    color: "#999999",
    marginLeft: 10,
  },
  contenedorGrid: {
    gap: 12,
  },
  botonGridGrande: {
    backgroundColor: "#1A1A1A",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  botonGrid: {
    backgroundColor: "#F9F9F9",
    borderRadius: 18,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },
  emojiGrid: {
    fontSize: 26,
    marginBottom: 6,
  },
  textoGrid: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111111",
  },
  botonCerrar: {
    backgroundColor: "#8E3B46",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 24,
    elevation: 2,
  },
  textoCerrar: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  footer: {
    textAlign: "center",
    color: "#999999",
    fontSize: 12,
    marginTop: 20,
    marginBottom: 10,
  },
});