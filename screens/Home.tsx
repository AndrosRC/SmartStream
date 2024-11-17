import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Home = ({ navigation }: any) => {
    const VisualizarTomas =() => {
        navigation.navigate('VisualizarTomas');
    };
    const Registro =() => {
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
            <TextInput style={styles.input} placeholder="Correo electrónico" placeholderTextColor="#000" />
    
            <Text style={styles.label}>INGRESA TU CONTRASEÑA:</Text>
            <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true} placeholderTextColor="#000" />

            <TouchableOpacity onPress={Registro} style={styles.forgotPassword}>
                <Text style={styles.forgotPassword}>¿NO TIENES UNA CUENTA?</Text>
            </TouchableOpacity>
    
            <TouchableOpacity onPress={VisualizarTomas} style={styles.button}>
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