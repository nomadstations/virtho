
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Droplet, 
  AlertCircle, 
  Heart, 
  Phone, 
  Calendar,
  Activity,
  User,
  Eye,
  Ruler,
  Weight
} from 'lucide-react';
import { HealthCard } from '@/components/health/HealthCard';
import { EmergencyPanel, EmergencyItem } from '@/components/health/EmergencyPanel';
import { HealthMetricWidget } from '@/components/health/HealthMetricWidget';
import { InsuranceCard } from '@/components/health/InsuranceCard';
import { HealthLayout } from '@/components/HealthLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function HealthIDPage() {
  const { toast } = useToast();
  const [healthData, setHealthData] = useState({
    globalHealthId: 'GHI-2026-8472-6391',
    bloodType: 'A+',
    rhFactor: 'Positive',
    organDonor: 'Yes',
    height: '175',
    weight: '72',
    eyeColor: 'Brown',
  });

  const handleSave = () => {
    toast({
      title: 'Health Information Updated',
      description: 'Your health profile has been successfully updated.',
    });
  };

  const handleInputChange = (field, value) => {
    setHealthData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <HealthLayout>
      <Helmet>
        <title>Health ID - Health Dashboard</title>
        <meta name="description" content="View and manage your complete health identification information, medical history, and emergency contacts." />
      </Helmet>

      {/* Global Health ID Header - no z-index conflicts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 md:p-10 text-white shadow-lg mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Shield className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Global Health ID</h1>
            <p className="text-blue-100 mt-1">Your universal health identifier</p>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <p className="text-sm text-blue-100 mb-1">Health ID Number</p>
          <p className="text-2xl md:text-3xl font-mono font-bold tracking-wider">
            {healthData.globalHealthId}
          </p>
        </div>
      </motion.div>

      {/* Blood Type & Emergency Panel - no z-index conflicts */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <HealthCard
          title="Blood Type"
          icon={<Droplet className="w-5 h-5 text-red-600" />}
          variant="default"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="bloodType">Blood Type</Label>
              <Select value={healthData.bloodType} onValueChange={(value) => handleInputChange('bloodType', value)}>
                <SelectTrigger id="bloodType" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <span className="text-sm font-medium text-gray-700">Rh Factor</span>
              <span className="text-lg font-bold text-red-900">{healthData.rhFactor}</span>
            </div>
          </div>
        </HealthCard>

        <div className="lg:col-span-2">
          <EmergencyPanel title="Critical Emergency Information">
            <EmergencyItem
              label="Life-Threatening Allergies"
              value="Penicillin, Peanuts"
              icon={<AlertCircle className="w-5 h-5 text-red-600" />}
            />
            <EmergencyItem
              label="Organ Donor Status"
              value={healthData.organDonor}
              icon={<Heart className="w-5 h-5 text-red-600" />}
            />
            <EmergencyItem
              label="Emergency Contact"
              value="Jane Doe - (555) 123-4567"
              icon={<Phone className="w-5 h-5 text-red-600" />}
            />
          </EmergencyPanel>
        </div>
      </div>

      {/* Current Vitals - no z-index conflicts */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Vitals</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <HealthMetricWidget
            label="Blood Pressure"
            value="120/80"
            unit="mmHg"
            icon={<Activity className="w-5 h-5" />}
            trend="stable"
            trendValue="Normal"
            status="normal"
          />
          <HealthMetricWidget
            label="Heart Rate"
            value="72"
            unit="bpm"
            icon={<Heart className="w-5 h-5" />}
            trend="stable"
            trendValue="Normal"
            status="normal"
          />
          <HealthMetricWidget
            label="BMI"
            value="23.5"
            unit="kg/m²"
            icon={<Activity className="w-5 h-5" />}
            trend="stable"
            trendValue="Healthy"
            status="normal"
          />
          <HealthMetricWidget
            label="Last Checkup"
            value="2 months"
            unit="ago"
            icon={<Calendar className="w-5 h-5" />}
            status="normal"
          />
        </div>
      </div>

      {/* Biometrics - no z-index conflicts */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Biometric Information</h2>
        <HealthCard
          title="Physical Characteristics"
          icon={<User className="w-5 h-5 text-purple-600" />}
        >
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <div className="relative mt-1">
                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="height"
                  type="number"
                  value={healthData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className="pl-10"
                  placeholder="175"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <div className="relative mt-1">
                <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="weight"
                  type="number"
                  value={healthData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="pl-10"
                  placeholder="72"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="eyeColor">Eye Color</Label>
              <div className="relative mt-1">
                <Eye className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Select value={healthData.eyeColor} onValueChange={(value) => handleInputChange('eyeColor', value)}>
                  <SelectTrigger id="eyeColor" className="pl-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Brown">Brown</SelectItem>
                    <SelectItem value="Blue">Blue</SelectItem>
                    <SelectItem value="Green">Green</SelectItem>
                    <SelectItem value="Hazel">Hazel</SelectItem>
                    <SelectItem value="Gray">Gray</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Button onClick={handleSave} className="mt-4 bg-purple-600 hover:bg-purple-700 w-full md:w-auto">
            Save Biometric Data
          </Button>
        </HealthCard>
      </div>

      {/* Insurance Information - no z-index conflicts */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Insurance Coverage</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <InsuranceCard
            provider="National Health Fund"
            policyNumber="NHF-2026-45678"
            type="Primary Health Insurance"
            coverage="Comprehensive Coverage"
            expiryDate="December 31, 2026"
            contactNumber="1-800-HEALTH-1"
            status="active"
          />
          <InsuranceCard
            provider="Premium Health Plus"
            policyNumber="PHP-789456"
            type="Supplemental Insurance"
            coverage="Dental, Vision, Mental Health"
            expiryDate="June 30, 2026"
            contactNumber="1-800-555-CARE"
            status="active"
          />
        </div>
      </div>

      {/* Quick Overview Widgets - no z-index conflicts */}
      <div className="grid md:grid-cols-3 gap-6">
        <HealthCard
          title="Upcoming Appointments"
          icon={<Calendar className="w-5 h-5 text-blue-600" />}
          variant="info"
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Cardiology</span>
              <span className="text-sm font-semibold text-blue-900">May 15</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Dentist</span>
              <span className="text-sm font-semibold text-blue-900">May 22</span>
            </div>
          </div>
        </HealthCard>

        <HealthCard
          title="Recent Lab Results"
          icon={<Activity className="w-5 h-5 text-emerald-600" />}
          variant="wellness"
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Blood Panel</span>
              <span className="text-sm font-semibold text-emerald-700">Normal</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Cholesterol</span>
              <span className="text-sm font-semibold text-emerald-700">Normal</span>
            </div>
          </div>
        </HealthCard>

        <HealthCard
          title="Medications"
          icon={<Heart className="w-5 h-5 text-red-600" />}
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active</span>
              <span className="text-sm font-semibold text-gray-900">3 prescriptions</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Refills Due</span>
              <span className="text-sm font-semibold text-amber-700">1 upcoming</span>
            </div>
          </div>
        </HealthCard>
      </div>
    </HealthLayout>
  );
}
