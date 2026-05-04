
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Heart, Activity, Brain, Calendar, Shield, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HealthCard } from '@/components/health/HealthCard';
import { HealthMetricWidget } from '@/components/health/HealthMetricWidget';
import { HealthLayout } from '@/components/HealthLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function WellnessPage() {
  const { toast } = useToast();

  const quickAccessCards = [
    {
      title: 'Health ID',
      description: 'View your complete health profile and medical information',
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      path: '/health/health-id',
      color: 'bg-blue-50 border-blue-200',
    },
    {
      title: 'Legal & Insurance',
      description: 'Manage legal documents and insurance policies',
      icon: <FileText className="w-6 h-6 text-purple-600" />,
      path: '/health/legal-and-insurance',
      color: 'bg-purple-50 border-purple-200',
    },
  ];

  const todayMetrics = [
    { label: 'Steps', value: '8,432', unit: 'steps', icon: <Activity className="w-5 h-5" />, trend: 'up', trendValue: '+12%', status: 'normal' },
    { label: 'Heart Rate', value: '72', unit: 'bpm', icon: <Heart className="w-5 h-5" />, trend: 'stable', trendValue: 'Normal', status: 'normal' },
    { label: 'Sleep', value: '7.5', unit: 'hours', icon: <Brain className="w-5 h-5" />, trend: 'up', trendValue: '+0.5h', status: 'normal' },
    { label: 'Water', value: '6', unit: 'glasses', icon: <Activity className="w-5 h-5" />, trend: 'down', trendValue: '-2', status: 'warning' },
  ];

  const handleFeatureClick = () => {
    toast({
      title: 'Feature Coming Soon',
      description: '🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀',
    });
  };

  return (
    <HealthLayout>
      <Helmet>
        <title>Wellness Dashboard - Health</title>
        <meta name="description" content="Monitor your health metrics, track wellness goals, and access your complete health information." />
      </Helmet>

      {/* Hero Section */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 md:p-12 text-white shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Wellness Dashboard</h1>
          </div>
          <p className="text-lg text-emerald-50 max-w-2xl">
            Your comprehensive health overview. Track metrics, manage appointments, and access your complete health profile.
          </p>
        </motion.div>
      </div>

      {/* Today's Metrics */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Activity</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {todayMetrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <HealthMetricWidget {...metric} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Access</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {quickAccessCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={card.path} className="block group">
                <div className={`health-card ${card.color} p-6 h-full transition-all duration-300 group-hover:shadow-lg`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center">
                      {card.icon}
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{card.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Health Overview Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <HealthCard
          title="Upcoming Appointments"
          icon={<Calendar className="w-5 h-5 text-blue-600" />}
          variant="info"
        >
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg border border-blue-200">
              <p className="font-semibold text-gray-900">Annual Checkup</p>
              <p className="text-sm text-gray-600 mt-1">Dr. Sarah Johnson</p>
              <p className="text-sm font-medium text-blue-600 mt-1">Tomorrow, 10:00 AM</p>
            </div>
            <Button onClick={handleFeatureClick} variant="outline" className="w-full text-blue-600 border-blue-300 hover:bg-blue-50">
              View All Appointments
            </Button>
          </div>
        </HealthCard>

        <HealthCard
          title="Recent Lab Results"
          icon={<Activity className="w-5 h-5 text-emerald-600" />}
          variant="wellness"
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Cholesterol</span>
              <span className="font-semibold text-emerald-700">Normal</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Blood Sugar</span>
              <span className="font-semibold text-emerald-700">Normal</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Blood Pressure</span>
              <span className="font-semibold text-emerald-700">Normal</span>
            </div>
            <Button onClick={handleFeatureClick} variant="outline" className="w-full text-emerald-600 border-emerald-300 hover:bg-emerald-50">
              View Detailed Results
            </Button>
          </div>
        </HealthCard>

        <HealthCard
          title="Wellness Goals"
          icon={<Heart className="w-5 h-5 text-purple-600" />}
        >
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Daily Steps</span>
                <span className="text-sm font-semibold text-purple-600">84%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Water Intake</span>
                <span className="text-sm font-semibold text-blue-600">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <Button onClick={handleFeatureClick} variant="outline" className="w-full">
              Manage Goals
            </Button>
          </div>
        </HealthCard>
      </div>
    </HealthLayout>
  );
}
