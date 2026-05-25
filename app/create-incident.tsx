import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { incidentService } from '@/api/incidentService';
import { IncidentType } from '@/api/types';
import { LABELS } from '@/constants/labels';
import { TouchableOpacity } from 'react-native';

export default function CreateIncidentScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'OTHER' as IncidentType,
    severity: '5',
    zone: '',
    addressReference: '',
  });

  const incidentTypes = Object.entries(LABELS.INCIDENT_TYPES);

  const handleCreate = async () => {
    if (!form.title || !form.description || !form.zone) {
      Alert.alert('Error', 'Por favor completa los campos obligatorios');
      return;
    }

    setLoading(true);
    try {
      await incidentService.create({
        ...form,
        severity: Number(form.severity),
        latitude: -16.5,
        longitude: -68.15,
      });
      Alert.alert('Éxito', 'Incidencia reportada correctamente');
      router.replace('/tasks');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo crear la incidencia');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText type="title" style={styles.header}>Reportar Incidencia</ThemedText>

        <Input
          label="Título *"
          value={form.title}
          onChangeText={(text) => setForm({ ...form, title: text })}
          placeholder="Ej: Bache profundo en la calzada"
        />

        <View style={styles.typeContainer}>
          <ThemedText type="defaultSemiBold" style={styles.label}>Tipo de Incidencia</ThemedText>
          <View style={styles.typeGrid}>
            {incidentTypes.map(([key, label]) => (
              <TouchableOpacity
                key={key}
                style={[styles.typeButton, form.type === key && styles.typeButtonSelected]}
                onPress={() => setForm({ ...form, type: key as IncidentType })}
              >
                <ThemedText style={[styles.typeText, form.type === key && styles.typeTextSelected]}>
                  {label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Input
          label="Descripción *"
          value={form.description}
          onChangeText={(text) => setForm({ ...form, description: text })}
          multiline
          numberOfLines={4}
          placeholder="Describe detalladamente lo ocurrido..."
          style={styles.textArea}
        />

        <Input
          label="Zona *"
          value={form.zone}
          onChangeText={(text) => setForm({ ...form, zone: text })}
          placeholder="Ej: Sopocachi, Centro, etc."
        />

        <Input
          label="Dirección de Referencia"
          value={form.addressReference}
          onChangeText={(text) => setForm({ ...form, addressReference: text })}
          placeholder="Ej: Frente al Cine Monje Campero"
        />

        <View style={styles.actions}>
          <Button
            title="Enviar Reporte"
            onPress={handleCreate}
            loading={loading}
          />
          <Button
            title="Cancelar"
            onPress={() => router.back()}
            type="outline"
            style={styles.cancelButton}
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
  scrollContent: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  typeContainer: {
    marginBottom: 16,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#064E3B', // Cambiado a verde institucional
  },
  typeButtonSelected: {
    backgroundColor: '#064E3B', // Cambiado a verde institucional
  },
  typeText: {
    color: '#064E3B', // Cambiado a verde institucional
    fontSize: 13,
  },
  typeTextSelected: {
    color: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  actions: {
    marginTop: 24,
    gap: 12,
  },
  cancelButton: {
    marginTop: 4,
  }
});
