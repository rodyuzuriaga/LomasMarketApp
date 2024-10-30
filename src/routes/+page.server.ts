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

export async function load() {
  const user = await _createUser();
  return {
    user
  };
}