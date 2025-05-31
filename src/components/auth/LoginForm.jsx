import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>Sign in to your WalkWise.AI account</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 rounded-md bg-danger-50 dark:bg-danger-900/20 p-3 text-danger-600 dark:text-danger-400">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            leftIcon={<Mail size={18} />}
          />
          
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            leftIcon={<Lock size={18} />}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
            
            <a href="#" className="text-sm font-medium text-primary-500 hover:text-primary-600">
              Forgot password?
            </a>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            leftIcon={<LogIn size={18} />}
          >
            Sign in
          </Button>
        </form>
        
        <div className="mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-light dark:border-border-dark"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card-light dark:bg-card-dark px-2 text-text-light-secondary dark:text-text-dark-secondary">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              fullWidth
              className="flex items-center justify-center gap-2"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center gap-2">
        <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
          Don't have an account?{' '}
          <a href="/register" className="text-primary-500 hover:text-primary-600">
            Sign up
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};
