const createTemplate = (emailUser: string, message: string) => {
  return `
  <html>
    <body style="margin: 0; padding: 0; background: #FFF8EE; font-family: 'Arial', sans-serif;">
      
      <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        
        <tr>
          <td style="background: linear-gradient(90deg, #FFA64C, #FDC655); padding: 25px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 26px; letter-spacing: 1px;">MIMURI</h1>
            <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Nuevo mensaje desde el sitio web</p>
          </td>
        </tr>

        <tr>
          <td style="padding: 30px;">
            <h3 style="margin-top: 0; color: #333; font-size: 20px;">📩 Datos del remitente</h3>

            <p style="font-size: 16px; margin: 8px 0; color: #555;">
              <strong>Correo:</strong> ${emailUser}
            </p>

            <h3 style="margin-top: 25px; color: #333; font-size: 20px;">📝 Mensaje recibido</h3>

            <div style="background: #FFF4E3; border-left: 4px solid #FFA64C; padding: 15px 20px; margin-top: 10px; border-radius: 8px; font-size: 16px; color: #444; line-height: 1.5;">
              ${message}
            </div>

            <hr style="border: none; border-top: 1px solid #eee; margin: 35px 0;" />

            <p style="font-size: 13px; text-align: center; color: #888;">
              Este mensaje fue enviado automáticamente desde el formulario de contacto de <strong>Mimuri</strong>.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background: #FFF1D6; padding: 18px; text-align: center; font-size: 13px; color: #7A6B57;">
            © ${new Date().getFullYear()} Mimuri — Muebles infantiles con amor.
          </td>
        </tr>

      </table>

    </body>
  </html>
  `;
};

export default createTemplate;
