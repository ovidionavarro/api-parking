Para ejecutar el proyecto : "npm run dev"  
La api cuenta con 2 bases de datos una en MySQL para llevar la logica del parqueo y otra en Mongodb para guardar los logs  
Se creo una tabla user(usuarios),parking(lleva cada posicion del parqueo y su descripcion) y reserve(guarda la hora de salida y de entrada de un vehiculo y ademas quien solicito la reservacion)  
Se utilizaron modulos de node como winston y winston-mongodb para guardar los log, bcryptjs para encriptar las contraseñas,jsonwebtoken la autenticacion, express-validator  la validacion de los campos que recibe la request ,sequelize para conectar y trabajar con MySQL y mongoose con Mongodb  
