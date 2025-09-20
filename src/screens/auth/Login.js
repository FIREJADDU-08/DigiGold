import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';

// Simple, reusable login screen for React Native
// Usage: <LoginScreen onLogin={(credentials) => { /* call your API */ }} />

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      Alert.alert('Validation', 'Please enter your email');
      return false;
    }
    // very simple email check
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      Alert.alert('Validation', 'Please enter a valid email');
      return false;
    }
    if (!password) {
      Alert.alert('Validation', 'Please enter your password');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      // If caller provided an onLogin prop, call it and allow caller to handle API.
      if (onLogin) {
        await onLogin({ email, password });
        // onLogin should throw or return appropriately
      } else {
        // Demo: fake network delay
        await new Promise((res) => setTimeout(res, 1200));
        Alert.alert('Success', `Logged in as ${email}`);
      }
    } catch (err) {
      console.warn(err);
      Alert.alert('Login failed', err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />

        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
          <TouchableOpacity
            onPress={() => setShowPassword((s) => !s)}
            disabled={loading}
            style={styles.showBtn}
          >
            <Text style={styles.showBtnText}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => Alert.alert('Forgot Password', 'Implement recovery flow')}
          disabled={loading}
        >
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => Alert.alert('Sign Up', 'Go to signup screen')}>
            <Text style={styles.signupText}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7fb',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 18,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showBtn: {
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  showBtnText: {
    color: '#1a73e8',
    fontWeight: '600',
  },
  forgot: {
    color: '#1a73e8',
    textAlign: 'right',
    marginVertical: 10,
  },
  button: {
    height: 48,
    borderRadius: 8,
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 14,
  },
  signupText: {
    color: '#1a73e8',
    fontWeight: '600',
  },
});
