import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';

const Registro = ({ navigation }: any) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!nombre || !email || !password) {
      // Usamos window.alert en lugar de Alert.alert para la web
      window.alert('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, correo_electronico: email, contrasena: password }),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (response.ok) {
        // Usamos window.alert en lugar de Alert.alert para la web
        window.alert('Registro exitoso');
        
        // Navegar a Home después de la alerta
        if (navigation) {
          navigation.navigate('Home');
        } else {
          console.error("Navigation object is not available.");
        }
      } else {
        console.log('Error al registrar:', data.message);
        // Usamos window.alert en lugar de Alert.alert para la web
        window.alert(data.message || 'Error al registrar');
      }

    } catch (error) {
      console.error('Error en el servidor:', error);
      // Usamos window.alert en lugar de Alert.alert para la web
      window.alert('Error en el servidor');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/iconoGota.png')}
          style={styles.logo}
        />
        <Text style={styles.headerTitle}>SmartStream</Text>
      </View>

      <View style={styles.form}>
        <Image
          source={require('@/assets/images/iconoGota.png')}
          style={styles.formIcon}
        />
        <Text style={styles.title}>REGISTRO DE USUARIO</Text>

        {/* Campo para el nombre completo */}
        <Text style={styles.label}>INGRESA TU NOMBRE COMPLETO:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          placeholderTextColor="#000"
          value={nombre}
          onChangeText={(text) => setNombre(text)}
        />

        {/* Campo para el correo electrónico */}
        <Text style={styles.label}>INGRESA TU CORREO:</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#000"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        {/* Campo para la contraseña */}
        <Text style={styles.label}>INGRESA TU CONTRASEÑA:</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          placeholderTextColor="#000"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>REGISTRARSE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Registro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a6da7',
    justifyContent: 'center', // Centrar en el eje vertical
    alignItems: 'center', // Centrar en el eje horizontal
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a2b4f',
    width: '100%',
    paddingVertical: 20,
    position: 'absolute', // Hace que el header se quede en la parte superior
    top: 0, // Ubicación en la parte superior
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
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  formIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#4a6da7',
    width: '100%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
