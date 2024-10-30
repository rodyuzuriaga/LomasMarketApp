'use server'
import prisma from '$lib/images/prisma';
import bcrypt from 'bcrypt';

export async function _createRole() {
  const role = await prisma.rol.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      nombre: 'Administrador de Ventas',
      permisos: ['Consultar reportes', 'Balances de ventas', 'Actualizar el stock']
    }
  });
  return role;
}

export async function _createUser(usuario: string, contrasena: string, rol_id: number) {
  const existingUser = await prisma.usuario.findUnique({
    where: { usuario }
  });

  if (existingUser) {
    console.log('El usuario ya existe:', existingUser);
    return { message: 'El usuario ya existe' };
  }

  const hashedPassword = await bcrypt.hash(contrasena, 10);

  // Asegúrate de que el rol existe
  await _createRole();

  const newUser = await prisma.usuario.create({
    data: {
      usuario,
      contrasena: hashedPassword,
      rol_id
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
  const user = await _createUser('admin', 'passkey', 1);
  console.log('Loaded user:', user);
  const isConnected = await _checkConnection();
  return {
    user,
    isConnected
  };
}