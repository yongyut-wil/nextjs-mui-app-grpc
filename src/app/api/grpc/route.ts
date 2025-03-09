import { NextRequest, NextResponse } from 'next/server';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { getUsersService } from '@/services/userService';

// Load the protobuf definition
const PROTO_PATH = path.resolve(process.cwd(), 'src/protos/users.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const usersProto = grpc.loadPackageDefinition(packageDefinition).users;

// Create the gRPC server
const server = new grpc.Server();

// Add the service implementation to the server
server.addService(
  (usersProto as unknown as { UserService: { service: grpc.ServiceDefinition } }).UserService.service,
  {
    getUsers: getUsersService,
  }
);

// Start the server if it's not already started
let serverStarted = false;

function ensureServerStarted() {
  if (!serverStarted) {
    const port = 50051;
    server.bindAsync(
      `0.0.0.0:${port}`,
      grpc.ServerCredentials.createInsecure(),
      (err, port) => {
        if (err) {
          console.error('Failed to start gRPC server:', err);
          return;
        }
        // ไม่จำเป็นต้องเรียก server.start() อีกต่อไป (ถูกเรียกอัตโนมัติใน bindAsync callback)
        serverStarted = true;
        console.log(`gRPC server started on port ${port}`);
      }
    );
  }
}

// Handle requests - we'll proxy the gRPC service through a REST endpoint
// This is needed since we can't directly expose gRPC in browsers without special setup
export async function GET(request: NextRequest) {
  ensureServerStarted();
  
  const searchParams = request.nextUrl.searchParams;
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const skip = parseInt(searchParams.get('skip') || '0', 10);
  
  return new Promise<NextResponse>((resolve) => {
    // Create a gRPC client
    // Create a type-safe client instead of using 'any'
    const UserServiceClient = (usersProto as unknown as { 
      UserService: new (
        address: string, 
        credentials: grpc.ChannelCredentials
      ) => { getUsers: (request: { limit: number, skip: number }, callback: (err: Error | null, response: unknown) => void) => void }
    }).UserService;
    
    const client = new UserServiceClient(
      '0.0.0.0:50051',
      grpc.credentials.createInsecure()
    );
    
    // Call the service
    client.getUsers({ limit, skip }, (err: unknown, response: unknown) => {
      if (err) {
        console.error('Error calling gRPC service:', err);
        resolve(NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }));
        return;
      }
      
      resolve(NextResponse.json(response));
    });
  });
}

// Support both POST and GET for flexibility
export const POST = GET;
