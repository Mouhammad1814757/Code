// Importieren der HTTP-Statuscodes-Bibliothek für die Verwendung von vordefinierten Statuscodes.

import { StatusCodes } from 'http-status-codes'
// Importieren der benutzerdefinierten Fehlerklasse CustomAPIError aus der Datei 'custom-api.js'.
import CustomAPIError from './custom-api.js'
// Definition der benutzerdefinierten Fehlerklasse NotFoundError, die von CustomAPIError erbt.

class NotFoundError extends CustomAPIError {
    // Konstruktor der Klasse, der eine Fehlermeldung als Parameter akzeptiert.
  constructor(message) {
    super(message)
        // Festlegen des HTTP-Statuscodes für den NotFoundError auf 404 (Not Found).
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

export default NotFoundError
