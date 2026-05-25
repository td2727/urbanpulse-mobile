import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { EvidenceForm } from '@/components/evidence/EvidenceForm';
import { evidenceService } from '@/api/evidenceService';
import { EvidenceType } from '@/api/types';
import { Button } from '@/components/common/Button';

export default function EvidenceScreen() {
  const { incidentId } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: { type: EvidenceType; observation: string }) => {
    setLoading(true);
    try {
      await evidenceService.create({
        incidentId: Number(incidentId),
        url: "https://example.com/placeholder.jpg", // En una app real, aquí se subiría la imagen primero
        evidenceType: data.type,
        observation: data.observation,
      });
      Alert.alert('Éxito', 'Evidencia guardada correctamente');
      router.back();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo guardar la evidencia');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.header}>Añadir Evidencia</ThemedText>
        <ThemedText style={styles.subHeader}>Incidente #{incidentId}</ThemedText>

        <View style={styles.formContainer}>
          <EvidenceForm onSubmit={handleSubmit} loading={loading} />
        </View>

        <Button
          title="Cancelar"
          onPress={() => router.back()}
          type="outline"
          style={styles.cancelButton}
          disabled={loading}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  formContainer: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  cancelButton: {
    marginTop: 10,
  },
});
