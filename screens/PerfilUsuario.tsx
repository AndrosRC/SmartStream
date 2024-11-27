import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, TextInput, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VisualizarTomas from './VisualizarTomas';

const PerfilUsuario = ({ navigation }: any) => {
  const VisualizarTomas = () => {
    navigation.navigate('VisualizarTomas');
  };
  
  const [usuario, setUsuario] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ nombre: '', numero_tel: '', correo_electronico: '', contrasena: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const response = await fetch(`http://172.31.99.21:3000/usuarios/${userId}`);
          const data = await response.json();

          if (response.ok) {
            setUsuario(data);
            setUpdatedUser({
              nombre: data.nombre,
              numero_tel: data.numero_tel,
              correo_electronico: data.correo_electronico,
              contrasena: '', // Mantener vacío por seguridad
            });
            console.log(data)
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

  const validateInputs = () => {
    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updatedUser.correo_electronico)) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido');
      return false;
    }

    // Validar teléfono
    const phoneRegex = /^[0-9]{10}$/; // 10 dígitos numéricos
    if (!phoneRegex.test(updatedUser.numero_tel)) {
      Alert.alert('Error', 'Por favor, ingresa un número de teléfono válido (10 dígitos)');
      return false;
    }

    // Validar nombre
    if (updatedUser.nombre.trim() === '') {
      Alert.alert('Error', 'El nombre no puede estar vacío');
      return false;
    }

    // Validar contraseña
    if (updatedUser.contrasena.trim() === '') {
      Alert.alert('Error', 'La contraseña no puede estar vacía');
      return false;
    }

    return true;
  };

  const handleUpdateUser = async () => {
    if (!validateInputs()) return;

    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const response = await fetch(`http://172.31.99.21:3000/actualizarUsuario/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        });

        const data = await response.json();
        if (response.ok) {
          setUsuario({ ...usuario, ...updatedUser });
          Alert.alert('Éxito', 'Datos actualizados correctamente');
          setModalVisible(false);
        } else {
          Alert.alert('Error', data.error || 'No se pudo actualizar el usuario');
        }
      }
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
      Alert.alert('Error', 'Error al actualizar los datos');
    }
  };

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
      <View style={styles.header}>
        <Image source={require('@/assets/images/iconoGota.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>SmartStream</Text>
      </View>

      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={VisualizarTomas} style={styles.navegacion}>
          <Image source={require('@/assets/images/casa.png')} style={styles.home} />
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          <Image source={require('@/assets/images/iconoPerfil.png')} style={styles.profileIcon} />
          <View style={styles.profileTextContainer}>
            <Text style={styles.userName}>{usuario.nombre}</Text>
            <Text style={styles.userNumber}>Número: {usuario.numero_tel}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Correo</Text>
          <Text style={styles.infoText}>{usuario.correo_electronico}</Text>
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.updateButtonText}>Actualizar Datos de Usuario</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Actualizar Datos</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={updatedUser.nombre}
              onChangeText={(text) => setUpdatedUser({ ...updatedUser, nombre: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Número de Teléfono"
              value={updatedUser.numero_tel}
              onChangeText={(text) => setUpdatedUser({ ...updatedUser, numero_tel: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              value={updatedUser.correo_electronico}
              onChangeText={(text) => setUpdatedUser({ ...updatedUser, correo_electronico: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              onChangeText={(text) => setUpdatedUser({ ...updatedUser, contrasena: text })}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleUpdateUser}>
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PerfilUsuario;

const styles = StyleSheet.create({
  navegacion: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
    width: 60,
    height: 60,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    right: 40,
  },
  navegacionTexto: {
    color: '#FFFFFF', // Blanco para el texto
    fontSize: 16,
    fontWeight: 'bold',
  },  
  container: {
    flex: 1,
    backgroundColor: '#003366',
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
    marginRight: 1,
  },
  home: {
    width: 40,
    height: 40,
    marginLeft: 20,
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
    backgroundColor: '#4A90E2',
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
    backgroundColor: '#CCCCCC',
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
  updateButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#FFFFFF', // Texto blanco para contraste
    fontSize: 16, // Tamaño de fuente adecuado
    fontWeight: 'bold', // Negrita para destacar
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo translúcido
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFFFFF', // Fondo blanco
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333333', // Texto oscuro
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#F9F9F9',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#28a745', // Verde para guardar
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#dc3545', // Rojo para cancelar
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 5,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});