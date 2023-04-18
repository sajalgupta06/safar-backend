// Mapper for environment variables

export const environment = process.env.NODE_ENV;
export const port = process.env.PORT || 8080 ;

export const db = {
  name: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_USER_PWD || '',
};

export const corsUrl = process.env.CORS_URL;

export const tokenInfo = {
  accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '0'),
  refreshTokenValidityDays: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '0'),
  issuer: process.env.TOKEN_ISSUER || '',
  audience: process.env.TOKEN_AUDIENCE || '',
};

export const logDirectory = process.env.LOG_DIR;

export const firebaseConfig = {
  "type": process.env.TYPE,
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY || "",
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_CERT_URL,
  "client_x509_cert_url": process.env.CLIENT_CERT_URL,

}
export const otpInfo = {

  otpExpiryTimeInSeconds: parseInt(process.env.OTP_EXP_TIME_IN_SECONDS || "300"),
  otpSecret: process.env.OTP_SECRET || "",
  otpLength:parseInt(process.env.OTP_LENGTH || "6")



}

export const awsKeys = {
accessIDKey : process.env.ACCESS_ID_KEY,
secreteAccessKey: process.env.SECRET_ACCESS_KEY
}



