import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Loading } from '@/components/common/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Button } from '@/components/common/Button';
import { IncidentCard } from '@/components/incidents/IncidentCard';
import { useAsync } from '@/hooks/useAsync';
import { incidentService } from '@/api/incidentService';

export default function IncidentDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: incident, loading, error, execute: fetchIncident } = useAsync(() =>
    incidentService.getById(id as string)
  );

  useEffect(() => {
    if (id) fetchIncident();
  }, [id, fetchIncident]);

  if (loading) return <Loading message="Cargando detalles..." />;
  if (error) return <ThemedView style={styles.centered}><ErrorMessage message={error} /></ThemedView>;
  if (!incident) return null;

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.headerTitle}>Detalle de Incidencia</ThemedText>

        <IncidentCard incident={incident} />

        <View style={styles.detailsContainer}>
          <ThemedText type="defaultSemiBold">Información Técnica</ThemedText>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>SLA Restante:</ThemedText>
            <ThemedText>{incident.slaMinutes} minutos</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>Fecha Límite:</ThemedText>
            <ThemedText>{new Date(incident.slaDueAt).toLocaleString()}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <ThemedText style={styles.label}>Reportado por:</ThemedText>
            <ThemedText>{incident.reportedBy?.fullName || 'Sistema'}</ThemedText>
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title="Añadir Evidencia"
            onPress={() => router.push({ pathname: '/evidence', params: { incidentId: incident.id } })}
            type="primary"
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
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    marginBottom: 20,
  },
  detailsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    gap: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: '600',
    color: '#666',
  },
  actions: {
    marginTop: 30,
    gap: 12,
  },
  backButton: {
    marginTop: 8,
  }
});
