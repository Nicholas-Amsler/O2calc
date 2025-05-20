import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

type State = { hasError: boolean; error?: Error };

export default class ErrorBoundary extends React.Component<{}, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // you could log to an external service here
    console.warn('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.center}>
          <Text style={styles.title}>Something went wrong.</Text>
          <Text style={styles.message}>{this.state.error?.message}</Text>
          <Button title="Reload App" onPress={() => { this.setState({ hasError: false }); }} />
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  message: { marginBottom: 16, textAlign: 'center' },
});
