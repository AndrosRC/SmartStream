import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, Switch, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ConfigurarLlave = ({ navigation }: any) => {
  const route = useRoute();
  const { tomaId } = route.params;

  console.log('tomaId:', tomaId); // Depuración para ver el valor del tomaId

  const [toma, setToma] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error
  const [tiempo, setTiempo] = useState<string>(''); // Estado para el tiempo
  const [isOpen, setIsOpen] = useState<boolean>(false); // Estado para el switch (abierto o cerrado)

  useEffect(() => {
    if (tomaId) {
      const fetchToma = async () => {
        try {
          const response = await fetch(`http://192.168.0.110:3000/getLlave/${tomaId}`);
          const data = await response.json();
          console.log('Datos obtenidos:', data); // Verifica los datos recibidos

          if (response.ok) {
            // Verificar si 'tomas' es un arreglo y tiene al menos un elemento
            if (data.tomas && data.tomas.length > 0) {
              setToma(data.tomas[0]); // Acceder al primer elemento del array
            } else {
              setError('No se encontró la toma con el ID especificado.');
            }
          } else {
            setError('No se pudo obtener la toma');
          }
        } catch (error) {
          setError('Error al obtener la toma');
          console.error('Error al obtener la toma:', error);
        } finally {
          setLoading(false); // Termina el estado de carga
        }
      };
      fetchToma();
    } else {
      setError('No se ha recibido tomaId');
      setLoading(false);
    }
  }, [tomaId]);

  // Mostrar mensajes de error si ocurre
  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  // Validar que 'toma' esté definido antes de acceder a sus propiedades
  if (!toma) {
    return <Text>No se pudo cargar la toma.</Text>;
  }

  // Función para obtener la imagen según el tipo de toma
  const getImageForType = (tipo: string) => {
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

  const handleRegresar = () => {
    navigation.goBack(); // Regresar a la pantalla anterior
  };

  const handleGuardar = () => {
    // Lógica para guardar los cambios (en este caso, la duración y el estado de la llave)
    console.log('Tiempo: ', tiempo);
    console.log('Estado de la llave: ', isOpen ? 'Abierta' : 'Cerrada');
    // Aquí agregarías la lógica para actualizar la toma en el servidor si es necesario
  };

  const PerfilUsuario = () => {
    navigation.navigate('PerfilUsuario');
  };

  return (
    <View style={styles.container}>
      {/* Barra de navegación superior */}
      <View style={styles.header}>
        <Image source={require('@/assets/images/iconoGota.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>SmartStream</Text>
        <TouchableOpacity style={styles.profileButton} onPress={PerfilUsuario}>
          <Image source={require('@/assets/images/iconoPerfil.png')} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      {/* Contenido de la pantalla */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>Configurar Llave</Text>
          {/* Nombres más grandes */}
          <Text style={styles.nombreToma}>Nombre: {toma?.nombre_toma}</Text>
          <Text style={styles.tipoToma}>Tipo: {toma?.tipo_toma}</Text>

          {/* Mostrar la imagen correspondiente al tipo de toma */}
          <Image source={getImageForType(toma.tipo_toma)} style={styles.image} />

          {/* Formulario para configurar el tiempo de la llave */}
          <Text style={styles.label}>Tiempo de apertura (en minutos):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={tiempo}
            onChangeText={setTiempo}
            placeholder="Ej. 30 minutos"
          />

          {/* Switch para abrir o cerrar la llave */}
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Estado de la llave:</Text>
            <Switch
              value={isOpen}
              onValueChange={setIsOpen}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isOpen ? '#f5dd4b' : '#f4f3f4'}
            />
            <Text style={styles.switchLabel}>{isOpen ? 'Abierta' : 'Cerrada'}</Text>
          </View>

          <Button title="Guardar cambios" onPress={handleGuardar} />

          {/* Botón de regresar */}
          <TouchableOpacity style={styles.regresarButton} onPress={handleRegresar}>
            <Text style={styles.regresarButtonText}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbe9f7', // Fondo azul claro
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
  content: {
    marginTop: 100, // Ajusta el margen superior para evitar que se solape con la barra de navegación
    padding: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff', // Fondo blanco para el contenido
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center', // Centra todo dentro del card
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  nombreToma: {
    fontSize: 17, // Aumenta el tamaño del nombre
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tipoToma: {
    fontSize: 17, // Aumenta el tamaño del tipo de toma
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 150, // Hacer la imagen un poco más grande
    height: 150,
    marginVertical: 20,
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
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  switchLabel: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  regresarButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  regresarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfigurarLlave;
