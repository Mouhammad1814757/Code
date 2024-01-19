import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-api.js'
// Definition der benutzerdefinierten Fehlerklasse UnauthorizedError, die von CustomAPIError erbt.
class UnauthorizedError extends CustomAPIError {
   // Konstruktor der Klasse, der eine Fehlermeldung als Parameter akzeptiert.
  constructor(message) {
        // Aufruf des Konstruktors der übergeordneten Klasse CustomAPIError mit der übergebenen Fehlermeldung.
    super(message)
    // Festlegen des HTTP-Statuscodes für den UnauthorizedError auf 403 (Forbidden).
    this.statusCode = StatusCodes.FORBIDDEN
  }
}
// Exportieren der UnauthorizedError-Klasse für die Verwendung in anderen Dateien oder Modulen.
export default UnauthorizedError
