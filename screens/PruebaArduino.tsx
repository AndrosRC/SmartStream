import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const PruebaArduino = () => {
  const IP_ESP32 = 'http://172.31.98.158'; // Cambia esto por la IP asignada a tu ESP32

  const abrirValvula = async () => {
    try {
      const response = await axios.get(`${IP_ESP32}/abrir`);
      Alert.alert("Respuesta del ESP32", response.data);
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el ESP32");
    }
  };

  const cerrarValvula = async () => {
    try {
      const response = await axios.get(`${IP_ESP32}/cerrar`);
      Alert.alert("Respuesta del ESP32", response.data);
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el ESP32");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control de Válvula</Text>

      <TouchableOpacity style={styles.card} onPress={abrirValvula}>
        <Text style={styles.cardText}>Abrir Válvula</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={cerrarValvula}>
        <Text style={styles.cardText}>Cerrar Válvula</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a6da7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  cardText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PruebaArduino;