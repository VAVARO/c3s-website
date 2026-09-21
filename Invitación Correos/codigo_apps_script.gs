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
  var plainText = tratamiento + " " + nombre + "*,\n\n" +
    "* Fe de erratas: Te pedimos sinceras disculpas si recibiste un correo anterior con un nombre genérico, debido a un error involuntario en nuestro envío.\n\n" +
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

/**
 * Envío de Recordatorio / Addendum al 7mo Encuentro C3S (Café 18:00 hrs y refrigerio posterior)
 * Carga el diseño desde el archivo HTML "template_recordatorio"
 *
 * @param {string} nombre - Nombre del destinatario
 * @param {string} email - Correo electrónico del destinatario
 * @param {string} [tratamiento] - Tratamiento (ej. "Estimado/a", "Estimado", "Estimada")
 */
function enviarCorreoRecordatorio(nombre, email, tratamiento) {
  var subject = "Recordatorio: 7mo Encuentro del Círculo Chileno de Capital Social - 23 de septiembre";
  var senderName = "Círculo Chileno de Capital Social (C3S)";
  tratamiento = tratamiento || "Estimado/a";

  // Texto plano de respaldo
  var plainText = tratamiento + " " + nombre + ",\n\n" +
    "¿Alcanzaste a ver la invitación al 7.º Encuentro del Círculo Chileno de Capital Social? Me gustaría mucho que pudieras acompañarnos el 23 de septiembre en NIDO Lucía. Desde las 18:00 los esperaremos con un rico café que nos ayude a iniciar conexiones desde el inicio del evento, para luego comenzar nuestro encuentro a las 18:30 horas.\n\n" +
    "Será una actividad diferente, participativa y cercana. Después de una breve presentación sobre el viaje de 3xi, cuatro personas vinculadas al fortalecimiento del capital social compartirán las primeras preguntas con las que queremos iniciar la conversación.\n\n" +
    "Esta vez el foco de nuestro encuentro no estará en ofrecer respuestas a lo que estamos viviendo, sino más bien en formular, compartir y atesorar nuevas preguntas: aquellas que todavía necesitamos hacernos para comprendernos y encontrarnos.\n\n" +
    "Posteriormente, acompañados de un rico refrigerio, podremos seguir la conversación en grupos. Hemos diseñado la actividad para que sea una experiencia valiosa para todas y todos. Espero que puedas acompañarnos.\n\n" +
    "Presentación Inicial:\n" +
    "- Camilo Herrera, Director Ejecutivo de 3xi.\n\n" +
    "Panelistas invitados para iniciar la conversación:\n" +
    "- Silvia Díaz: Científica y académica, exministra de Ciencia y actual presidenta del Consejo Nacional de CTCI.\n" +
    "- Pablo Bosch: Empresario, cofundador de Las Majadas de Pirque; fue presidente del Hogar de Cristo, director de ICARE y consejero de SOFOFA.\n" +
    "- Alejandra Pizarro: Presidenta del Directorio de la Comunidad de Organizaciones Solidarias (COS).\n" +
    "- Rodrigo Jordán: Ingeniero, montañista y presidente de Vertical; presidente del directorio de Fundación Superación de la Pobreza y expresidente de América Solidaria.\n\n" +
    "Detalles del Encuentro:\n" +
    "- Fecha: Lunes 23 de septiembre\n" +
    "- Café previo: Desde las 18:00 hrs\n" +
    "- Encuentro: 18:30 hrs\n" +
    "- Lugar: Auditorio NIDO Lucía\n" +
    "- Dirección: San Isidro 85, Santiago Centro\n\n" +
    "Saludos cordiales,\n" +
    "Nancy Pérez\n" +
    "Coordinadora · Círculo Chileno de Capital Social (C3S)\n\n" +
    "Inscripciones: https://capitalsocialchile.cl/proximo-evento\n\n" +
    "Círculo Chileno de Capital Social (C3S)";

  // 1. Cargar la plantilla HTML desde el archivo "template_recordatorio" en Apps Script
  var template = HtmlService.createTemplateFromFile("template_recordatorio");

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

/**
 * Función auxiliar para obtener el tratamiento según la columna "Género"
 * Soporta: F, Femenino, M, Masculino, etc.
 */
function obtenerTratamientoPorGenero(genero) {
  if (!genero) return "Estimado/a";
  var g = genero.toString().trim().toLowerCase();
  if (g === "f" || g === "femenino" || g === "mujer") {
    return "Estimada";
  } else if (g === "m" || g === "masculino" || g === "hombre") {
    return "Estimado";
  }
  return "Estimado/a";
}

/**
 * Función de PRUEBA:
 * Envía un correo de prueba a tu propio correo con datos simulados
 * para revisar cómo se ve antes de lanzar la campaña.
 */
function enviarCorreoRecordatorioPrueba() {
  // Reemplaza con tu correo para recibir la prueba:
  var miCorreoPrueba = Session.getActiveUser().getEmail() || "contacto@capitalsocialchile.cl";
  
  Logger.log("Enviando correo de prueba a: " + miCorreoPrueba);
  enviarCorreoRecordatorio("Alvaro", miCorreoPrueba, "Estimado");
  Logger.log("¡Prueba enviada con éxito! Revisa tu bandeja de entrada.");
}

/**
 * Automatización de Campaña de Recordatorios:
 * Mapeo de columnas de tu Google Sheet:
 * Col A (0): Nombre
 * Col B (1): Apellido
 * Col C (2): Género
 * Col D (3): Cargo
 * Col E (4): Correo
 * Col F (5): Estado (Registro de la Invitación original - no se modifica)
 * Col G (6): Confirmado (Si contiene 'Inscrito', NO se envía)
 * Col H (7): Recordatorio (Aquí se escribe 'ENVIADO' al despachar el recordatorio)
 */
function enviarCampanaRecordatorios() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();

  var COL_NOMBRE = 0;        // Col A
  var COL_APELLIDO = 1;      // Col B
  var COL_GENERO = 2;        // Col C
  var COL_CARGO = 3;         // Col D
  var COL_CORREO = 4;        // Col E
  var COL_ESTADO_INV = 5;    // Col F (Estado Invitación previa)
  var COL_CONFIRMADO = 6;    // Col G (Confirmado / Inscrito)
  var COL_RECORDATORIO = 7;  // Col H (Nueva columna: Estado Recordatorio)

  var totalEnviados = 0;
  var totalOmitidosInscritos = 0;
  var totalOmitidosYaEnviados = 0;

  // Empezar en i = 1 para omitir fila de títulos
  for (var i = 1; i < data.length; i++) {
    var fila = data[i];
    var nombre = fila[COL_NOMBRE] ? fila[COL_NOMBRE].toString().trim() : "";
    var email = fila[COL_CORREO] ? fila[COL_CORREO].toString().trim() : "";
    var genero = fila[COL_GENERO];
    var confirmado = fila[COL_CONFIRMADO] ? fila[COL_CONFIRMADO].toString().trim().toLowerCase() : "";
    var estadoRecordatorio = fila[COL_RECORDATORIO] ? fila[COL_RECORDATORIO].toString().trim().toUpperCase() : "";

    // 1. Validar que la fila contenga un correo válido
    if (!email || email.indexOf("@") === -1) {
      continue;
    }

    // 2. Si ya está inscrito en la actividad (dice 'inscrito' o derivado), omitir
    if (confirmado.indexOf("inscrito") !== -1 || confirmado === "si" || confirmado === "sí") {
      Logger.log("Omitiendo " + email + ": Ya aparece como Inscrito.");
      totalOmitidosInscritos++;
      continue;
    }

    // 3. Si ya se le envió el recordatorio previamente (dice 'ENVIADO'), omitir para no duplicar
    if (estadoRecordatorio === "ENVIADO" || estadoRecordatorio === "RECORDATORIO ENVIADO") {
      Logger.log("Omitiendo " + email + ": Recordatorio ya fue enviado previamente.");
      totalOmitidosYaEnviados++;
      continue;
    }

    // 4. Determinar tratamiento personalizado por género (Estimada / Estimado)
    var tratamiento = obtenerTratamientoPorGenero(genero);

    // 5. Enviar correo de recordatorio y registrar estado en la columna Recordatorio (Col H)
    try {
      enviarCorreoRecordatorio(nombre, email, tratamiento);

      // Escribir 'ENVIADO' en Columna H (COL_RECORDATORIO + 1)
      sheet.getRange(i + 1, COL_RECORDATORIO + 1).setValue("ENVIADO");
      SpreadsheetApp.flush(); // Asegura el guardado inmediato en la hoja de cálculo

      totalEnviados++;
      Logger.log("[" + totalEnviados + "] Recordatorio enviado con éxito a: " + email + " (" + tratamiento + " " + nombre + ")");

      // Pausa prudente para no agotar la cuota de envíos de Google Apps Script
      Utilities.sleep(1200);

    } catch (error) {
      Logger.log("ERROR al enviar a " + email + ": " + error.message);
      sheet.getRange(i + 1, COL_RECORDATORIO + 1).setValue("ERROR: " + error.message);
    }
  }

  Logger.log("=== RESUMEN DE CAMPAÑA DE RECORDATORIOS ===");
  Logger.log("Total enviados ahora: " + totalEnviados);
  Logger.log("Total omitidos por estar Inscritos: " + totalOmitidosInscritos);
  Logger.log("Total omitidos porque ya tenían Recordatorio: " + totalOmitidosYaEnviados);
}

/**
 * =======================================================================
 * RECORDATORIO PARA ASISTENTES INSCRITOS (CÓMO LLEGAR + CAFÉ + COCKTAIL)
 * Carga el diseño desde el archivo HTML "template_recordatorio_inscritos"
 * =======================================================================
 */

/**
 * Envío individual de recordatorio a personas inscritas
 */
function enviarCorreoRecordatorioInscritos(nombre, email, tratamiento) {
  var subject = "¡Nos vemos este miércoles 23 de septiembre! · Información práctica y cómo llegar al 7mo Encuentro C3S";
  var senderName = "Círculo Chileno de Capital Social (C3S)";
  tratamiento = tratamiento || "Estimado/a";

  // Texto plano de respaldo
  var plainText = tratamiento + " " + nombre + ",\n\n" +
    "Te escribimos para recordarte que este miércoles 23 de septiembre nos encontraremos en el 7.º Encuentro del Círculo Chileno de Capital Social en Auditorio NIDO Lucía. ¡Nos alegra mucho contar con tu presencia!\n\n" +
    "Te esperaremos a partir de las 18:00 horas:\n" +
    "• 18:00 hrs: Café de bienvenida para comenzar a conectar con calma.\n" +
    "• 18:30 hrs: Inicio puntual del Encuentro.\n" +
    "• Al cierre: Cóctel y espacio de conversación distendida.\n\n" +
    "Para facilitar tu llegada, te dejamos a continuación las alternativas de acceso y estacionamiento:\n\n" +
    "¿CÓMO LLEGAR A AUDITORIO NIDO LUCÍA?\n" +
    "Dirección: San Isidro 85, Santiago Centro\n\n" +
    "EN METRO (Transporte público recomendado):\n" +
    "La opción más rápida y directa es llegar por Línea 1 y descender en la estación Santa Lucía. Sal por el acceso sur (hacia Alameda / calle San Isidro); el recinto se encuentra a solo unos pasos caminando por San Isidro.\n\n" +
    "EN VEHÍCULO PARTICULAR Y ESTACIONAMIENTO:\n" +
    "El centro suele tener alto tráfico y no hay estacionamiento propio para asistentes en el recinto. La alternativa más cómoda y recomendada es el Estacionamiento subterráneo Saba Santa Rosa (bajo Av. Santa Rosa, a una cuadra de distancia). Aunque no tiene conexión subterránea directa con el edificio, se sale a superficie y se camina menos de 2 minutos hasta el acceso. Cuenta con habilitación de pago vía TAG.\n\n" +
    "Ubicación en Google Maps: https://maps.app.goo.gl/uY75zaAbeY4kBGNq7\n\n" +
    "¡Nos vemos este miércoles!\n\n" +
    "Saludos cordiales,\n" +
    "Nancy Pérez\n" +
    "Coordinadora · Círculo Chileno de Capital Social (C3S)";

  // 1. Cargar plantilla HTML
  var template = HtmlService.createTemplateFromFile("template_recordatorio_inscritos");

  // 2. Inyectar variables dinámicas
  template.nombre = nombre;
  template.tratamiento = tratamiento;

  // 3. Evaluar el template
  var htmlBody = template.evaluate().getContent();

  // 4. Enviar el correo
  GmailApp.sendEmail(email, subject, plainText, {
    htmlBody: htmlBody,
    name: senderName
  });
}

/**
 * Función de PRUEBA para Inscritos:
 * Envía un correo de prueba a tu cuenta para verificar diseño y enlaces.
 */
function enviarCorreoRecordatorioInscritosPrueba() {
  var miCorreoPrueba = Session.getActiveUser().getEmail() || "contacto@capitalsocialchile.cl";
  Logger.log("Enviando correo de prueba para inscritos a: " + miCorreoPrueba);
  enviarCorreoRecordatorioInscritos("Alvaro", miCorreoPrueba, "Estimado");
  Logger.log("¡Prueba enviada con éxito! Revisa tu bandeja de entrada.");
}

/**
 * Automatización de Campaña para Asistentes Inscritos:
 * - Filtra SOLAMENTE a las filas donde la columna 'Confirmado' contenga 'Inscrito'.
 * - Revisa la columna 'Recordatorio Inscrito' (Col I) para no duplicar envíos.
 */
function enviarCampanaInscritos() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();

  var COL_NOMBRE = 0;              // Col A
  var COL_APELLIDO = 1;            // Col B
  var COL_GENERO = 2;              // Col C
  var COL_CARGO = 3;               // Col D
  var COL_CORREO = 4;              // Col E
  var COL_ESTADO_INV = 5;          // Col F
  var COL_CONFIRMADO = 6;          // Col G ('Inscrito')
  var COL_RECORDATORIO = 7;        // Col H (Recordatorio general previo)
  var COL_RECORDATORIO_INSC = 8;   // Col I (Nueva columna opcional para registrar envío a inscritos)

  var totalEnviados = 0;
  var totalOmitidosNoInscritos = 0;
  var totalOmitidosYaEnviados = 0;

  for (var i = 1; i < data.length; i++) {
    var fila = data[i];
    var nombre = fila[COL_NOMBRE] ? fila[COL_NOMBRE].toString().trim() : "";
    var email = fila[COL_CORREO] ? fila[COL_CORREO].toString().trim() : "";
    var genero = fila[COL_GENERO];
    var confirmado = fila[COL_CONFIRMADO] ? fila[COL_CONFIRMADO].toString().trim().toLowerCase() : "";
    var estadoInscrito = fila[COL_RECORDATORIO_INSC] ? fila[COL_RECORDATORIO_INSC].toString().trim().toUpperCase() : "";

    if (!email || email.indexOf("@") === -1) {
      continue;
    }

    // 1. CONDICIÓN PRINCIPAL: Solo se envía si está INSCRITO
    var estaInscrito = (confirmado.indexOf("inscrito") !== -1 || confirmado === "si" || confirmado === "sí");
    if (!estaInscrito) {
      totalOmitidosNoInscritos++;
      continue; // Se omite porque no está inscrito
    }

    // 2. Control de duplicados: omitir si ya fue enviado
    if (estadoInscrito === "ENVIADO" || estadoInscrito === "RECORDATORIO ENVIADO") {
      totalOmitidosYaEnviados++;
      continue;
    }

    var tratamiento = obtenerTratamientoPorGenero(genero);

    try {
      enviarCorreoRecordatorioInscritos(nombre, email, tratamiento);

      // Registrar en Columna I (COL_RECORDATORIO_INSC + 1)
      sheet.getRange(i + 1, COL_RECORDATORIO_INSC + 1).setValue("ENVIADO");
      SpreadsheetApp.flush();

      totalEnviados++;
      Logger.log("[" + totalEnviados + "] Recordatorio a inscrito enviado a: " + email + " (" + tratamiento + " " + nombre + ")");

      Utilities.sleep(1200);
    } catch (error) {
      Logger.log("ERROR al enviar a " + email + ": " + error.message);
      sheet.getRange(i + 1, COL_RECORDATORIO_INSC + 1).setValue("ERROR: " + error.message);
    }
  }

  Logger.log("=== FIN CAMPAÑA INSCRITOS ===");
  Logger.log("Total inscritos notificados: " + totalEnviados);
  Logger.log("Omitidos por NO estar inscritos: " + totalOmitidosNoInscritos);
  Logger.log("Omitidos por ya haber recibido el correo: " + totalOmitidosYaEnviados);
}




