/**
 * Plantilla transaccional de confirmación de inscripción
 * Carga el diseño desde el archivo HTML "template_confirmacion"
 *
 * @param {string} nombre - Nombre del asistente
 * @param {string} email  - Correo electrónico del asistente
 */
function enviarCorreoConfirmacion(nombre, email) {
  var subject = "Inscripción Confirmada: 7mo Encuentro C3S - 3xi: El potencial del Encuentro";
  var senderName = "Círculo Chileno de Capital Social (C3S)";

  // Texto plano de respaldo (para clientes que no rendericen HTML)
  var plainText = "Hola " + nombre + ",\n\n" +
    "Tu inscripción para el 7mo Encuentro del Círculo Chileno de Capital Social ha sido registrada con éxito.\n\n" +
    "Detalles del Encuentro:\n" +
    "- Fecha: 23 de septiembre\n" +
    "- Hora: 18:30 hrs\n" +
    "- Lugar: Auditorio NIDO Lucía\n" +
    "- Dirección: San Isidro 85, Santiago Centro\n\n" +
    "El evento ha sido vinculado a tu calendario de preferencia.\n\n" +
    "Círculo Chileno de Capital Social (C3S)";

  // 1. Cargar la plantilla HTML desde el archivo "template_confirmacion" en Apps Script
  var template = HtmlService.createTemplateFromFile("template_confirmacion");

  // 2. Inyectar variables dinámicas
  template.nombre = nombre;

  // 3. Evaluar el template para generar el HTML final
  var htmlBody = template.evaluate().getContent();

  // 4. Enviar el correo
  GmailApp.sendEmail(email, subject, plainText, {
    htmlBody: htmlBody,
    name: senderName
  });
}
