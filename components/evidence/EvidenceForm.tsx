import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { EvidenceType } from '../../api/types';
import { LABELS } from '../../constants/labels';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from '../themed-text';

interface EvidenceFormProps {
  onSubmit: (data: { type: EvidenceType; observation: string }) => void;
  loading?: boolean;
}

export const EvidenceForm = ({ onSubmit, loading }: EvidenceFormProps) => {
  const [observation, setObservation] = useState('');
  const [type, setType] = useState<EvidenceType>('PROGRESS');

  const evidenceTypes = Object.entries(LABELS.EVIDENCE_TYPES);

  const handleSubmit = () => {
    onSubmit({ type, observation });
  };

  return (
    <View style={styles.container}>
      <ThemedText type="defaultSemiBold" style={styles.label}>Tipo de Evidencia</ThemedText>
      <View style={styles.typeGrid}>
        {evidenceTypes.map(([key, label]) => (
          <TouchableOpacity
            key={key}
            style={[styles.typeButton, type === key && styles.typeButtonSelected]}
            onPress={() => setType(key as EvidenceType)}
          >
            <ThemedText style={[styles.typeText, type === key && styles.typeTextSelected]}>
              {label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      <Input
        label="Observación"
        placeholder="Escribe los detalles aquí..."
        multiline
        numberOfLines={4}
        value={observation}
        onChangeText={setObservation}
        style={styles.textArea}
      />

      <Button
        title="Enviar Evidencia"
        onPress={handleSubmit}
        loading={loading}
        disabled={!observation.trim()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  typeButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  typeButtonSelected: {
    backgroundColor: '#007AFF',
  },
  typeText: {
    color: '#007AFF',
    fontSize: 13,
  },
  typeTextSelected: {
    color: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});
