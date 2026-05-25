import React, { useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TaskCard } from '@/components/tasks/TaskCard';
import { Loading } from '@/components/common/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { useAsync } from '@/hooks/useAsync';
import { assignmentService } from '@/api/assignmentService';
import { useAuth } from '@/hooks/useAuth';

export default function TasksScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: tasks, loading, error, execute: fetchTasks } = useAsync(assignmentService.getMyAssignments);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const onRefresh = useCallback(() => {
    fetchTasks();
  }, [fetchTasks]);

  if (loading && !tasks) {
    return <Loading message="Cargando tus tareas..." />;
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View>
          <ThemedText type="title">INCIDENCIAS</ThemedText>
          <ThemedText style={styles.welcomeText}>Hola, {user?.fullName || 'Operador'}</ThemedText>
        </View>
        <TouchableOpacity onPress={() => router.push('/profile')} style={styles.profileButton}>
          <ThemedText type="link">Perfil</ThemedText>
        </TouchableOpacity>
      </View>

      {error && <ErrorMessage message={error} />}

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => router.push({ pathname: '/incident-detail', params: { id: item.id } })}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          !loading ? (
            <ThemedText style={styles.emptyText}>No tienes tareas asignadas en este momento.</ThemedText>
          ) : null
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/create-incident')}
      >
        <ThemedText style={styles.fabText}>+</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
  },
  profileButton: {
    paddingTop: 8,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#064E3B', // Verde oscuro igual que en auth
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
