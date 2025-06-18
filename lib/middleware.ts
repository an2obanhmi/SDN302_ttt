import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function verifyAuth(request: Request | NextRequest) {
  try {
    const token = await getToken({ 
      req: request as any, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    if (!token) {
      return {
        isAuthenticated: false,
        user: null,
        error: 'Unauthorized - No token provided'
      };
    }

    return {
      isAuthenticated: true,
      user: token,
      error: null
    };
  } catch (error) {
    console.error('Auth verification error:', error);
    return {
      isAuthenticated: false,
      user: null,
      error: 'Unauthorized - Invalid token'
    };
  }
}

export async function requireAuth(request: Request | NextRequest) {
  const authResult = await verifyAuth(request);
  
  if (!authResult.isAuthenticated) {
    return NextResponse.json(
      { error: authResult.error || 'Unauthorized' },
      { status: 401 }
    );
  }

  return authResult;
}

export async function requireAdminAuth(request: Request | NextRequest) {
  const authResult = await verifyAuth(request);
  
  if (!authResult.isAuthenticated) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Kiểm tra role admin
  const user = authResult.user as any;
  if (user?.role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden - Admin access required' },
      { status: 403 }
    );
  }

  return authResult;
} 