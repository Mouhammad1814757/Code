// Importiere die HTTP-Statuscodes, um sie in der Fehlerbehandlung zu verwenden
import { StatusCodes } from 'http-status-codes'
// Middleware-Funktion für die Fehlerbehandlung
const errorHandler = (err, req, res, next) => {
  // Standard-Fehlerobjekt mit Standardwerten für Statuscode und Fehlermeldung
    const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Etwas ist schiefgegangen. Versuchen Sie es später erneut.',
  }
  // Behandlung von Validierungsfehlern (ValidationError)
  if (err.name === 'ValidationError') {
        // Setze den Statuscode auf "Bad Request" (400)
    defaultError.statusCode = StatusCodes.BAD_REQUEST
    // Passe die Fehlermeldung an, um die validierungsbezogenen Fehlermeldungen zu enthalten
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ')
  }
  // Behandlung von Eindeutigkeitsfehlern (Unique Field Error)
  if (err.code && err.code === 11000) {
        // Setze den Statuscode auf "Bad Request" (400)
    defaultError.statusCode = StatusCodes.BAD_REQUEST
        // Passe die Fehlermeldung an, um auf das betroffene eindeutige Feld hinzuweisen
    defaultError.msg = `${Object.keys(err.keyValue)} field hat to be unique`
  }
    // Behandlung von CastError
  if (err.name === 'CastError') {
    // Setze die Fehlermeldung, um auf das Fehlen eines Elements mit der angegebenen ID hinzuweisen
    defaultError.msg = `No item found with id : ${err.value}`
    // Setze den Statuscode auf "Not Found" (404)
    defaultError.statusCode = 404
  }
    // Sende die Antwort an den Client mit dem entsprechenden Statuscode und der Fehlermeldung im JSON-Format
  res.status(defaultError.statusCode).json({ msg: defaultError.msg })
}
// Exportiere die ErrorHandler-Middleware für die Verwendung in anderen  Teilen der Anwendung
export default errorHandler
