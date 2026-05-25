import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { Loading } from '@/components/common/Loading';
import { View, StyleSheet } from 'react-native';

export default function Index() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Pequeño delay para asegurar que el motor de navegación de Expo esté listo
    const timer = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isReady && !loading) {
      if (isAuthenticated) {
        router.replace('/tasks');
      } else {
        router.replace('/login');
      }
    }
  }, [isReady, loading, isAuthenticated]);

  return (
    <View style={styles.container}>
      <Loading message="Iniciando UrbanPulse..." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
