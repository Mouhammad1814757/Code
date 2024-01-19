// Importieren der Fehlerklassen und des User-Modells
import {
    BadRequestError,
    NotFoundError,
    UnauthenticatedError,
  } from '../errors/index.js'
  import User from '../model/User.js'
  //in  Node.js-Anwendungen verwendet wird, um HTTP-Statuscodes in einer einfachen und intuitiven Weise zu verwenden.
  import { StatusCodes } from 'http-status-codes'
  // Funktion zum Registrieren eines neuen Benutzers
  const register = async (req, res) => {
    // Ausgabe der erhaltenen Anforderungsdetails (kann für Debugging-Zwecke verwendet werden)
    console.log(req.body)
      // Erstellen eines neuen Benutzers basierend auf den erhaltenen Anforderungsdetails
          const user = await User.create({ ...req.body })
        // Erstellen eines JWT-Tokens für den Benutzer
          const tokenUser = {
      name: user.name,
      userId: user._id,
      role: user.role,
      position: user.position,
    }
    const token = user.createJWT(tokenUser)
        // Senden der erfolgreichen Antwort mit dem erstellten Benutzer und dem JWT-Token
    res.status(StatusCodes.CREATED).json({
      user: {
        email: user.email,
        lastName: user.lastName,
        location: user.location,
        name: user.name,
        token,
      },
    })
  }
  // Funktion zum Einloggen eines Benutzers
  const login = async (req, res) => {
 // Ausgabe der erhaltenen Anforderungsdetails (kann für Debugging-Zwecke verwendet werden)
    console.log(req.body)
      // Extrahieren von E-Mail und Passwort aus den Anforderungsdetails

    const { email, password } = req.body
      // Überprüfen, ob E-Mail und Passwort vorhanden sind; andernfalls Fehler werfen
    if (!email || !password) {
      throw new BadRequestError('Bitte gib eine E-Mail-Adresse und ein Passwort an.')
    }
        // Suchen des Benutzers anhand der E-Mail und Abrufen des Passworts (mit Select +)
    const user = await User.findOne({ email }).select('+ password')
    if (!user) {
      throw new UnauthenticatedError('Kein User gefunden ')
    }
        // Überprüfen, ob das eingegebene Passwort korrekt ist; andernfalls Fehler werfen
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Password ist nicht korrekt')
    }
  
    // Erstellen eines JWT-Tokens für den erfolgreichen Benutzerlogin
    const tokenUser = {
      name: user.name,
      userId: user._id,
      role: user.role,
      position: user.position,
    }
    const token = user.createJWT(tokenUser)
       // Senden der erfolgreichen Antwort mit dem Benutzer
    res.status(StatusCodes.OK).json({ user })
  }
  // Exportieren der Login- und Registrierungsfunktionen für die Verwendung in anderen Dateien

  export { login, register }
  