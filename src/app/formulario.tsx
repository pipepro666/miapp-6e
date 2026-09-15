import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function Formulario() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");

  const enviar = () => {
    if (!nombre || !correo || !telefono || !ciudad) {
      alert("Todos los campos son obligatorios");
      return;
    }

    router.push({
      pathname: "/resultado" as any,
      params: {
        nombre,
        correo,
        telefono,
        ciudad,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* SECCIÓN DEL FORMULARIO */}
      <Text style={styles.titulo}>Registro de usuario</Text>
      <Text style={styles.subtitulo}>
        Completa la información para continuar.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="tucorreo@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={correo}
          onChangeText={setCorreo}
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="3115784556"
          keyboardType="numeric"
          value={telefono}
          onChangeText={setTelefono}
        />

        <Text style={styles.label}>Ciudad</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Pasto"
          value={ciudad}
          onChangeText={setCiudad}
        />

        <Pressable style={styles.boton} onPress={enviar}>
          <Text style={styles.botonTexto}>Enviar información</Text>
        </Pressable>
      </View>

      {/* SECCIÓN DE LOS 3 BOTONES EXTRA */}
      <View style={styles.contenedorBotonesExtra}>
        <Text style={styles.subtituloBotones}>Otras opciones de la tienda</Text>
        
        <Pressable 
          style={styles.botonSecundario} 
          onPress={() => router.push("/imagenes" as any)}
        >
          <Text style={styles.botonTextoSecundario}>📸 Ver Galería de Ropa</Text>
        </Pressable>

        <Pressable 
          style={styles.botonSecundario} 
          onPress={() => router.push("/contacto" as any)}
        >
          <Text style={styles.botonTextoSecundario}>📍 Ir a Contacto</Text>
        </Pressable>

        <Pressable 
          style={styles.botonSecundario} 
          onPress={() => router.push("/" as any)}
        >
          <Text style={styles.botonTextoSecundario}>🏠 Volver al Menú Principal</Text>
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
    color: "#271366",
    textAlign: "center",
  },

  subtitulo: {
    color: "#2b358b",
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

  label: {
    color: "#1c165f",
    fontWeight: "600",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#FFF9FB",
    borderWidth: 1,
    borderColor: "#2b2884",
    borderRadius: 13,
    padding: 12,
    marginBottom: 14,
  },

  boton: {
    backgroundColor: "#260e93",
    paddingVertical: 14,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 4,
  },

  botonTexto: {
    color: "white",
    fontWeight: "bold",
  },

  // ESTILOS NUEVOS PARA LOS 3 BOTONES
  contenedorBotonesExtra: {
    marginTop: 30,
    width: "100%",
    gap: 12, // Separa los botones de forma pareja
  },

  subtituloBotones: {
    color: "#241a7d",
    textAlign: "center",
    marginBottom: 5,
    fontSize: 14,
    fontWeight: "600",
  },

  botonSecundario: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 13,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3a0e7b", // Borde del mismo color que el botón principal
  },

  botonTextoSecundario: {
    color: "#3b129a", // Texto del mismo color que el botón principal
    fontWeight: "bold",
    fontSize: 15,
  },
});