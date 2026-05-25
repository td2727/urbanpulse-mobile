import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';

export default function ProfileScreen() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  // Generar iniciales de forma segura
  const getInitials = () => {
    if (!user?.fullName) return 'UP';
    return user.fullName
      .split(' ')
      .filter(n => n.length > 0)
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatarPlaceholder}>
            <ThemedText style={styles.avatarText}>{getInitials()}</ThemedText>
          </View>
          <ThemedText type="title">{user?.fullName || 'Usuario UrbanPulse'}</ThemedText>
          <ThemedText style={styles.roleText}>{user?.role || 'Operador'}</ThemedText>
        </View>

        <Card style={styles.infoCard}>
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>Información de Cuenta</ThemedText>

          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>Email:</ThemedText>
            <ThemedText>{user?.email || 'N/A'}</ThemedText>
          </View>

          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>Estado:</ThemedText>
            <ThemedText style={{ color: user?.active ? '#34C759' : '#FF3B30' }}>
              {user?.active ? 'Activo' : 'Inactivo'}
            </ThemedText>
          </View>

          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>ID de Usuario:</ThemedText>
            <ThemedText>#{user?.id || '---'}</ThemedText>
          </View>
        </Card>

        <View style={styles.actions}>
          <Button
            title="Cerrar Sesión"
            onPress={handleLogout}
            type="danger"
            loading={loading}
          />
          <Button
            title="Volver"
            onPress={() => router.back()}
            type="outline"
            style={styles.backButton}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 24, paddingTop: 80 },
  header: { alignItems: 'center', marginBottom: 40 },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
  },
  avatarText: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
  roleText: { color: '#666', fontSize: 16, marginTop: 4 },
  infoCard: { gap: 16 },
  cardTitle: { fontSize: 18, marginBottom: 8 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  label: { color: '#666', fontWeight: '600' },
  actions: { marginTop: 40, gap: 12 },
  backButton: { marginTop: 8 }
});
