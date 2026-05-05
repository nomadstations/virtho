import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SimpleModal } from './SimpleModal.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MultiStepProgressBar } from '@/components/MultiStepProgressBar.jsx';
import { virthoApi, VirthoApiError } from '@/lib/virthoApi';
import { useAuth } from '@/contexts/AuthContext';

const emptyFormData = {
  name: '',
  structure_mode: 'HIERARCHICAL',
  visibility: 'PUBLIC',
  contactPerson: '',
  contactEmail: '',
  address: '',
  website: '',
  description: ''
};

function normalizeStructureMode(value) {
  if (value === 'NON_HIERARCHICAL') return 'NON_HIERARCHICAL';
  return 'HIERARCHICAL';
}

function normalizeVisibility(value) {
  if (value === 'PRIVATE') return 'PRIVATE';
  return 'PUBLIC';
}

function optionalString(value) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function AddOrganizationWizard({ isOpen, onClose, initialData = null, onSave = null }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(emptyFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const { loadMyEntities } = useAuth();

  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (isOpen) {
      setStep(1);

      if (initialData) {
        setFormData({
          name: initialData.name || '',
          structure_mode: normalizeStructureMode(initialData.structure_mode),
          visibility: normalizeVisibility(initialData.visibility),
          contactPerson: initialData.primary_contact_name || initialData.contactPerson || '',
          contactEmail: initialData.contact_email || initialData.contactEmail || '',
          address: initialData.address || '',
          website: initialData.website || '',
          description: initialData.description || ''
        });
      } else {
        setFormData(emptyFormData);
      }

      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, initialData]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Organization name must be at least 2 characters.';
    }

    if (formData.name.trim().length > 128) {
      newErrors.name = 'Organization name cannot exceed 128 characters.';
    }

    if (!['HIERARCHICAL', 'NON_HIERARCHICAL'].includes(formData.structure_mode)) {
      newErrors.structure_mode = 'Please select a valid organizational structure.';
    }

    if (!['PUBLIC', 'PRIVATE'].includes(formData.visibility)) {
      newErrors.visibility = 'Please select a valid organization visibility.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    const contactPerson = formData.contactPerson.trim();
    const contactEmail = formData.contactEmail.trim();
    const address = formData.address.trim();
    const website = formData.website.trim();
    const description = formData.description.trim();

    if (contactPerson.length > 120) {
      newErrors.contactPerson = 'Primary contact name cannot exceed 120 characters.';
    }

    if (contactEmail && !/^\S+@\S+\.\S+$/.test(contactEmail)) {
      newErrors.contactEmail = 'Contact email must be a valid email address.';
    }

    if (contactEmail.length > 254) {
      newErrors.contactEmail = 'Contact email cannot exceed 254 characters.';
    }

    if (address.length > 500) {
      newErrors.address = 'Address cannot exceed 500 characters.';
    }

    if (website && !/^https?:\/\//i.test(website)) {
      newErrors.website = 'Website must start with http:// or https://.';
    }

    if (website.length > 300) {
      newErrors.website = 'Website cannot exceed 300 characters.';
    }

    if (description.length > 2000) {
      newErrors.description = 'Description cannot exceed 2000 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async () => {
    if (isEditMode) {
      toast({
        title: 'Edit not available yet',
        description: 'Updating organizations needs a backend update endpoint first.',
        variant: 'destructive',
      });
      return;
    }

    if (!validateStep2()) return;

    setIsSubmitting(true);

    try {
      const createdOrganization = await virthoApi.createOrganization({
        name: formData.name.trim(),
        structure_mode: formData.structure_mode,
        visibility: formData.visibility,
        description: optionalString(formData.description),
        primary_contact_name: optionalString(formData.contactPerson),
        contact_email: optionalString(formData.contactEmail),
        address: optionalString(formData.address),
        website: optionalString(formData.website),
      });

      await loadMyEntities();

      if (onSave) {
        onSave(createdOrganization);
      }

      toast({
        title: 'Success',
        description: 'Organization created successfully.',
      });

      onClose();
    } catch (error) {
      const description =
        error instanceof VirthoApiError
          ? error.message
          : 'Failed to create organization. Please try again.';

      toast({
        title: 'Create organization failed',
        description,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <SimpleModal isOpen={isOpen} onClose={handleClose} title={isEditMode ? "Edit Organization" : "Create New Organization"}>
      <div className="mb-8 px-4">
        <MultiStepProgressBar
          currentStep={step}
          totalSteps={2}
          stepLabels={['Basic Info', 'Details']}
        />
      </div>

      <div className="overflow-hidden min-h-[350px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="orgName" className="text-gray-900">
                  Organization Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="orgName"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  placeholder="e.g., Global Innovations Inc."
                  className={errors.name ? 'border-red-500 text-gray-900' : 'text-gray-900'}
                  disabled={isSubmitting}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900">Organizational Structure</Label>
                <Select
                  value={formData.structure_mode}
                  onValueChange={(value) => updateFormData('structure_mode', value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={errors.structure_mode ? 'border-red-500 text-gray-900' : 'text-gray-900'}>
                    <SelectValue placeholder="Select organizational structure" />
                  </SelectTrigger>
                  <SelectContent className="z-[10000]">
                    <SelectItem value="HIERARCHICAL">Hierarchical</SelectItem>
                    <SelectItem value="NON_HIERARCHICAL">Non-hierarchical</SelectItem>
                  </SelectContent>
                </Select>
                {errors.structure_mode && <p className="text-sm text-red-500">{errors.structure_mode}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-gray-900">Organization Visibility</Label>
                <Select
                  value={formData.visibility}
                  onValueChange={(value) => updateFormData('visibility', value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className={errors.visibility ? 'border-red-500 text-gray-900' : 'text-gray-900'}>
                    <SelectValue placeholder="Select organization visibility" />
                  </SelectTrigger>
                  <SelectContent className="z-[10000]">
                    <SelectItem value="PUBLIC">Public</SelectItem>
                    <SelectItem value="PRIVATE">Private</SelectItem>
                  </SelectContent>
                </Select>
                {errors.visibility && <p className="text-sm text-red-500">{errors.visibility}</p>}
              </div>

              <div className="flex justify-end gap-3 pt-6">
                <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting} className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-none">
                  Cancel
                </Button>
                <Button type="button" onClick={handleNext} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Next Step
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson" className="text-gray-900">Primary Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => updateFormData('contactPerson', e.target.value)}
                    placeholder="e.g., Jane Doe"
                    className={errors.contactPerson ? 'border-red-500 text-gray-900' : 'text-gray-900'}
                    disabled={isSubmitting}
                  />
                  {errors.contactPerson && <p className="text-sm text-red-500">{errors.contactPerson}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail" className="text-gray-900">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => updateFormData('contactEmail', e.target.value)}
                    placeholder="jane@example.com"
                    className={errors.contactEmail ? 'border-red-500 text-gray-900' : 'text-gray-900'}
                    disabled={isSubmitting}
                  />
                  {errors.contactEmail && <p className="text-sm text-red-500">{errors.contactEmail}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-900">Main Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateFormData('address', e.target.value)}
                    placeholder="123 Business Rd."
                    className={errors.address ? 'border-red-500 text-gray-900' : 'text-gray-900'}
                    disabled={isSubmitting}
                  />
                  {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-gray-900">Website URL</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => updateFormData('website', e.target.value)}
                    placeholder="https://example.com"
                    className={errors.website ? 'border-red-500 text-gray-900' : 'text-gray-900'}
                    disabled={isSubmitting}
                  />
                  {errors.website && <p className="text-sm text-red-500">{errors.website}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="orgDesc" className="text-gray-900">Organization Description</Label>
                <Textarea
                  id="orgDesc"
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  placeholder="Tell us about this organization..."
                  className={errors.description ? 'border-red-500 text-gray-900 min-h-[100px]' : 'text-gray-900 min-h-[100px]'}
                  disabled={isSubmitting}
                />
                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
              </div>

              <div className="flex justify-between pt-6">
                <Button type="button" variant="outline" onClick={handleBack} disabled={isSubmitting} className="bg-gray-100 hover:bg-gray-200 text-gray-700 border-none">
                  Back
                </Button>
                <Button type="button" onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {isSubmitting ? 'Creating...' : 'Finish and Create'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SimpleModal>
  );
}

export default AddOrganizationWizard;