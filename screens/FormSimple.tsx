import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PerfilUsuario = () => {
  const userName = "Nombre Usuario";
  const userNumber = "123456789";
  const userEmail = "usuario@example.com";
  const userPassword = "********";
  const waterUsage = {
    regadera: 120,
    lavamanos: 45,
    lavatrastes: 60,
    total: 225
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('@/assets/images/userProfile.png')}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userNumber}>{userNumber}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.info}>{userEmail.replace(/(.{2})(.*)(@.*)/, "$1****$3")}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Contraseña:</Text>
        <Text style={styles.info}>{userPassword}</Text>
      </View>

      <View style={styles.usageContainer}>
        <Text style={styles.usageTitle}>Gasto de Agua al Mes (L):</Text>
        <Text style={styles.usageText}>Regadera: {waterUsage.regadera} L</Text>
        <Text style={styles.usageText}>Lavamanos: {waterUsage.lavamanos} L</Text>
        <Text style={styles.usageText}>Lavatrastes: {waterUsage.lavatrastes} L</Text>
        <Text style={styles.usageTotal}>Total: {waterUsage.total} L</Text>
      </View>
    </View>
  );
};

export default PerfilUsuario;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  userInfo: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userNumber: {
    fontSize: 16,
    color: '#666',
  },
  infoContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    color: '#333',
  },
  usageContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  usageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  usageText: {
    fontSize: 16,
    marginBottom: 5,
  },
  usageTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});