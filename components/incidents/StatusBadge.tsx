import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../themed-text';
import { COLORS } from '../../constants/colors';
import { LABELS } from '../../constants/labels';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusColor = () => {
    switch (status?.toUpperCase()) {
      case 'PENDING': return COLORS.warning;
      case 'IN_PROGRESS': return COLORS.info;
      case 'RESOLVED': return COLORS.success;
      case 'CANCELLED': return COLORS.danger;
      default: return COLORS.gray;
    }
  };

  const getStatusLabel = () => {
    return LABELS.STATUS[status as keyof typeof LABELS.STATUS] || status;
  };

  return (
    <View style={[styles.badge, { backgroundColor: getStatusColor() }]}>
      <ThemedText style={styles.text}>{getStatusLabel()}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
