// Importieren benutzerdefinierter Fehlerklassen für die Fehlerbehandlung in einer Node.js-Anwendung.
import BadRequestError from './bad-request.js'
import NotFoundError from './not-found.js'
import UnauthenticatedError from './UnauthenticatedError.js'
import UnauthorizededError from './UnauthorizedError.js'
// Exportieren der importierten Fehlerklassen für die Verwendung in anderen Dateien oder Modulen.

export {
  BadRequestError,
  NotFoundError,
  UnauthorizededError,
  UnauthenticatedError,
}
