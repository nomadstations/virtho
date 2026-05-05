
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileText, Scale, UserCheck, Heart, FileSignature, ShieldCheck } from 'lucide-react';
import { DocumentCard } from '@/components/health/DocumentCard';
import { HealthLayout } from '@/components/HealthLayout';

export default function LegalAndInsurancePage() {
  const legalDocuments = {
    consents: [
      {
        title: 'Informed Consent for Surgery',
        type: 'Medical Consent',
        dateCreated: 'January 15, 2026',
        dateModified: 'January 15, 2026',
        status: 'active',
        content: 'I hereby give my informed consent for the surgical procedure as discussed with my physician. I understand the risks, benefits, and alternatives to the proposed treatment.',
        icon: <FileSignature className="w-6 h-6 text-purple-600" />,
      },
      {
        title: 'General Treatment Consent',
        type: 'Healthcare Consent',
        dateCreated: 'March 10, 2025',
        dateModified: 'January 5, 2026',
        status: 'active',
        content: 'I consent to receive medical treatment and procedures as deemed necessary by my healthcare providers at authorized medical facilities.',
        icon: <FileSignature className="w-6 h-6 text-purple-600" />,
      },
    ],
    livingWill: [
      {
        title: 'Advance Healthcare Directive',
        type: 'Living Will',
        dateCreated: 'June 20, 2024',
        dateModified: 'December 1, 2025',
        status: 'active',
        content: 'This document outlines my wishes regarding medical treatment in the event that I become unable to communicate my decisions. I have specified my preferences for life-sustaining treatment, pain management, and organ donation.',
        icon: <Heart className="w-6 h-6 text-red-600" />,
      },
      {
        title: 'Do Not Resuscitate Order',
        type: 'DNR Order',
        dateCreated: 'June 20, 2024',
        dateModified: 'June 20, 2024',
        status: 'draft',
        content: 'Instructions regarding cardiopulmonary resuscitation and emergency medical interventions in specific medical scenarios.',
        icon: <Heart className="w-6 h-6 text-red-600" />,
      },
    ],
    powerOfAttorney: [
      {
        title: 'Healthcare Power of Attorney',
        type: 'Medical POA',
        dateCreated: 'August 5, 2024',
        dateModified: 'November 12, 2025',
        status: 'active',
        content: 'I designate Jane Doe as my healthcare agent to make medical decisions on my behalf if I am unable to do so. This includes decisions about treatment, procedures, and end-of-life care.',
        icon: <UserCheck className="w-6 h-6 text-blue-600" />,
      },
      {
        title: 'Financial Power of Attorney',
        type: 'Financial POA',
        dateCreated: 'August 5, 2024',
        dateModified: 'August 5, 2024',
        status: 'active',
        content: 'Authorization for designated individual to manage financial affairs and make financial decisions related to healthcare expenses and insurance claims.',
        icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      },
    ],
  };

  return (
    <HealthLayout>
      <Helmet>
        <title>Legal Documents & Insurance - Health Dashboard</title>
        <meta name="description" content="Manage your legal healthcare documents, advanced directives, and power of attorney designations." />
      </Helmet>

      {/* Header - no z-index conflicts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-8 md:p-10 text-white shadow-lg mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Scale className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Legal Documents & Directives</h1>
            <p className="text-purple-100 mt-1">Manage your healthcare legal documents and authorizations</p>
          </div>
        </div>
      </motion.div>

      {/* Informed Consents Section - no z-index conflicts */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <FileSignature className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Informed Consents</h2>
            <p className="text-gray-600 text-sm">Medical treatment authorizations and consent forms</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {legalDocuments.consents.map((doc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <DocumentCard {...doc} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Living Will Section - no z-index conflicts */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Living Will & Advanced Directives</h2>
            <p className="text-gray-600 text-sm">End-of-life care preferences and medical treatment instructions</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {legalDocuments.livingWill.map((doc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <DocumentCard {...doc} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Power of Attorney Section - no z-index conflicts */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Power of Attorney</h2>
            <p className="text-gray-600 text-sm">Delegated decision-making authority for healthcare and financial matters</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {legalDocuments.powerOfAttorney.map((doc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <DocumentCard {...doc} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Information Banner - no z-index conflicts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
      >
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Document Security & Privacy</h3>
            <p className="text-sm text-blue-800 leading-relaxed">
              All legal documents are encrypted and stored securely. Only authorized healthcare providers and designated individuals can access these documents. You can update or revoke access at any time through your account settings.
            </p>
          </div>
        </div>
      </motion.div>
    </HealthLayout>
  );
}
