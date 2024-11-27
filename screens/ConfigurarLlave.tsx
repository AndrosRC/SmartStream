import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';

const ConfigurarLlave = () => {
  const route = useRoute();
  const { tomaId } = route.params;

  console.log('tomaId:', tomaId); // Depuración para ver el valor del tomaId

  const [toma, setToma] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  useEffect(() => {
    if (tomaId) {
      const fetchToma = async () => {
        try {
          const response = await fetch(`http://172.31.99.21:3000/getLlave/${tomaId}`);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurar Llave</Text>
      <Text>Nombre: {toma?.nombre_toma}</Text>
      <Text>Tipo: {toma?.tipo_toma}</Text>

      {/* Mostrar la imagen correspondiente al tipo de toma */}
      <Image source={getImageForType(toma.tipo_toma)} style={styles.image} />

      <Button title="Guardar cambios" onPress={() => { /* Lógica para guardar cambios */ }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
});

export default ConfigurarLlave;
