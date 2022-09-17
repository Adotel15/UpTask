
import nodemailer from 'nodemailer'

// Funcion para enviar mail cuando se registran
const emailRegistro = async (datos) => {

    const { nombre, email, token } = datos

    // Usuario y Host para enviar los mails
    // TODO: Mover hacia env
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

        <p> Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace:</p> 
        <a href = "${process.env.FRONTEND_URL}/confirmar/${token}}">Validar Cuenta</a>

        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje. </p>
        `
      })

}

const emailOlvidePassword = async (datos) => {

  const { nombre, email, token } = datos

  // Usuario y Host para enviar los mails
  // TODO: Mover hacia env
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
      subject: "UpTask - Reestablece tu Password",
      text: "Reestablece tu Password",
      html: `
      <p>Hola: ${nombre} has solicitado restablecer tu Password </p>

      <p>Entra en el siguiente enlace para reestablecer el Password: </p>
      <a href = "${process.env.FRONTEND_URL}/olvide-password/${token}}"> Reestablecer Password</a>

      <p>Si no eres el destinatario de este mensaje, puedes ignorar el mensaje. </p>
      `
    })

}

export {
    emailRegistro,
    emailOlvidePassword
}
