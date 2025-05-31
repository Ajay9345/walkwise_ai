import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';

export const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      await register(name, email, password);
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
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Join WalkWise.AI for safer urban navigation</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 rounded-md bg-danger-50 dark:bg-danger-900/20 p-3 text-danger-600 dark:text-danger-400">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            leftIcon={<User size={18} />}
          />
          
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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            leftIcon={<Lock size={18} />}
          />
          
          <Input
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            leftIcon={<Lock size={18} />}
          />
          
          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              I agree to the{' '}
              <a href="#" className="text-primary-500 hover:text-primary-600">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-500 hover:text-primary-600">
                Privacy Policy
              </a>
            </label>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            leftIcon={<UserPlus size={18} />}
          >
            Create Account
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
              Sign up with Google
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center gap-2">
        <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
          Already have an account?{' '}
          <a href="/login" className="text-primary-500 hover:text-primary-600">
            Sign in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};
