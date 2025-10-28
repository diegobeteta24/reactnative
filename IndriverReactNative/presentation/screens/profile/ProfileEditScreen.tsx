import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Api from '../../services/api';

export default function ProfileEditScreen() {
  const route: any = useRoute();
  const initialToken = route?.params?.token ?? '';
  const [token, setToken] = useState(initialToken);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialToken) {
      setToken(initialToken);
    }
  }, [initialToken]);

  const handleUpdate = async () => {
    if (!token) {
      Alert.alert('Error', 'Proporciona el token JWT en el campo Token.');
      return;
    }
    setLoading(true);
    try {
      const data: any = {};
      if (name) data.name = name;
      if (phone) data.phone = phone;
      if (imageUrl) data.image = imageUrl; // backend accepts image as URL

      const res = await Api.updateUserJson(token, data);
      setLoading(false);
      Alert.alert('Respuesta', JSON.stringify(res, null, 2));
    } catch (err) {
      setLoading(false);
      Alert.alert('Error', String(err));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>JWT Token (obtenlo desde /login)</Text>
      <TextInput style={styles.input} value={token} onChangeText={setToken} placeholder="Token JWT" multiline />

      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nombre" />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Teléfono" keyboardType="phone-pad" />

      <Text style={styles.label}>Image URL (opcional)</Text>
      <TextInput style={styles.input} value={imageUrl} onChangeText={setImageUrl} placeholder="https://..." />

      <Button title={loading ? 'Enviando...' : 'Actualizar perfil'} onPress={handleUpdate} disabled={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { marginTop: 12, marginBottom: 4, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6 },
});
