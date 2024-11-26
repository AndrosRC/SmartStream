import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AgregarToma = ({ navigation }: any) => {
  const [usuario, setUsuario] = useState<any>(null);

  const PerfilUsuario = () => {
    navigation.navigate('PerfilUsuario');
  };

  const [nombreToma, setNombreToma] = useState('');
  const [tipoToma, setTipoToma] = useState<string>('Regadera');

  const handleGuardar = async () => {
    if (!nombreToma) {
      window.alert('El nombre de la toma es obligatorio');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await fetch('http://localhost:3000/agregarToma', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_toma: nombreToma,
          tipo_toma: tipoToma,
          id_usuario: userId, // Cambiar por el ID del usuario actual si es dinámico
        }),
      });

      const data = await response.json();

      if (response.ok) {
        window.alert('Toma de agua agregada correctamente');
        setNombreToma(''); // Limpiar el formulario después de guardar
        setTipoToma('Regadera');
      } else {
        window.alert(data.error || 'No se pudo agregar la toma');
      }
    } catch (error) {
      console.error('Error en el servidor:', error);
      window.alert('Hubo un problema al conectarse con el servidor');
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
        <TouchableOpacity style={styles.profileButton} onPress={PerfilUsuario}>
          <Image
            source={require('@/assets/images/iconoPerfil.png')}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>NUEVA LLAVE</Text>

        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la llave"
          placeholderTextColor="#000"
          value={nombreToma}
          onChangeText={(text) => setNombreToma(text)}
        />

        <Text style={styles.label}>Tipo de llave:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipoToma}
            onValueChange={(itemValue) => setTipoToma(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Regadera" value="Regadera" />
            <Picker.Item label="Lavamanos" value="Lavamanos" />
            <Picker.Item label="Lavatrastes" value="Lavatrastes" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGuardar}>
          <Text style={styles.buttonText}>GUARDAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AgregarToma;

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
  input: {
    width: '100%',
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    width: '100%',
    height: 40,
  },
  button: {
    backgroundColor: '#4a6da7',
    width: '100%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});