import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/constants';
import { Card } from '@/components/SharedUI';

function LoginPage() {
  const { login } = useAuth();

  return (
    <>
      <Helmet>
        <title>Login - Virtho</title>
      </Helmet>

      <div className="flex-grow flex items-center justify-center p-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 shadow-md border-gray-100">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              Welcome Back
            </h1>

            <p className="text-gray-600 mb-8">
              Login with your Virtho account to continue.
            </p>

            <Button
              type="button"
              onClick={login}
              className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg mt-2"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Login with Virtho
            </Button>

            <p className="text-center text-gray-600 mt-6 text-sm">
              Don&apos;t have an account?{' '}
              <Link
                to={ROUTES.REGISTER}
                className="text-purple-600 font-bold hover:underline"
              >
                Register here
              </Link>
            </p>
          </Card>
        </motion.div>
      </div>
    </>
  );
}

export default LoginPage;