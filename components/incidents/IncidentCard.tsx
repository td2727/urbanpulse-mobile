import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from '../common/Card';
import { ThemedText } from '../themed-text';
import { Incident } from '../../api/types';
import { PriorityBadge } from './PriorityBadge';
import { StatusBadge } from './StatusBadge';
import { LABELS } from '../../constants/labels';

interface IncidentCardProps {
  incident: Incident;
}

export const IncidentCard = ({ incident }: IncidentCardProps) => {
  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle">{incident.title}</ThemedText>
        <PriorityBadge priority={incident.priorityLevel} />
      </View>

      <ThemedText style={styles.typeText}>
        Tipo: {LABELS.INCIDENT_TYPES[incident.type as keyof typeof LABELS.INCIDENT_TYPES] || incident.type}
      </ThemedText>

      <View style={styles.row}>
        <StatusBadge status={incident.status} />
        <ThemedText style={styles.zoneText}>{incident.zone}</ThemedText>
      </View>

      <ThemedText style={styles.description} numberOfLines={3}>
        {incident.description}
      </ThemedText>

      <ThemedText style={styles.address}>
        📍 {incident.addressReference}
      </ThemedText>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  typeText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  zoneText: {
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  address: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
});
