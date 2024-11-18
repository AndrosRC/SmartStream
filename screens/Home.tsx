import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Home = ({ navigation }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ correo_electronico: email, contrasena: password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                Alert.alert('Inicio de sesión exitoso');
                navigation.navigate('VisualizarTomas');
            } else {
                Alert.alert('Error', data.message || 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error en el servidor:', error);
            Alert.alert('Error', 'Error en el servidor');
        }
    };

    const Registro = () => {
        navigation.navigate('Registro');
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
            <Text style={styles.title}>INICIO DE SESIÓN</Text>
    
            <Text style={styles.label}>INGRESA TU CORREO:</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#000"
              value={email}
              onChangeText={setEmail}
            />
    
            <Text style={styles.label}>INGRESA TU CONTRASEÑA:</Text>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry={true}
              placeholderTextColor="#000"
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity onPress={Registro} style={styles.forgotPassword}>
                <Text style={styles.forgotPassword}>¿NO TIENES UNA CUENTA?</Text>
            </TouchableOpacity>
    
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
};

export default Home;

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
  forgotPassword: {
    fontSize: 14,
    color: '#000',
    marginBottom: 20,
    textDecorationLine: 'underline',
    textAlign: 'center',
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