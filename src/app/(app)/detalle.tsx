import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import { supabase } from "../../lib/supabase"; // Ruta corregida según tu proyecto

type ItemCatalogo = {
  id: number;
  codigo: string;
  titulo: string;
  descripcion: string;
  precio: number | string | null;
  created_at: string;
  detalle: string;
};

export default function DetalleScreen() {
  const router = useRouter();
  // CAMBIO 1: Recibimos el 'id' numérico de la ruta (ej: /detalle?id=3)
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const idItem = Array.isArray(id) ? id[0] : id;
  
  const [item, setItem] = useState<ItemCatalogo | null>(null);
  const [cargando, setCargando] = useState(true);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    let activo = true;

    async function cargarDetalle() {
      if (!idItem) {
        if (activo) {
          setItem(null);
          setErrorText("Falta ID del producto.");
          setCargando(false);
        }
        return;
      }

      if (activo) {
        setCargando(true);
        setErrorText("");
      }

      try {
        const { data, error } = await supabase
          .from("catalogo")
          .select("id, codigo, titulo, descripcion, precio, created_at, detalle")
          // CAMBIO 2: Buscamos en la base de datos por la columna 'id'
          .eq("id", idItem)
          .maybeSingle();

        if (error) {
          console.error("Error Supabase:", error);
          throw error;
        }

        if (activo) {
          setItem((data ?? null) as ItemCatalogo | null);

          if (!data) {
            setErrorText("Elemento no encontrado.");
          }
        }
      } catch (error: unknown) {
        console.error("Error al cargar el detalle:", error);
        const mensaje =
          error instanceof Error
            ? error.message
            : typeof error === "object" && error !== null && "message" in error
              ? String(error.message)
              : String(error);

        if (activo) {
          setItem(null);
          setErrorText("No fue posible cargar el detalle: " + mensaje);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    void cargarDetalle();

    return () => {
      activo = false;
    };
  }, [idItem]);

  if (cargando) {
    return (
      <ScrollView contentContainerStyle={[styles.container, styles.centro]}>
        <ActivityIndicator size="large" color="#2F7D4A" />
        <Text style={styles.cargandoTexto}>Consultando detalle en Supabase...</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {item ? (
        <>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.codigo}>Código: {item.codigo}</Text>
          <Text style={styles.descripcion}>{item.descripcion}</Text>
          
          <Text style={styles.subtituloDetalle}>Especificaciones:</Text>
          <Text style={styles.detalle}>{item.detalle}</Text>

          {item.precio != null ? (
            <Text style={styles.precio}>{formatearPrecio(item.precio)}</Text>
          ) : null}
        </>
      ) : (
        <Text style={styles.mensaje}>{errorText || "No hay información para mostrar."}</Text>
      )}

      <Pressable style={styles.boton} onPress={() => router.back()}>
        <Text style={styles.botonTexto}>Regresar al catálogo</Text>
      </Pressable>
    </ScrollView>
  );
}

function formatearPrecio(precio: number | string) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Number(precio));
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F7F8",
    flexGrow: 1,
    padding: 24,
  },
  centro: {
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    color: "#1E3447",
    fontSize: 27,
    fontWeight: "bold",
    lineHeight: 34,
    marginBottom: 8,
  },
  codigo: {
    color: "#0F776C",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.7,
    marginBottom: 18,
    textTransform: "uppercase",
  },
  descripcion: {
    color: "#334155",
    fontSize: 17,
    lineHeight: 25,
    marginBottom: 20,
  },
  subtituloDetalle: {
    color: "#1E3447",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
  },
  detalle: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D9E5E4",
    borderRadius: 12,
    borderWidth: 1,
    color: "#475569",
    fontSize: 16,
    lineHeight: 24,
    padding: 16,
  },
  precio: {
    color: "#0F776C",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
  },
  cargandoTexto: {
    color: "#0F776C",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
  },
  mensaje: {
    color: "#475569",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 28,
    textAlign: "center",
  },
  boton: {
    alignItems: "center",
    backgroundColor: "#0F776C",
    borderRadius: 12,
    elevation: 2,
    marginTop: 32,
    padding: 15,
    shadowColor: "#0F776C",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
  },
  botonTexto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});