// Importieren der HTTP-Statuscodes-Bibliothek für die Verwendung von HTTP-Statuscodes in der Fehlerklasse
import { StatusCodes } from 'http-status-codes'
// Importieren der benutzerdefinierten Fehlerklasse CustomAPIError aus der Datei 'custom-api.js'
import CustomAPIError from './custom-api.js'
// Definition der benutzerdefinierten Fehlerklasse BadRequestError, die von CustomAPIError erbt
class BadRequestError extends CustomAPIError {
  // Konstruktor der Klasse, der eine Fehlermeldung als Parameter akzeptiert
  constructor(message) {
  // Aufruf des Konstruktors der übergeordneten Klasse (CustomAPIError) mit der übergebenen Fehlermeldung
    super(message)
  // Festlegen des HTTP-Statuscodes für den BadRequestError auf 400 (Bad Request)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}
// Exportieren der BadRequestError-Klasse für die Verwendung in anderen Dateien
export default BadRequestError
