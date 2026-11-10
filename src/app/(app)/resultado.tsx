import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Pressable } from "react-native";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";

export default function Resultado() {
  const router = useRouter();
  const [clientes, setClientes] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function obtenerClientes() {
      try {
        const { data, error } = await supabase
          .from("clientes_boutique")
          .select("*")
          .order('created_at', { ascending: false }); // Muestra los más recientes primero

        if (error) {
          console.error("Error al obtener clientes:", error);
          alert("Hubo un problema al cargar los clientes.");
        } else {
          setClientes(data || []);
        }
      } catch (err) {
        console.error("Error inesperado:", err);
      } finally {
        setCargando(false);
      }
    }

    obtenerClientes();
  }, []);

  if (cargando) {
    return (
      <View style={[styles.container, styles.centrado]}>
        <ActivityIndicator size="large" color="#1E3A8A" />
        <Text style={styles.textoCargando}>Cargando registros...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.tituloPrincipal}>Clientes Registrados</Text>
      
      {clientes.length === 0 ? (
        <View style={styles.vacioContainer}>
          <Text style={styles.textoVacio}>No hay clientes registrados aún.</Text>
        </View>
      ) : (
        clientes.map((cliente, index) => (
          <View key={cliente.id} style={styles.card}>
            <View style={styles.headerCard}>
              <Text style={styles.numeroRegistro}>#{clientes.length - index}</Text>
              <Text style={styles.fecha}>
                {new Date(cliente.created_at).toLocaleDateString()}
              </Text>
            </View>
            
            <Text style={styles.nombreCliente}>{cliente.nombre}</Text>
            
            <View style={styles.infoFila}>
              <Text style={styles.etiqueta}>Correo: </Text>
              <Text style={styles.valor}>{cliente.correo}</Text>
            </View>
            
            <View style={styles.infoFila}>
              <Text style={styles.etiqueta}>Teléfono: </Text>
              <Text style={styles.valor}>{cliente.telefono}</Text>
            </View>
            
            <View style={styles.infoFila}>
              <Text style={styles.etiqueta}>Talla: </Text>
              <Text style={styles.valor}>{cliente.talla}</Text>
            </View>
            
            <View style={styles.infoFila}>
              <Text style={styles.etiqueta}>Envío: </Text>
              <Text style={styles.valor}>{cliente.ubicacion_envio}</Text>
            </View>
          </View>
        ))
      )}
      
      <Pressable style={styles.botonVolver} onPress={() => router.push("/")}>
        <Text style={styles.textoBoton}>Volver al Inicio</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },
  centrado: {
    justifyContent: "center",
    alignItems: "center",
  },
  textoCargando: {
    marginTop: 10,
    color: "#64748B",
    fontSize: 16,
  },
  tituloPrincipal: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 10,
  },
  vacioContainer: {
    padding: 30,
    alignItems: "center",
  },
  textoVacio: {
    color: "#64748B",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  headerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    paddingBottom: 8,
  },
  numeroRegistro: {
    fontWeight: "bold",
    color: "#1E3A8A",
  },
  fecha: {
    color: "#94A3B8",
    fontSize: 12,
  },
  nombreCliente: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 12,
  },
  infoFila: {
    flexDirection: "row",
    marginBottom: 6,
  },
  etiqueta: {
    fontWeight: "600",
    color: "#475569",
    width: 80,
  },
  valor: {
    color: "#334155",
    flex: 1,
  },
  botonVolver: {
    backgroundColor: "#0F172A",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  textoBoton: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  }
});