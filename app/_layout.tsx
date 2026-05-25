import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/hooks/useAuth';

// Evita que la pantalla de carga se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { loading } = useAuth();

  useEffect(() => {
    // Ocultamos la pantalla de carga solo cuando sepamos si el usuario está logueado
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="tasks" options={{ title: 'INCIDENCIAS' }} />
        <Stack.Screen name="incident-detail" options={{ title: 'Detalle de Incidencia', headerShown: true }} />
        <Stack.Screen name="create-incident" options={{ title: 'Reportar Incidencia', headerShown: true }} />
        <Stack.Screen name="evidence" options={{ title: 'Añadir Evidencia', headerShown: true }} />
        <Stack.Screen name="profile" options={{ title: 'Perfil', headerShown: true }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
