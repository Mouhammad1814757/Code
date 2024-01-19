// Importieren der HTTP-Statuscodes-Bibliothek für die Verwendung von vordefinierten Statuscodes.
import { StatusCodes } from 'http-status-codes'
// Importieren der benutzerdefinierten Fehlerklasse CustomAPIError aus der Datei 'custom-api.js'.
import CustomAPIError from './custom-api.js'
// Definition der benutzerdefinierten Fehlerklasse UnauthenticatedError, die von CustomAPIError erbt.
class UnauthenticatedError extends CustomAPIError {
    // Konstruktor der Klasse, der eine Fehlermeldung als Parameter akzeptiert.
  constructor(message) {  
      // Aufruf des Konstruktors der übergeordneten Klasse CustomAPIError mit der übergebenen Fehlermeldung.
    super(message)
     // Festlegen des HTTP-Statuscodes für den UnauthenticatedError auf 401 (Unauthorized).
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}
// Exportieren der UnauthenticatedError-Klasse für die Verwendung in anderen Dateien oder Modulen.
export default UnauthenticatedError
