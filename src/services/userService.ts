import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { UserRequest, UserResponse } from './users.interface';

// Load the protobuf
const PROTO_PATH = path.resolve(process.cwd(), 'src/protos/users.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const usersProto = grpc.loadPackageDefinition(packageDefinition).users;

interface GrpcCall<RequestType> {
  request: RequestType;
}

type GrpcCallback<ResponseType> = (
  error: grpc.ServiceError | null,
  response?: ResponseType
) => void;

// Implement the service
export async function getUsersService(
  call: GrpcCall<UserRequest>,
  callback: GrpcCallback<UserResponse> 
) {
  try {
    const { limit = 10, skip = 0 } = call.request;
    
    const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data: UserResponse = await response.json();
    callback(null, data);
  } catch (error) {
    console.error('Error fetching users:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'Error fetching users from API',
      name: 'Internal Error',
      details: error instanceof Error ? error.message : 'Unknown error',
      metadata: new grpc.Metadata()
    });
  }
}

// Function to get the service definition for use in Next.js API routes
export function getUserServiceDefinition(): grpc.ServiceDefinition {
  return (usersProto as unknown as { UserService: { service: grpc.ServiceDefinition } }).UserService.service;
}
