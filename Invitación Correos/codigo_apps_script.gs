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

/**
 * Envío de Invitación General al 7mo Encuentro C3S
 * Carga el diseño desde el archivo HTML "template_envio"
 *
 * @param {string} nombre - Nombre del destinatario
 * @param {string} email - Correo electrónico del destinatario
 * @param {string} [tratamiento] - Tratamiento (ej. "Estimado/a", "Estimado", "Estimada")
 */
function enviarCorreoInvitacion(nombre, email, tratamiento) {
  var subject = "Invitación: 7mo Encuentro del Círculo Chileno de Capital Social - 3xi";
  var senderName = "Círculo Chileno de Capital Social (C3S)";
  tratamiento = tratamiento || "Estimado/a";

  // Texto plano de respaldo
  var plainText = tratamiento + " " + nombre + ",\n\n" +
    "Te escribo en representación del Círculo Chileno de Capital Social (C3S), una comunidad de organizaciones comprometidas con fortalecer la confianza, la colaboración y los vínculos sociales en Chile.\n\n" +
    "En esta ocasión, tengo el agrado de invitarte a nuestro próximo encuentro, donde contaremos con la participación de Camilo Herrera, director ejecutivo de 3xi, quien compartirá la experiencia de esta iniciativa y nos invitará a explorar el potencial transformador del encuentro.\n\n" +
    "Presentación Inicial:\n" +
    "- Camilo Herrera, Director Ejecutivo de 3xi.\n\n" +
    "Para iniciar la conversación, después de la presentación de Camilo, hemos invitado a:\n" +
    "- Silvia Díaz: Científica y académica, exministra de Ciencia y actual presidenta del Consejo Nacional de CTCI.\n" +
    "- Pablo Bosch: Empresario, cofundador de Las Majadas de Pirque; fue presidente del Hogar de Cristo, director de ICARE y consejero de SOFOFA.\n" +
    "- Alejandra Pizarro: Presidenta del Directorio de la Comunidad de Organizaciones Solidarias (COS).\n" +
    "- Rodrigo Jordán: Ingeniero, montañista y presidente de Vertical; presidente del directorio de Fundación Superación de la Pobreza y expresidente de América Solidaria.\n\n" +
    "Detalles del Encuentro:\n" +
    "- Fecha: 23 de septiembre\n" +
    "- Hora: 18:30 hrs\n" +
    "- Lugar: Auditorio NIDO Lucía\n" +
    "- Dirección: San Isidro 85, Santiago Centro\n\n" +
    "Esperamos contar con tu valiosa presencia para construir juntos esta conversación.\n\n" +
    "Saludos cordiales,\n" +
    "Nancy Pérez\n" +
    "Coordinadora · Círculo Chileno de Capital Social (C3S)\n\n" +
    "Inscripciones: https://capitalsocialchile.cl/proximo-evento\n\n" +
    "Círculo Chileno de Capital Social (C3S)";

  // 1. Cargar la plantilla HTML desde el archivo "template_envio" en Apps Script
  var template = HtmlService.createTemplateFromFile("template_envio");

  // 2. Inyectar variables dinámicas
  template.nombre = nombre;
  template.tratamiento = tratamiento;

  // 3. Evaluar el template para generar el HTML final
  var htmlBody = template.evaluate().getContent();

  // 4. Enviar el correo
  GmailApp.sendEmail(email, subject, plainText, {
    htmlBody: htmlBody,
    name: senderName
  });
}
