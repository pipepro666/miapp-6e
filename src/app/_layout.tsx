import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0c0a7a",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: "#FFF7FA",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Inicio" }}
      />

      <Stack.Screen
        name="formulario"
        options={{ title: "Formulario" }}
      />

      <Stack.Screen
        name="resultado"
        options={{ title: "Datos registrados" }}
      />

      <Stack.Screen
        name="imagenes"
        options={{ title: "Galería" }}
      />

      <Stack.Screen
        name="contacto"
        options={{ title: "Contacto" }}
      />
    </Stack>
  );
}

