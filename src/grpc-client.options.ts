import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from './auth/auth.pb';
import { USER_PACKAGE_NAME } from './user/user.pb';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: process.env.GRPC_URL_USER_SERVICE,
    package: [USER_PACKAGE_NAME, AUTH_PACKAGE_NAME],
    protoPath: [join(__dirname, '../../../proto/user.proto'), join(__dirname, '../../../proto/auth.proto')]
  },
};
