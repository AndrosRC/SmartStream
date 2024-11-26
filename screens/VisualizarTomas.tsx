import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EliminarToma from './EliminarToma';

const VisualizarTomas = ({ route, navigation }: any) => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      } else if (route.params?.userId) {
        setUserId(route.params.userId);
      } else {
        console.error('No se pudo obtener el userId');
      }
    };

    getUserId();
  }, [route.params]);

  const AgregarToma = () => {
    navigation.navigate('AgregarToma');
  };

  const PruebaArduino = () => {
    navigation.navigate('PruebaArduino');
  };

  const PerfilUsuario = () => {
    navigation.navigate('PerfilUsuario');
  };

  const VerConsumo = () => {
    navigation.navigate('VerConsumo');
  };

  if (!userId) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/iconoGota.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>SmartStream</Text>
        <TouchableOpacity style={styles.profileButton} onPress={PerfilUsuario}>
          <Image source={require('@/assets/images/iconoPerfil.png')} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>No has agregado ninguna llave...</Text>
      </View>

      <TouchableOpacity style={styles.pruebaArduinoButton} onPress={PruebaArduino}>
        <Text style={styles.pruebaArduinoText}>Prueba de Arduino</Text>
      </TouchableOpacity>

      {/* Contenedor para los botones flotantes */}
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={AgregarToma}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.viewConsumptionButton}  onPress={() => navigation.navigate('EliminarToma')}>
          <Text style={styles.viewConsumptionText}>-</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default VisualizarTomas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a6da7',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a2b4f',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 0,
  },
  logo: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 5,
  },
  profileIcon: {
    width: 30,
    height: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    paddingVertical: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  cardText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pruebaArduinoButton: {
    backgroundColor: '#1a2b4f',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  pruebaArduinoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  floatingButtonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    right: 20,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#000',
  },
  addButtonText: {
    color: '#000',
    fontSize: 36,
    fontWeight: 'bold',
  },
  viewConsumptionButton: {
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  viewConsumptionText: {
    color: '#000',
    fontSize: 30,
  },
});
