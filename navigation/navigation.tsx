import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "@/screens/Home";
import Registro from "@/screens/Registro";
import VisualizarTomas from "@/screens/VisualizarTomas";
import AgregarToma from "@/screens/AgregarToma";
import PruebaArduino from "@/screens/PruebaArduino";
import PerfilUsuario from "@/screens/PerfilUsuario";

const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
              <Stack.Screen
                name="Registro"
                component={Registro}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="VisualizarTomas"
                component={VisualizarTomas}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="PruebaArduino"
                component={PruebaArduino}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="AgregarToma"
                component={AgregarToma}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <Stack.Screen
                name="PerfilUsuario"
                component={PerfilUsuario}
                options={{
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
         
        </Stack.Navigator>
    );
};

export default function Navigation() {
    return (
        <NavigationContainer independent={true}>
            <MyStack />
        </NavigationContainer>
    );
}