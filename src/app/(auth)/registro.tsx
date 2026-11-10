import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function Registro() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [guardando, setGuardando] = useState(false);

  const crearCuenta = async () => {
    if (!correo.trim() || !password) {
      Alert.alert("Campos incompletos", "Ingrese correo y contraseña");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Contraseña", "Debe tener mínimo 6 caracteres");
      return;
    }

    try {
      setGuardando(true);
      const { error } = await supabase.auth.signUp({
        email: correo.trim(),
        password,
      });

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      await supabase.auth.signOut();
      Alert.alert("Cuenta creada", "Ahora puede iniciar sesión");
      router.replace("/login" as any); // 👈 Error de tipo corregido
    } finally {
      setGuardando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🛍️</Text>
      <Text style={styles.titulo}>Crear cuenta</Text>
      <Text style={styles.subtitulo}>Únete a Boutique Urbana</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#A09891"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#A09891"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.boton} onPress={crearCuenta} disabled={guardando}>
        {guardando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.botonTexto}>Crear cuenta</Text>
        )}
      </Pressable>
      <Pressable onPress={() => router.replace("/login" as any)}> {/* 👈 Error de tipo corregido */}
        <Text style={styles.enlace}>Ya tengo una cuenta</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#FAF7F5" },
  logo: { fontSize: 56, textAlign: "center", marginBottom: 8 },
  titulo: { fontSize: 30, fontWeight: "bold", color: "#1A1A1A", textAlign: "center" },
  subtitulo: { color: "#6E655F", textAlign: "center", marginBottom: 24, fontSize: 15 },
  input: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E5DED8", borderRadius: 12, padding: 16, marginBottom: 14, fontSize: 15, color: "#1A1A1A" },
  boton: { backgroundColor: "#1A1A1A", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 6 },
  botonTexto: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16 },
  enlace: { color: "#1A1A1A", textAlign: "center", marginTop: 20, fontWeight: "600", fontSize: 14 },
});