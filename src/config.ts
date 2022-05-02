import 'dotenv/config';
import { DatabaseConfig,SmtpConfig } from './type';

interface RegistrationConfig {
    serverPort: number,
    database: DatabaseConfig,
    smtpConfig:SmtpConfig
}
const config: RegistrationConfig = {
    serverPort: Number(process.env.SERVER_PORT) || 3001,
    database: {
        dbType: process.env.DB_TYPE ||'mongodb',
        dbName: process.env.DB_NAME ||'registration',
        host: process.env.DB_HOST ||'localhost',
        dbPort: process.env.DB_PORT || 27017
    },
    smtpConfig: {
        username: process.env.SMTP_USERNAME || 'soumyapriya.wikiance@gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        password: process.env.SMTP_PASSWORD || "Soumyawiki12@",
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        email: process.env.SENDER_EMAIL || 'soumyapriya.wikiance@gmail.com',
        send_port: Number(process.env.EMAIL_PORT) || 3000
      },

}
export default config