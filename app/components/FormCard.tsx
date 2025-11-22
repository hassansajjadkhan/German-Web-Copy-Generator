'use client';

import React, { useState } from 'react';
import { InputField } from './InputField';
import { TextAreaField } from './TextAreaField';
import { Button } from './Button';
import { UserInput } from '../lib/schema';

interface FormCardProps {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
}

export function FormCard({ onSubmit, isLoading }: FormCardProps) {
  const [formData, setFormData] = useState<UserInput>({
    businessType: '',
    industry: '',
    brandName: '',
    targetAudience: '',
    websiteGoals: '',
    keyServices: '',
    brandVoice: '',
    extraDetails: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserInput, string>>>(
    {}
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    const newErrors: Partial<Record<keyof UserInput, string>> = {};

    if (formData.businessType.length < 2) {
      newErrors.businessType = 'Bitte mindestens 2 Zeichen eingeben';
    }
    if (formData.industry.length < 2) {
      newErrors.industry = 'Bitte mindestens 2 Zeichen eingeben';
    }
    if (formData.brandName.length < 2) {
      newErrors.brandName = 'Bitte mindestens 2 Zeichen eingeben';
    }
    if (formData.targetAudience.length < 2) {
      newErrors.targetAudience = 'Bitte mindestens 2 Zeichen eingeben';
    }
    if (formData.websiteGoals.length < 5) {
      newErrors.websiteGoals = 'Bitte mindestens 5 Zeichen eingeben';
    }
    if (formData.keyServices.length < 5) {
      newErrors.keyServices = 'Bitte mindestens 5 Zeichen eingeben';
    }
    if (formData.brandVoice.length < 2) {
      newErrors.brandVoice = 'Bitte mindestens 2 Zeichen eingeben';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit(formData);
  };

  const updateField = (field: keyof UserInput, value: string) => {
    setFormData((prev: UserInput) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev: Partial<Record<keyof UserInput, string>>) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-xl font-light text-black mb-8 font-mono">
          Teile ein paar Details zu deinem Projekt
        </h2>

        <div className="space-y-6">
          <InputField
            id="businessType"
            label="Ich bin tätig als"
            placeholder="z. B. Fotografin, Coach, Designerin …"
            value={formData.businessType}
            onChange={(value) => updateField('businessType', value)}
            required
            disabled={isLoading}
            error={errors.businessType}
          />

          <InputField
            id="industry"
            label="in der Branche"
            placeholder="z. B. Innenarchitektur, Yoga, Hochzeitsfotografie …"
            value={formData.industry}
            onChange={(value) => updateField('industry', value)}
            required
            disabled={isLoading}
            error={errors.industry}
          />

          <InputField
            id="brandName"
            label="Mein Unternehmen / meine Marke heißt"
            placeholder="z. B. Atelier Morgenlicht"
            value={formData.brandName}
            onChange={(value) => updateField('brandName', value)}
            required
            disabled={isLoading}
            error={errors.brandName}
          />

          <InputField
            id="targetAudience"
            label="Wir arbeiten hauptsächlich mit"
            placeholder="z. B. kreativen Unternehmerinnen …"
            value={formData.targetAudience}
            onChange={(value) => updateField('targetAudience', value)}
            required
            disabled={isLoading}
            error={errors.targetAudience}
          />

          <TextAreaField
            id="websiteGoals"
            label="Die Hauptziele unserer Website sind"
            placeholder="z. B. Vertrauen aufbauen, Buchungen generieren …"
            value={formData.websiteGoals}
            onChange={(value) => updateField('websiteGoals', value)}
            required
            disabled={isLoading}
            error={errors.websiteGoals}
            rows={3}
          />

          <TextAreaField
            id="keyServices"
            label="Unsere wichtigsten Leistungen sind"
            placeholder="z. B. Branding-Fotografie, Workshops …"
            value={formData.keyServices}
            onChange={(value) => updateField('keyServices', value)}
            required
            disabled={isLoading}
            error={errors.keyServices}
            rows={3}
          />

          <InputField
            id="brandVoice"
            label="Unsere Markenstimme ist"
            placeholder="z. B. ruhig, inspirierend, professionell …"
            value={formData.brandVoice}
            onChange={(value) => updateField('brandVoice', value)}
            required
            disabled={isLoading}
            error={errors.brandVoice}
          />

          <TextAreaField
            id="extraDetails"
            label="Zusätzliche Details (optional)"
            placeholder="Erzähle mehr über deine Marke, Werte oder Besonderheiten …"
            value={formData.extraDetails || ''}
            onChange={(value) => updateField('extraDetails', value)}
            disabled={isLoading}
            rows={4}
          />
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        <span className="inline-flex items-center gap-2 text-sm tracking-wider">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="2" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none"/>
            <line x1="5" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1.2"/>
            <line x1="5" y1="7.5" x2="11" y2="7.5" stroke="currentColor" strokeWidth="1.2"/>
            <line x1="5" y1="10" x2="9" y2="10" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          {isLoading ? 'WIRD GENERIERT …' : 'WEBSITE-TEXTE GENERIEREN'}
        </span>
      </Button>
      
      <p className="text-xs text-center text-gray-500 font-light italic">
        Die Generierung dauert etwa 10-20 Sekunden
      </p>
    </form>
  );
}
