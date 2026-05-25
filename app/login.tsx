import React, { useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, Animated, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { authService } from '@/api/authService';
import { ErrorMessage } from '@/components/common/ErrorMessage';

type AuthMode = 'login' | 'register';

export default function LoginScreen() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Animaciones
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const cardScale = useRef(new Animated.Value(1)).current;

  const animateTransition = (newMode: AuthMode) => {
    // 1. Encoger y desvanecer
    Animated.parallel([
      Animated.timing(cardOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(cardScale, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // 2. Cambiar modo y limpiar errores
      setAuthMode(newMode);
      setError(null);

      // 3. Crecer y aparecer
      Animated.parallel([
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(cardScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor ingresa todos los campos');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await authService.login(email, password);
      router.replace('/tasks');
    } catch (e: any) {
      setError(e.message || 'Credenciales inválidas o error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      setError('Por favor ingresa todos los campos');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(fullName, email, password);
      if (response.accessToken) {
        router.replace('/tasks');
      } else {
        setError('Cuenta creada. Por favor inicia sesión.');
        animateTransition('login');
      }
    } catch (e: any) {
      setError(e.message || 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <ThemedText type="title" style={styles.heroTitle}>
            Centro de mando para respuesta urbana inteligente
          </ThemedText>
          {authMode === 'login' && (
            <ThemedText style={styles.heroSubtitle}>
              Gestión operativa en tiempo real
            </ThemedText>
          )}
        </View>

        {/* Animated Auth Card */}
        <Animated.View
          style={[
            styles.authCard,
            {
              opacity: cardOpacity,
              transform: [{ scale: cardScale }]
            }
          ]}
        >
          <ThemedText type="subtitle" style={styles.cardTitle}>
            {authMode === 'login' ? 'Ingresar' : 'Crear cuenta'}
          </ThemedText>

          {authMode === 'login' && (
            <ThemedText style={styles.cardInfo}>Usa tus credenciales operativas.</ThemedText>
          )}

          {error && <ErrorMessage message={error} />}

          <View style={styles.form}>
            {authMode === 'register' && (
              <Input
                label="Nombre completo"
                value={fullName}
                onChangeText={setFullName}
                placeholder="Juan Pérez"
                style={styles.input}
              />
            )}

            <Input
              label="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              placeholder="ejemplo@urbanpulse.com"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
            />

            <Input
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              placeholder="********"
              secureTextEntry
              style={styles.input}
            />

            <Button
              title={authMode === 'login' ? 'Ingresar' : 'Registrarme'}
              onPress={authMode === 'login' ? handleLogin : handleRegister}
              loading={loading}
              style={styles.actionButton}
            />

            <TouchableOpacity
              onPress={() => animateTransition(authMode === 'login' ? 'register' : 'login')}
              style={styles.switchButton}
            >
              <ThemedText style={styles.switchText}>
                {authMode === 'login'
                  ? '¿No tienes cuenta? Regístrate'
                  : 'Volver al login'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Fondo claro
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  heroTitle: {
    fontSize: 28,
    textAlign: 'center',
    color: '#1E293B',
    fontWeight: '800',
    lineHeight: 36,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 12,
    textAlign: 'center',
  },
  authCard: {
    backgroundColor: '#E6F4FE', // Card azul grisáceo
    borderRadius: 24,
    padding: 32,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 24,
    color: '#0F172A',
    fontWeight: '700',
    marginBottom: 8,
  },
  cardInfo: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 24,
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: '#FFFFFF', // Inputs claros
    borderRadius: 12,
    borderWidth: 0,
  },
  actionButton: {
    backgroundColor: '#064E3B', // Botón verde oscuro
    borderRadius: 12,
    height: 56,
    marginTop: 10,
  },
  switchButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  switchText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
