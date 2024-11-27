import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EliminarToma = ({ navigation }: any) => {
  const [tomas, setTomas] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false); // Estado para evitar múltiples solicitudes

  const PerfilUsuario = () => {
    navigation.navigate('PerfilUsuario');
  };

  const fetchTomas = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await fetch(`http://172.31.99.21:3000/getTomas/${userId}`); // Cambia con tu IP del servidor
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
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message, [{ text: 'OK', onPress: () => {} }], { cancelable: false });
    }
  };

  const handleEliminar = async (id_toma: number, nombre_toma: string) => {
    if (isProcessing) return; // Evita múltiples solicitudes simultáneas

    setIsProcessing(true); // Marca como "en proceso"
    console.log(`Intentando eliminar la toma con id: ${id_toma}, nombre: ${nombre_toma}`);

    const confirmDelete = Platform.OS === 'web'
      ? window.confirm(`¿Estás seguro de que quieres eliminar la toma de agua "${nombre_toma}"?`)
      : await new Promise<boolean>((resolve) =>
          Alert.alert(
            'Confirmar eliminación',
            `¿Estás seguro de que quieres eliminar la toma de agua "${nombre_toma}"?`,
            [
              { text: 'Cancelar', style: 'cancel', onPress: () => resolve(false) },
              { text: 'Eliminar', style: 'destructive', onPress: () => resolve(true) },
            ],
            { cancelable: false }
          )
        );

    if (!confirmDelete) {
      setIsProcessing(false); // Libera bloqueo si se cancela
      return;
    }

    try {
      const response = await fetch(`http://172.31.99.21:3000/tomas/${id_toma}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (response.ok) {
        setTomas((prevTomas) => prevTomas.filter((toma) => toma.id_toma !== id_toma));
        showAlert('Éxito', `Toma de agua "${nombre_toma}" eliminada correctamente`);
      } else {
        showAlert('Error', data.error || 'No se pudo eliminar la toma');
      }
    } catch (error) {
      console.error('Error en el servidor:', error);
      showAlert('Error', 'Hubo un problema al conectar con el servidor');
    } finally {
      setIsProcessing(false); // Libera bloqueo tras finalizar
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('@/assets/images/iconoGota.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>SmartStream</Text>
        <TouchableOpacity style={styles.profileButton} onPress={PerfilUsuario}>
          <Image source={require('@/assets/images/iconoPerfil.png')} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.card}>
        <Text style={styles.title}>ELIMINAR LLAVE</Text>
        <Text style={styles.label}>Tomas disponibles:</Text>
        <View style={styles.pickerContainer}>
          {tomas.map((toma) => (
            <View key={toma.id_toma} style={styles.tomaItem}>
              <Text style={styles.tomaText}>{toma.nombre_toma}</Text>
              <TouchableOpacity
                style={[styles.deleteButton, isProcessing && { backgroundColor: '#ccc' }]} // Cambia estilo si está deshabilitado
                onPress={() => handleEliminar(toma.id_toma, toma.nombre_toma)}
                disabled={isProcessing} // Deshabilita si está procesando
              >
                <Text style={styles.deleteButtonText}>
                  {isProcessing ? 'Procesando...' : 'Eliminar'}
                </Text>
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
