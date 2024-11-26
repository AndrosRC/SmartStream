import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EliminarToma = ({ navigation }: any) => {
  const [tomas, setTomas] = useState<any[]>([]);

  const PerfilUsuario = () => {
    navigation.navigate('PerfilUsuario');
  };

  const fetchTomas = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await fetch(`http://localhost:3000/getTomas/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setTomas(data.tomas);
      } else {
        showAlert('Error', data.error || 'No se pudo obtener las tomas');
      }
    } catch (error) {
      console.error('Error al obtener las tomas:', error);
      showAlert('Error', 'Hubo un problema al conectar con el servidor');
    }
  };

  useEffect(() => {
    fetchTomas();
  }, []);

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message, [{ text: 'OK', onPress: () => {} }], { cancelable: false });
  };

  const handleEliminar = async (id_toma: number, nombre_toma: string) => {
    // Confirmación antes de eliminar
    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de que quieres eliminar la toma de agua "${nombre_toma}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`http://localhost:3000/tomas/${id_toma}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              const data = await response.json();

              if (response.ok) {
                showAlert('Éxito', 'Toma de agua eliminada correctamente');
                setTomas(tomas.filter(toma => toma.id_toma !== id_toma)); // Actualiza la lista de tomas localmente
              } else {
                showAlert('Error', data.error || 'No se pudo eliminar la toma');
              }
            } catch (error) {
              console.error('Error en el servidor:', error);
              showAlert('Error', 'Hubo un problema al conectar con el servidor');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/iconoGota.png')}
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>SmartStream</Text>
        <TouchableOpacity style={styles.profileButton} onPress={PerfilUsuario}>
          <Image
            source={require('@/assets/images/iconoPerfil.png')}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>ELIMINAR LLAVE</Text>

        <Text style={styles.label}>Tomas disponibles:</Text>
        <View style={styles.pickerContainer}>
          {tomas.map((toma) => (
            <View key={toma.id_toma} style={styles.tomaItem}>
              <Text style={styles.tomaText}>{toma.nombre_toma}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleEliminar(toma.id_toma, toma.nombre_toma)}
              >
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default EliminarToma;

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
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 15,
  },
  tomaItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tomaText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
