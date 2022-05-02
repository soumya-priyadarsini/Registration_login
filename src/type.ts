export interface DatabaseConfig{
    dbType:string,
    dbName:string,
    host:string,
    dbPort:string | number
}


export interface SmtpConfig {
    username: string;
    port: number;
    password: string;
    host: string;
    email: string;
    send_port: number;
  }