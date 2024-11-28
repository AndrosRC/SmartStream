import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Importa useFocusEffect

const VisualizarTomas = ({ route, navigation }: any) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [tomas, setTomas] = useState<any[]>([]); // Estado para almacenar las tomas

  useEffect(() => {
    const getUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
        fetchTomas(storedUserId); // Obtener tomas al cargar el userId
      } else if (route.params?.userId) {
        setUserId(route.params.userId);
        fetchTomas(route.params.userId);
      } else {
        console.error('No se pudo obtener el userId');
      }
    };

    getUserId();
  }, [route.params]);

  // Función para obtener las tomas del backend
  const fetchTomas = async (userId: string) => {
    try {
      const response = await fetch(`http://192.168.0.110:3000/getTomas/${userId}`); // Reemplaza con tu URL del backend
      const data = await response.json();
      if (response.ok) {
        setTomas(data.tomas || []); // Asegura que se establezca un array vacío si no hay datos
      } else {
        console.warn('No se pudo obtener las tomas:', data.message || 'Error desconocido');
        setTomas([]); // Si hay un error, establece el estado como vacío
      }
    } catch (error) {
      console.error('Error al obtener tomas:', error);
      setTomas([]); // Maneja fallos en la conexión mostrando la lista vacía
    }
  };

  // Cuando la pantalla se enfoca, vuelve a cargar las tomas
  useFocusEffect(
    React.useCallback(() => {
      if (userId) {
        fetchTomas(userId); // Recarga las tomas al regresar a la pantalla
      }
    }, [userId])
  );

  const AgregarToma = () => {
    navigation.navigate('AgregarToma');
  };

  const EliminarToma = () => {
    navigation.navigate('EliminarToma');
  };

  const PerfilUsuario = () => {
    navigation.navigate('PerfilUsuario');
  };

  // Determina la imagen dependiendo del tipo de toma
  const getImageForToma = (tipo: string) => {
    switch (tipo) {
      case 'Regadera':
        return require('@/assets/images/Regadera.jpeg');
      case 'Lavamanos':
        return require('@/assets/images/Lavamanos.jpg');
      case 'Lavatrastes':
        return require('@/assets/images/Lavatrastes.jpeg');
      default:
        return require('@/assets/images/basura.png');
    }
  };

  if (!userId) {
    return <Text>Cargando...</Text>;
  }

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

      {/* Contenido principal */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {tomas.length === 0 ? (
          <View style={styles.noTomasContainer}>
            <Text style={styles.cardText}>No has agregado ninguna llave aún...</Text>
          </View>
        ) : (
          tomas.map((toma, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tomaCard}
              onPress={() => navigation.navigate('ConfigurarLlave', { tomaId: toma.id_toma })}
            >
              <View style={styles.tomaInfo}>
                <Text style={styles.tomaText}>Llave: {toma.nombre_toma}</Text>
                <Text style={styles.tomaText}>Tipo: {toma.tipo_toma}</Text>
              </View>
              <Image source={getImageForToma(toma.tipo_toma)} style={styles.tomaImage} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Botones flotantes */}
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={AgregarToma}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={EliminarToma}>
          <Text style={styles.deleteButtonText}>🗑️</Text>
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
    zIndex: 1,
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
  scrollContainer: {
    paddingTop: 100,
    alignItems: 'center',
  },
  noTomasContainer: {
    marginTop: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    paddingVertical: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tomaCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
    padding: 15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  tomaInfo: {
    flex: 1,
    marginRight: 15,
  },
  tomaText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  tomaImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  floatingButtonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    right: 20,
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
  deleteButton: {
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  deleteButtonText: {
    fontSize: 20,
    color: '#000',
  },
});
