import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerfilUsuario = ({ navigation }: any) => {
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const response = await fetch(`localhost:3000/usuarios/${userId}`);
          const data = await response.json();

          if (response.ok) {
            setUsuario(data);
          } else {
            Alert.alert('Error', 'No se pudo obtener los datos del usuario');
          }
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        Alert.alert('Error', 'Error al obtener los datos');
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      navigation.replace('Home');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar sesión. Inténtalo nuevamente.');
    }
  };

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
            <Image
                source={require('@/assets/images/iconoGota.png')}
                style={styles.logo}
            />
            <Text style={styles.headerTitle}>SmartStream</Text>
        </View>


      {/* Contenido */}
      <View style={styles.contentContainer}>
        {/* Perfil */}
        <View style={styles.profileContainer}>
          <Image
            source={require('@/assets/images/iconoPerfil.png')}
            style={styles.profileIcon}
          />
          <View style={styles.profileTextContainer}>
            <Text style={styles.userName}>{usuario.nombre}</Text>
            <Text style={styles.userNumber}>Número: {usuario.telefono}</Text>
          </View>
        </View>

        {/* Contenedor: Correo */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Correo</Text>
          <Text style={styles.infoText}>{usuario.correo_electronico}</Text>
        </View>

        {/* Contenedor: Contraseña */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contraseña</Text>
          <Text style={styles.infoText}>**********</Text>
        </View>

        {/* Contenedor: Gasto de Agua */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gasto de agua al mes</Text>
          <Text style={styles.waterUsageItem}>🚿 Regadera: 4800 L</Text>
          <Text style={styles.waterUsageItem}>🧼 Lavamanos: 120 L</Text>
          <Text style={styles.waterUsageItem}>🍽️ Lavatrastes: 6720 L</Text>
          <Text style={styles.totalUsage}>Gasto total al mes: 11,640 L</Text>
        </View>

        {/* Botón de cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366', // Fondo principal
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a2b4f',
    width: '100%',
    paddingVertical: 20,

  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    },
  appTitle: {
    color: '#00BFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#4A90E2', // Fondo azul más claro
    paddingTop: 20,
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginVertical: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#CCCCCC', // Fondo gris claro para el ícono
  },
  profileTextContainer: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
  },
  userNumber: {
    fontSize: 16,
    color: '#ffffff',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '90%',
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  waterUsageItem: {
    fontSize: 16,
    color: '#003366',
    marginBottom: 5,
    textAlign: 'center',
  },
  totalUsage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
    marginTop: 10,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF4500',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PerfilUsuario;
