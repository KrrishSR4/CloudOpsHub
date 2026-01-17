import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { createSupabaseClient } from '../config/supabase.config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private supabase;

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.supabase = createSupabaseClient(configService);
  }

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    // Check if user already exists
    const { data: existingUser } = await this.supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        throw new ConflictException('User with this email already exists');
      }
      throw new ConflictException(authError.message || 'Failed to create user');
    }

    if (!authData.user) {
      throw new ConflictException('Failed to create user');
    }

    // Store user metadata in users table
    const { data: userData, error: dbError } = await this.supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email: authData.user.email,
        name: name,
      })
      .select()
      .single();

    if (dbError) {
      // If user table insert fails, we still have auth user, so continue
      console.error('Failed to insert user metadata:', dbError);
    }

    // Generate JWT token
    const payload = { sub: authData.user.id, email: authData.user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name: name,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Authenticate with Supabase
    const { data: authData, error: authError } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Get user metadata
    const { data: userData } = await this.supabase
      .from('users')
      .select('id, email, name')
      .eq('id', authData.user.id)
      .single();

    const userName = userData?.name || authData.user.user_metadata?.name || 'User';

    // Generate JWT token
    const payload = { sub: authData.user.id, email: authData.user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name: userName,
      },
    };
  }

  async validateUser(userId: string) {
    const { data: userData } = await this.supabase
      .from('users')
      .select('id, email, name')
      .eq('id', userId)
      .single();

    if (!userData) {
      return null;
    }

    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
    };
  }
}
