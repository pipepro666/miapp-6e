import { Stack, useRouter } from "expo-router";
import {
  FlatList,
  Pressable,
  Text,
  View,
  ActivityIndicator,
  ScrollView // Agregamos ScrollView para deslizar las categorías
} from "react-native";
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";

// 1. Estructura de los productos
type Item = {
  id: number; 
  codigo: string;
  titulo: string;
  descripcion: string;
  detalle: string;
  precio: number | null;
}

// Lista fija de categorías para la tienda
const CATEGORIAS = ["Todos", "Camiseta", "Chaqueta", "Jeans", "Tenis", "Vestido"];

export default function Catalogo() {
  const router = useRouter();
  
  // 2. Estados de la aplicación
  const [items, setItems] = useState<Item[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorTexto, setErrorTexto] = useState("");
  
  // Nuevo estado para saber qué categoría está seleccionada
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");

  // 3. Consultar productos de Supabase
  useEffect(() => {
    async function cargarDatos() {
      try {
        setCargando(true);
        setErrorTexto("");
        
        const { data, error } = await supabase
          .from("catalogo")
          .select("id, codigo, titulo, descripcion, detalle, precio")
          .order("codigo", { ascending: true });

        if (error) {
          console.error("Error Supabase: ", error);
          throw error;
        }
        
        console.log("Productos obtenidos:", data);
        setItems(data || []);
      } catch (error: unknown) {
        console.error("Error al cargar catalogo: ", error);
        
        const mensaje =
          error instanceof Error
            ? error.message
            : typeof error === "object" && error !== null && "message" in error
            ? String(error.message)
            : String(error);

        setErrorTexto("No fue posible cargar: " + mensaje);
        setItems([]);
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, []);

  // 4. Lógica para filtrar los productos según la categoría tocada
  const productosFiltrados = categoriaActiva === "Todos" 
    ? items 
    : items.filter(item => item.titulo.toLowerCase().includes(categoriaActiva.toLowerCase()));

  // 5. Interfaz mientras carga
  if (cargando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Cargando catálogo...</Text>
      </View>
    );
  }

  // 6. Interfaz principal con la lista
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#F5F7F8" }}>
      
      {/* SECCIÓN DE CATEGORÍAS (Desplazable de forma horizontal) */}
      <View style={{ marginBottom: 15 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIAS.map((cat, index) => (
            <Pressable
              key={index}
              onPress={() => setCategoriaActiva(cat)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                marginRight: 10,
                borderRadius: 20,
                // Cambia de color si está seleccionada
                backgroundColor: categoriaActiva === cat ? "#0F776C" : "#E2E8F0"
              }}
            >
              <Text style={{ 
                fontWeight: "bold", 
                // Cambia el color del texto si está seleccionada
                color: categoriaActiva === cat ? "#FFF" : "#334155" 
              }}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Si el bloque catch captura un error, lo mostramos aquí en color rojo */}
      {errorTexto ? (
        <Text style={{ color: "red", fontSize: 16, marginBottom: 15, textAlign: "center" }}>
          {errorTexto}
        </Text>
      ) : null}

      {/* Lista de productos (ahora usa productosFiltrados en lugar de items) */}
      <FlatList
        data={productosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
            No hay productos en esta categoría.
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable 
            style={{ padding: 15, borderBottomWidth: 1, borderColor: "#ccc", marginBottom: 10, backgroundColor: "#fff", borderRadius: 8 }}
            onPress={() => router.push(`/detalle?id=${item.id}`)}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.titulo}</Text>
            <Text style={{ color: "green", marginTop: 5 }}>${item.precio}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}