// api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // Cambiar por IP al usar Expo GO
});

export const obtenerUsuarios = async () => {
    try {
        const response = await api.get('/usuarios');
        return response.data;
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        throw error;
    }
};

export default api;
