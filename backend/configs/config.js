/**
 * @sumary We use the .env associating it with the port, DBUrl and the secret key for Token
 */

export const config = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/feedBacked',
  SUPERSECRET: process.env.JWT_SECRET || 'superSecretPassword'
}
