// Importiere die Mongoose-Bibliothek
import mongoose from 'mongoose'
// Funktion, um eine Verbindung zur MongoDB-Datenbank herzustellen
const connectDB = (url) => {
     // Verwende mongoose.connect, um die Verbindung zur MongoDB herzustellen
      // Die Optionen (useNewUrlParser und useUnifiedTopology) sind optional, aber häufig empfohlen
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

export default connectDB