import { Stack, useRouter } from "expo-router";
import {
  FlatList,
  Pressable,
  Text,
  View,
  ActivityIndicator,
  RefreshControl // Mejora: Permite deslizar la pantalla hacia abajo para recargar
} from "react-native";
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";

// Estructura de los productos
type Item = {
  id: number; 
  codigo: string;
  titulo: string;
  descripcion: string;
  detalle: string;
  precio: number | null;
}

export default function Catalogo() {
  const router = useRouter();
  
  // Estados de la aplicación
  const [items, setItems] = useState<Item[]>([]);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false); // Estado para el gesto de deslizar
  const [errorTexto, setErrorTexto] = useState("");

  // 1. FUNCIÓN PRINCIPAL: Consultar productos en Supabase
  // (La sacamos del useEffect para poder usarla con el botón también)
  async function cargarDatos() {
    try {
      setErrorTexto("");
      
      const { data, error } = await supabase
        .from("catalogo")
        .select("id, codigo, titulo, descripcion, detalle, precio")
        .order("codigo", { ascending: true });

      if (error) {
        console.error("Error Supabase: ", error);
        throw error;
      }
      
      setItems(data || []);
    } catch (error: unknown) {
      console.error("Error al cargar catalogo: ", error);
      
      // Mensaje de error formateado
      const mensaje = error instanceof Error ? error.message : String(error);
      setErrorTexto("No fue posible cargar: " + mensaje);
      setItems([]);
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  }

  // 2. EJECUTAR AL ABRIR LA PANTALLA
  useEffect(() => {
    cargarDatos();
  }, []);

  // Función para el botón manual
  const recargarManual = () => {
    setCargando(true);
    cargarDatos();
  };

  // Función para el gesto de deslizar
  const alDeslizar = () => {
    setRefrescando(true);
    cargarDatos();
  };

  // 3. MUESTRA EL INDICADOR DE CARGA (Pantalla completa)
  if (cargando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F8FAFC" }}>
        <ActivityIndicator size="large" color="#1E3A8A" />
        <Text style={{ marginTop: 10, color: "#64748B" }}>Cargando catálogo...</Text>
      </View>
    );
  }

  // 4. EXPLORA EL CATÁLOGO (Interfaz principal)
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#F8FAFC" }}>
      
      {/* Mensaje de error visual */}
      {errorTexto ? (
        <Text style={{ color: "#EF4444", fontSize: 15, marginBottom: 15, textAlign: "center", fontWeight: "bold" }}>
          {errorTexto}
        </Text>
      ) : null}

      {/* Botón Cargar Catálogo (Agregado) */}
      <Pressable 
        style={{ backgroundColor: "#0F172A", padding: 12, borderRadius: 8, marginBottom: 15, alignItems: "center" }}
        onPress={recargarManual}
      >
        <Text style={{ color: "#FFF", fontWeight: "bold", fontSize: 16 }}>↻ Recargar Catálogo</Text>
      </Pressable>

      {/* Mostrar el catálogo en lista */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        // Control para deslizar y actualizar
        refreshControl={
          <RefreshControl refreshing={refrescando} onRefresh={alDeslizar} colors={["#1E3A8A"]} />
        }
        // Mensaje si la base de datos está vacía
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 40, color: "#94A3B8", fontSize: 16 }}>
            No hay productos disponibles.
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable 
            style={{ padding: 15, borderWidth: 1, borderColor: "#E2E8F0", marginBottom: 10, backgroundColor: "#FFF", borderRadius: 10 }}
            onPress={() => router.push(`/detalle?id=${item.id}`)}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#1E3A8A" }}>{item.titulo}</Text>
            <Text style={{ color: "#10B981", marginTop: 5, fontWeight: "600" }}>${item.precio}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}