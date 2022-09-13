
import nodemailer from 'nodemailer'

// Funcion para enviar mail cuando se registran
const emailRegistro = async (datos) => {

    const { nombre, email, token } = datos

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "b4ec2968a5887b",
          pass: "c2522a70ccb7d8"
        }
      });

      // Información del email, usa la url y credenciales de transport para enviar mail
      const info = await transport.sendMail({
        from: ' "UpTask - Administrador de Proyetos" <cuentas@uptask.com> ',
        to: email,
        subject: "UpTask - Confirmar Cuenta",
        text: "Comprueba tu cuenta UpTask",
        html: `
        <p>Hola: ${nombre}. Confirma tu cuenta en UpTask </p>

        <p> Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace: 
        <a href = "${process.env.FRONTEND_URL}/confirmar/${token}}">Validar Cuenta</a>

        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje. </p>
        `
      })

}

export {
    emailRegistro
}
