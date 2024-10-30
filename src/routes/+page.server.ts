import prisma from '$lib/images/prisma';
import bcrypt from 'bcrypt';

export async function _createUser() {
  const hashedPassword = await bcrypt.hash('passkey', 10);

  const newUser = await prisma.usuario.create({
    data: {
      usuario: 'admin',
      contrasena: hashedPassword,
      rol_id: 1 // Asumiendo que el rol de Administrador de Ventas tiene el ID 1
    }
  });

  return newUser;
}

export async function _checkConnection() {
    try {
      // Realiza una consulta simple para verificar la conexión
      const result = await prisma.$queryRaw`SELECT 1`;
      console.log('Conexión exitosa:', result);
      return true;
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      return false;
    }
  }

export async function load() {
    const user = await _createUser();
    console.log('Loaded user:', user);
    const isConnected = await _checkConnection();
    return {
      user,
      isConnected
    };
  }