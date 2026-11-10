import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function Formulario() {
  const router = useRouter();

  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [talla, setTalla] = useState("");
  const [ubicacionEnvio, setUbicacionEnvio] = useState("");

  // Estado para controlar el proceso de guardado
  const [guardando, setGuardando] = useState(false);

  // Función para validar el correo electrónico
  const validarCorreo = (email: string) => {
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(email);
  };

  // Función para guardar los datos en Supabase
  const guardar = async () => {
    // 1. Validar campos vacíos
    if (
      !nombre.trim() ||
      !correo.trim() ||
      !telefono.trim() ||
      !talla.trim() ||
      !ubicacionEnvio.trim()
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    // 2. Validar correo
    if (!validarCorreo(correo)) {
      alert("Ingrese un correo electrónico válido");
      return;
    }

    // 3. Validar teléfono
    if (isNaN(Number(telefono))) {
      alert("El teléfono debe contener únicamente números");
      return;
    }

    // 4. Validar longitud exacta de 10 dígitos para el teléfono
    if (telefono.trim().length !== 10) {
      alert("El número de teléfono debe tener exactamente 10 dígitos");
      return;
    }

    try {
      // Activar indicador de carga
      setGuardando(true);

      // Guardar registro en Supabase
      const { data, error } = await supabase
        .from("clientes_boutique")
        .insert([
          {
            nombre: nombre.trim(),
            correo: correo.trim(),
            telefono: telefono.trim(),
            talla: talla.trim(),
            ubicacion_envio: ubicacionEnvio.trim(),
          },
        ])
        .select();

      // Comprobar si Supabase devolvió un error
      if (error) {
        console.log("ERROR SUPABASE:", error);
        alert("Error al guardar: " + error.message);
        return;
      }

      // Obtener el registro que acaba de crear Supabase
      const registro = data?.[0];
      if (!registro) {
        alert("No fue posible recuperar el registro guardado");
        return;
      }

      console.log("REGISTRO GUARDADO:", registro);

      // Limpiar formulario antes de navegar
      setNombre("");
      setCorreo("");
      setTelefono("");
      setTalla("");
      setUbicacionEnvio("");

      // Navegar a la pantalla resultado
      router.push("/resultado");
      
    } catch (error) {
      console.log("ERROR INESPERADO:", error);
      alert("No fue posible guardar la información");
    } finally {
      // Desactivar indicador de carga
      setGuardando(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.contenedor}
      keyboardShouldPersistTaps="handled"
    >
      {/* ENCABEZADO */}
      <View style={styles.encabezado}>
        <View style={styles.iconoContainer}>
          <Text style={styles.iconoBoutique}>🛍️</Text>
        </View>
        <Text style={styles.titulo}>Boutique Urbana</Text>
        <Text style={styles.subtitulo}>
          Registra tus datos para formar parte de nuestra comunidad.
        </Text>
      </View>

      {/* FORMULARIO */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Datos personales</Text>
        <Text style={styles.cardDescripcion}>
          Complete todos los campos antes de guardar la información.
        </Text>

        {/* NOMBRE */}
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre"
          placeholderTextColor="#94A3B8"
          value={nombre}
          onChangeText={setNombre}
          autoCapitalize="words"
        />

        {/* CORREO */}
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: cliente@gmail.com"
          placeholderTextColor="#94A3B8"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* TELÉFONO */}
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 3001234567"
          placeholderTextColor="#94A3B8"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="numeric"
          maxLength={10}
        />

        {/* TALLA */}
        <Text style={styles.label}>Talla habitual</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: S, M, L, XL"
          placeholderTextColor="#94A3B8"
          value={talla}
          onChangeText={setTalla}
          autoCapitalize="characters"
        />

        {/* UBICACIÓN DE ENVÍO */}
        <Text style={styles.label}>Ubicación de envío</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Calle 15 # 22-10, Pasto"
          placeholderTextColor="#94A3B8"
          value={ubicacionEnvio}
          onChangeText={setUbicacionEnvio}
          autoCapitalize="words"
        />

        {/* BOTÓN GUARDAR */}
        <Pressable
          style={({ pressed }) => [
            styles.boton,
            pressed && styles.botonPresionado,
            guardando && styles.botonDesactivado,
          ]}
          onPress={guardar}
          disabled={guardando}
        >
          {guardando ? (
            <View style={styles.cargandoContainer}>
              <ActivityIndicator color="#FFFFFF" />
              <Text style={styles.botonTexto}>Guardando...</Text>
            </View>
          ) : (
            <Text style={styles.botonTexto}>Guardar información</Text>
          )}
        </Pressable>
      </View>

      {/* INFORMACIÓN */}
      <View style={styles.infoBox}>
        <View style={styles.infoIcono}>
          <Text style={styles.infoEmoji}>✨</Text>
        </View>
        <View style={styles.infoContenido}>
          <Text style={styles.infoTitulo}>Amantes de la moda</Text>
          <Text style={styles.infoTexto}>
            La información registrada será almacenada en nuestra base de datos
            utilizando Supabase.
          </Text>
        </View>
      </View>

      {/* PIE */}
      <Text style={styles.footer}>Boutique Urbana · Desarrollo Móvil</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexGrow: 1,
    backgroundColor: "#F8FAFC", // Blanco / Gris muy claro
    padding: 20,
  },
  encabezado: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 25,
  },
  iconoContainer: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: "#E0F2FE", // Azul claro suave
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  iconoBoutique: {
    fontSize: 40,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0F172A", // Negro / Azul Oscuro Profundo
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 14,
    color: "#475569", // Gris / Azul Muted
    textAlign: "center",
    marginTop: 7,
    lineHeight: 21,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#FFFFFF", // Blanco Puro
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0", // Borde gris/azul tenue
    elevation: 4,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardTitulo: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 4,
  },
  cardDescripcion: {
    color: "#64748B",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 20,
  },
  label: {
    color: "#1E293B", // Azul/Negro oscuro para etiquetas
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 7,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1", // Borde azulado suave
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 17,
    color: "#0F172A", // Texto que digita el usuario (oscuro)
    fontSize: 15,
  },
  boton: {
    backgroundColor: "#1E3A8A", // Azul Marino Profundo (Elegante para Boutique)
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 6,
    elevation: 2,
  },
  botonPresionado: {
    opacity: 0.85,
  },
  botonDesactivado: {
    opacity: 0.65,
  },
  botonTexto: {
    color: "#FFFFFF", // Blanco
    fontWeight: "bold",
    fontSize: 15,
  },
  cargandoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoBox: {
    backgroundColor: "#EFF6FF", // Azul Hielo tenue
    padding: 17,
    borderRadius: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  infoIcono: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },
  infoEmoji: {
    fontSize: 23,
    color: "#1E3A8A",
  },
  infoContenido: {
    flex: 1,
  },
  infoTitulo: {
    color: "#1E3A8A", // Azul rey/marino
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 3,
  },
  infoTexto: {
    color: "#334155",
    fontSize: 13,
    lineHeight: 19,
  },
  footer: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 12,
    marginTop: 24,
    marginBottom: 10,
  },
});