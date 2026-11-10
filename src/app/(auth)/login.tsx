import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async () => {
    if (!correo.trim() || !password) {
      Alert.alert("Campos incompletos", "Ingrese correo y contraseña");
      return;
    }

    try {
      setCargando(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: correo.trim(),
        password,
      });

      if (error) {
        Alert.alert("Inicio de sesión", error.message);
        return;
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🛍️</Text>
      <Text style={styles.titulo}>Boutique Urbana</Text>
      <Text style={styles.subtitulo}>Inicia sesión para continuar</Text>
      <TextInput style={styles.input} placeholder="Correo electrónico" placeholderTextColor="#A09891" value={correo} onChangeText={setCorreo} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Contraseña" placeholderTextColor="#A09891" value={password} onChangeText={setPassword} secureTextEntry />
      <Pressable style={styles.boton} onPress={iniciarSesion} disabled={cargando}>
        {cargando ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.botonTexto}>Iniciar sesión</Text>}
      </Pressable>
      <Pressable onPress={() => router.push("/registro" as any)}>
        <Text style={styles.enlace}>¿No tienes cuenta? Regístrate</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#FAF7F5" },
  logo: { fontSize: 60, textAlign: "center", marginBottom: 8 },
  titulo: { fontSize: 32, fontWeight: "bold", color: "#1A1A1A", textAlign: "center", letterSpacing: 0.5 },
  subtitulo: { color: "#6E655F", textAlign: "center", marginBottom: 28, fontSize: 15 },
  input: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E5DED8", borderRadius: 12, padding: 16, marginBottom: 14, fontSize: 15, color: "#1A1A1A" },
  boton: { backgroundColor: "#1A1A1A", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 6 },
  botonTexto: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16, letterSpacing: 0.5 },
  enlace: { color: "#1A1A1A", textAlign: "center", marginTop: 22, fontWeight: "600", fontSize: 14 },
});