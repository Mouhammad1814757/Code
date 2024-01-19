// Definition einer benutzerdefinierten Fehlerklasse CustomAPIError,
// die von der eingebauten JavaScript-Fehlerklasse Error erbt.
class CustomAPIError extends Error {
    // Konstruktor der Klasse, der eine Fehlermeldung als Parameter entgegennimmt.

    constructor(message) {
      // Aufruf des Konstruktors der übergeordneten Klasse Error
    // mit der übergebenen Fehlermeldung, um die Initialisierung abzuschließen.
      super(message)
    }
  }
  // Export der CustomAPIError-Klasse

  export default CustomAPIError
  