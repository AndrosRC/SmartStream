import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Registro = ({ navigation }: any) => {
  const Home = () => {
    navigation.navigate('Home');
  };

  const [nombre, setNombre] = useState('');
  const [numeroTelefono, setNumeroTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // Validaciones básicas
    if (!nombre || !numeroTelefono || !email || !password) {
      window.alert('Todos los campos son obligatorios');
      return;
    }
  
    // Validar formato de correo
    const validacionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validacionEmail.test(email)) {
      window.alert('Por favor, ingresa un correo electrónico válido');
      return;
    }
  
    // Validar teléfono
    const validacionTel = /^[0-9]{10}$/; // 10 dígitos numéricos
    if (!validacionTel.test(numeroTelefono)) {
      window.alert('Por favor, ingresa un número de teléfono válido (10 dígitos)');
      return;
    }
  
    // Intento de registro
    try {
      const response = await fetch('http://192.168.0.110:3000/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          numero_tel: numeroTelefono,
          correo_electronico: email,
          contrasena: password,
        }),
      });
  
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
  
      if (response.ok) {
        window.alert('Registro exitoso');
        if (navigation) {
          navigation.navigate('Home');
        } else {
          console.error('Navigation object is not available.');
        }
      } else {
        console.log('Error al registrar:', data.message);
        window.alert(data.message || 'Error al registrar');
      }
    } catch (error) {
      console.error('Error en el servidor:', error);
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

        <Text style={styles.label}>INGRESA TU NOMBRE COMPLETO:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          placeholderTextColor="#000"
          value={nombre}
          onChangeText={(text) => setNombre(text)}
        />

        <Text style={styles.label}>INGRESA TU NÚMERO DE TELÉFONO:</Text>
        <TextInput
          style={styles.input}
          placeholder="Número de teléfono"
          placeholderTextColor="#000"
          keyboardType="phone-pad"
          value={numeroTelefono}
          onChangeText={(text) => setNumeroTelefono(text)}
        />

        <Text style={styles.label}>INGRESA TU CORREO:</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#000"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.label}>INGRESA TU CONTRASEÑA:</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          placeholderTextColor="#000"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity onPress={Home} style={styles.navegacionLogin}>
          <Text style={styles.navegacionLogin}>VOLVER AL INICIO DE SESIÓN</Text>
        </TouchableOpacity>

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a2b4f',
    width: '100%',
    paddingVertical: 20,
    position: 'absolute',
    top: 0,
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
    marginTop: '20%',
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
  navegacionLogin: {
    fontSize: 14,
    color: '#000',
    marginBottom: 20,
  },
});
