/**
 * ==============================================================================
 * CÍRCULO CHILENO DE CAPITAL SOCIAL (C3S)
 * AUTOMATIZACIÓN DE RECORDATORIO PARA ASISTENTES INSCRITOS (7MO ENCUENTRO)
 * ==============================================================================
 * 
 * Estructura de columnas de esta Google Sheet:
 * - Col A (0): Timestamp
 * - Col B (1): Nombre
 * - Col C (2): Apellido
 * - Col D (3): Género (F/M, Femenino/Masculino, etc.)
 * - Col E (4): Correo
 * - Col F (5): Organización (si aplica)
 * - Col G (6): Estado Envío (El script escribirá aquí 'ENVIADO' automáticamente)
 * 
 * INSTRUCCIONES DE INSTALACIÓN:
 * 1. En tu Google Sheet, ve a: Extensiones > Apps Script.
 * 2. Pega este código en 'Código.gs'.
 * 3. Crea un archivo HTML haciendo clic en el botón '+' > HTML y nómbralo:
 *    template_recordatorio_inscritos
 * 4. Pega el contenido de 'template_recordatorio_inscritos.html' en dicho archivo.
 * 5. Guarda el proyecto (icono de disquete).
 * 6. Vuelve a tu hoja de cálculo y recárgala: aparecerá el menú superior 'Recordatorio C3S'.
 */

// Configuración Global
var CONFIG = {
  NOMBRE_PLANTILLA_HTML: "template_recordatorio_inscritos",
  NOMBRE_REMITENTE: "Círculo Chileno de Capital Social (C3S)",
  ASUNTO_CORREO: "¡Nos vemos este miércoles 23 de septiembre! · Información práctica y cómo llegar al 7mo Encuentro C3S",
  PAUSA_ENTRE_ENVIOS_MS: 1200 // Pausa prudente para no saturar la cuota diaria de Google
};

/**
 * Agrega un menú personalizado en la barra de herramientas de Google Sheets
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('📧 Recordatorio C3S')
    .addItem('1. Enviar correo de prueba a mi correo', 'enviarPrueba')
    .addSeparator()
    .addItem('2. Enviar recordatorio a TODOS los inscritos', 'enviarCampanaInscritos')
    .addToUi();
}

/**
 * 1. FUNCIÓN DE PRUEBA:
 * Envía un correo de muestra a la cuenta del usuario que está ejecutando el script.
 */
function enviarPrueba() {
  var miCorreoPrueba = Session.getActiveUser().getEmail() || "contacto@capitalsocialchile.cl";
  
  Logger.log("Enviando correo de prueba a: " + miCorreoPrueba);
  enviarCorreoRecordatorioInscrito("Alvaro", miCorreoPrueba, "Estimado");
  
  SpreadsheetApp.getUi().alert(
    "¡Prueba enviada con éxito!",
    "Se ha enviado el recordatorio a " + miCorreoPrueba + ".\nRevisa tu bandeja de entrada o spam.",
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * 2. CAMPAÑA MASIVA:
 * Recorre la hoja de respuestas/inscritos y envía el correo únicamente a quienes no lo han recibido.
 */
function enviarCampanaInscritos() {
  var ui = SpreadsheetApp.getUi();
  var confirmacion = ui.alert(
    "Confirmación de envío masivo",
    "¿Estás seguro de que deseas enviar el recordatorio a los asistentes inscritos de esta hoja?",
    ui.ButtonSet.YES_NO
  );

  if (confirmacion !== ui.Button.YES) {
    ui.alert("Envío cancelado.");
    return;
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();

  // Mapeo exacto de columnas base 0
  var COL_TIMESTAMP = 0;    // Col A
  var COL_NOMBRE = 1;       // Col B
  var COL_APELLIDO = 2;     // Col C
  var COL_GENERO = 3;       // Col D
  var COL_CORREO = 4;       // Col E
  var COL_ORGANIZACION = 5; // Col F
  var COL_ESTADO = 6;       // Col G (Aquí se registra el estado de envío)

  // Asegurar título en el encabezado de la Columna G si está vacío
  if (data[0].length <= COL_ESTADO || !data[0][COL_ESTADO]) {
    sheet.getRange(1, COL_ESTADO + 1).setValue("Estado Envío");
  }

  var totalEnviados = 0;
  var totalOmitidosYaEnviados = 0;
  var totalFilasSinCorreo = 0;

  // Recorrer filas (i = 1 omite la fila de encabezados)
  for (var i = 1; i < data.length; i++) {
    var fila = data[i];
    var nombre = fila[COL_NOMBRE] ? fila[COL_NOMBRE].toString().trim() : "";
    var email = fila[COL_CORREO] ? fila[COL_CORREO].toString().trim() : "";
    var genero = fila[COL_GENERO];
    var estadoEnvio = fila[COL_ESTADO] ? fila[COL_ESTADO].toString().trim().toUpperCase() : "";

    // A. Validar que la fila contenga un correo válido
    if (!email || email.indexOf("@") === -1) {
      totalFilasSinCorreo++;
      continue;
    }

    // B. Control de duplicados: Si ya dice 'ENVIADO', omitir
    if (estadoEnvio === "ENVIADO" || estadoEnvio === "RECORDATORIO ENVIADO") {
      Logger.log("Omitiendo " + email + ": Ya se le envió previamente.");
      totalOmitidosYaEnviados++;
      continue;
    }

    // C. Determinar tratamiento (Estimada / Estimado / Estimado/a)
    var tratamiento = obtenerTratamientoPorGenero(genero);

    // D. Enviar correo y registrar en Columna G
    try {
      enviarCorreoRecordatorioInscrito(nombre, email, tratamiento);

      // Escribir 'ENVIADO' en Columna G (Columna 7)
      sheet.getRange(i + 1, COL_ESTADO + 1).setValue("ENVIADO");
      SpreadsheetApp.flush(); // Fuerza la actualización inmediata en la celda

      totalEnviados++;
      Logger.log("[" + totalEnviados + "] Recordatorio despachado a: " + email + " (" + tratamiento + " " + nombre + ")");

      // Pausa prudente anti-bloqueo
      Utilities.sleep(CONFIG.PAUSA_ENTRE_ENVIOS_MS);

    } catch (error) {
      Logger.log("ERROR en fila " + (i + 1) + " (" + email + "): " + error.message);
      sheet.getRange(i + 1, COL_ESTADO + 1).setValue("ERROR: " + error.message);
      SpreadsheetApp.flush();
    }
  }

  // Notificación de resumen al finalizar
  var resumen = "=== RESUMEN DE ENVÍOS ===\n" +
                "• Correos enviados con éxito: " + totalEnviados + "\n" +
                "• Omitidos (ya habían recibido el correo): " + totalOmitidosYaEnviados + "\n" +
                "• Filas vacías o sin correo válido: " + totalFilasSinCorreo;

  Logger.log(resumen);
  ui.alert("Proceso Finalizado", resumen, ui.ButtonSet.OK);
}

/**
 * 3. DESPACHADOR INDIVIDUAL DE CORREO:
 * Inyecta las variables dinámicas en la plantilla HTML y genera versión en texto plano.
 */
function enviarCorreoRecordatorioInscrito(nombre, email, tratamiento) {
  tratamiento = tratamiento || "Estimado/a";

  // Respaldo en texto plano para clientes de correo sin soporte HTML
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
  var template = HtmlService.createTemplateFromFile(CONFIG.NOMBRE_PLANTILLA_HTML);

  // 2. Inyectar variables dinámicas
  template.nombre = nombre;
  template.tratamiento = tratamiento;

  // 3. Evaluar HTML
  var htmlBody = template.evaluate().getContent();

  // 4. Enviar mediante Gmail
  GmailApp.sendEmail(email, CONFIG.ASUNTO_CORREO, plainText, {
    htmlBody: htmlBody,
    name: CONFIG.NOMBRE_REMITENTE
  });
}

/**
 * 4. DETECCIÓN FLEXIBLE DE GÉNERO:
 * Reconoce F/M, Femenino/Masculino, Mujer/Hombre o variaciones mayúsculas/minúsculas.
 */
function obtenerTratamientoPorGenero(genero) {
  if (!genero) return "Estimado/a";
  var g = genero.toString().trim().toUpperCase();

  if (g === "F" || g === "FEMENINO" || g === "MUJER" || g === "FEMALE" || g === "WOMAN") {
    return "Estimada";
  } else if (g === "M" || g === "MASCULINO" || g === "HOMBRE" || g === "MALE" || g === "MAN") {
    return "Estimado";
  }

  return "Estimado/a";
}
