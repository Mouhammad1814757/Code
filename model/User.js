import mongoose from 'mongoose' 
import validator from 'validator' 
import bcrypt from 'bcryptjs' 
import jwt from 'jsonwebtoken' 
// Definiere das User-Schema  
const UserSchema = new mongoose.Schema({ 
  firstname: { 
    type: String, 
    required: [true, 'Bitte geben Sie Ihre Vorname ein '], 
    minlength: 3, 
    maxlength: 20, 
    trim: true, // Leerzeichen am Anfang und Ende des eingegebenen Strings werden entfernt 
   
  }, 
  password: { 
    type: String, 
    required: [true, 'Bitte geben Sie Ihre Passwort ein'], 
    minlength: 5, 
    select: false,// Das Passwort wird standardmäßig nicht bei Abfragen zurückgegeben 
  }, 
  // Nachname des Benutzers 
  lastname: { 
    type: String, 
    required: [true, 'Bitte geben Sie Ihre Nachname ein'], 
    minlength: 3, 
    maxlength: 20, 
    trim: true, 
  }, 
   // E-Mail-Adresse des Benutzers 
  email: { 
    type: String, 
    required: [true, 'Bitte E-Mail adresse eingeben an'], 
    validate: { 
      validator: validator.isEmail, 
      message: 'Bitte geben Sie eine gültige E-Mail-Adresse an.', 
    }, 
    unique: true,// Die E-Mail-Adresse muss eindeutig sein 
  }, 
  // Status des Benutzers 
  status: { 
    required: true, 
    type: Boolean, 
    default: false,// Standardmäßig ist der Status auf 'false' 
  }, 
   
 
}) 
// Vor dem Speichern des Benutzers wird das Passwort gehasht 
UserSchema.pre('save', async function () { 
  // console.log(this.modifiedPaths()) 
  if (!this.isModified('password')) return 
  const salt = await bcrypt.genSalt(10) 
  this.password = await bcrypt.hash(this.password, salt) 
}) 
// Methode, um ein JWT für den Benutzer zu erstellen 
UserSchema.methods.createJWT = function (tokenUser) { 
  return jwt.sign( 
    { userId: tokenUser.userId, role: tokenUser.role, name: tokenUser.name }, 
    process.env.JWT_SECRET,// Geheimer Schlüssel für die Signatur des Tokens 
    { 
      expiresIn: process.env.JWT_LIFETIME, // Gültigkeitsdauer des Tokens 
    } 
  ) 
} 
// Methode zum Vergleichen des eingegebenen Passworts mit dem gehashten Passwort in der Datenbank 
 
UserSchema.methods.comparePassword = async function (candidatePassword) { 
  const isMatch = await bcrypt.compare(candidatePassword, this.password) 
  return isMatch 
} 
export default mongoose.model('User', UserSchema)