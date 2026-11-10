import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

// Adaptador de almacenamiento que evita el error del servidor
const CustomStorage = {
  getItem: async (key: string) => {
    if (Platform.OS === "web" && typeof window === "undefined") return null;
    return await AsyncStorage.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    if (Platform.OS === "web" && typeof window === "undefined") return;
    return await AsyncStorage.setItem(key, value);
  },
  removeItem: async (key: string) => {
    if (Platform.OS === "web" && typeof window === "undefined") return;
    return await AsyncStorage.removeItem(key);
  },
};

// Tu URL (basada en tu captura de pantalla anterior)
const supabaseUrl = "https://tyrgfvwlmthklorjyulh.supabase.co"; 

// Tu clave pública (publishable) que acabas de proporcionar
const supabaseAnonKey = "sb_publishable_q0wIDPFt4okvej0dvLtomQ_Z1taS49r";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: CustomStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});