const nodemailer = require('nodemailer');
require('dotenv').config();

const EMAILS_INSTITUCIONALES = {
  CREN: 'direccion.cren@msev.gob.mx',
  UMCE: 'movilidad@umce.cl'
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
});

module.exports = async (req, res) => {
  // Permitir solo peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { nombre, destino, email, motivo, mensaje } = req.body || {};

    if (!nombre || !destino || !email || !motivo || !mensaje) {
      return res.status(400).json({
        success: false,
        error: 'Todos los campos son obligatorios (nombre, destino, email, motivo, mensaje).'
      });
    }

    const correoDestino = EMAILS_INSTITUCIONALES[destino];
    if (!correoDestino) {
      return res.status(400).json({
        success: false,
        error: 'Institución de destino no válida.'
      });
    }

    const mailOptions = {
      from: `"${nombre}" <${process.env.SMTP_USER || email}>`,
      replyTo: email,
      to: correoDestino,
      subject: `[Vinculación CREN-UMCE] ${motivo} - ${nombre}`,
      text: `Mensaje recibido desde la Plataforma Web de Vinculación CREN-UMCE:\n\nNombre: ${nombre}\nCorreo del remitente: ${email}\nInstitución Destino: ${destino} (${correoDestino})\nMotivo: ${motivo}\n\nMensaje:\n${mensaje}\n`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #1e3a8a; border-bottom: 2px solid #d97706; padding-bottom: 10px;">Nuevo Mensaje de Contacto</h2>
          <p><strong>Remitente:</strong> ${nombre} (&lt;${email}&gt;)</p>
          <p><strong>Destino Seleccionado:</strong> ${destino} (<code>${correoDestino}</code>)</p>
          <p><strong>Motivo:</strong> ${motivo}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          <h3 style="color: #475569;">Contenido del Mensaje:</h3>
          <p style="background-color: #f8fafc; padding: 15px; border-radius: 6px; white-space: pre-wrap;">${mensaje}</p>
          <br>
          <p style="font-size: 12px; color: #94a3b8;">Mensaje enviado automáticamente desde la Plataforma Web de Difusión CREN-UMCE.</p>
        </div>
      `
    };

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail(mailOptions);
    } else {
      console.log('Simulación de envío de correo (Modo desarrollo):');
      console.log('Destino:', correoDestino);
      console.log('Asunto:', mailOptions.subject);
      console.log('Cuerpo:', mailOptions.text);
    }

    return res.status(200).json({
      success: true,
      message: `Mensaje enviado con éxito a la institución ${destino} (${correoDestino}).`
    });

  } catch (error) {
    console.error('Error al procesar el mensaje de contacto:', error);
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor al procesar el envío.'
    });
  }
};
