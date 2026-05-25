import { Slot } from 'expo-router';

export default function InactiveLayout() {
  // En Expo 54, un layout DEBE renderizar algo (como Slot) o la app dará error azul.
  return <Slot />;
}
