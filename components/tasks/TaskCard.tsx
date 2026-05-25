import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card } from '../common/Card';
import { ThemedText } from '../themed-text';
import { Incident } from '../../api/types';
import { PriorityBadge } from '../incidents/PriorityBadge';
import { StatusBadge } from '../incidents/StatusBadge';

interface TaskCardProps {
  task: Incident;
  onPress: () => void;
}

export const TaskCard = ({ task, onPress }: TaskCardProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="defaultSemiBold" numberOfLines={1} style={styles.title}>
            {task.title}
          </ThemedText>
          <PriorityBadge priority={task.priorityLevel} />
        </View>

        <View style={styles.footer}>
          <StatusBadge status={task.status} />
          <ThemedText style={styles.zoneText}>{task.zone}</ThemedText>
        </View>

        <ThemedText numberOfLines={2} style={styles.description}>
          {task.description}
        </ThemedText>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  zoneText: {
    fontSize: 12,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#444',
  },
});
