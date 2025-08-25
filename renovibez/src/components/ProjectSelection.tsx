"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Euro, Clock, Calendar, MapPin, User } from 'lucide-react';

interface ProjectSelectionProps {
  project: {
    id: string;
    title: string;
    description: string;
    price: string;
    duration: string;
    features: string[];
  };
  onSubmit: (data: ProjectFormData) => Promise<void>;
}

interface ProjectFormData {
  renovationProjectId: string;
  budget?: string;
  preferredStartDate?: string;
  description?: string;
  address: string;
}

export default function ProjectSelection({ project, onSubmit }: ProjectSelectionProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    renovationProjectId: project.id,
    address: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="glass-card p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-4">
            {project.title}
          </h1>
          <p className="text-neutral-600 mb-6">{project.description}</p>
          
          <div className="flex items-center justify-center space-x-8 mb-6">
            <div className="flex items-center text-terracotta">
              <Euro className="h-5 w-5 mr-2" />
              <span className="font-semibold">{project.price}</span>
            </div>
            <div className="flex items-center text-neutral-700">
              <Clock className="h-5 w-5 mr-2" />
              <span>{project.duration}</span>
            </div>
          </div>

          <div className="space-y-2 mb-8 text-left">
            {project.features.map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-neutral-700">
                <CheckCircle className="h-4 w-4 mr-3 text-green-600 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="address" className="flex items-center mb-2">
              <MapPin className="h-4 w-4 mr-2" />
              Project Address *
            </Label>
            <Input
              id="address"
              required
              placeholder="Enter your full address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="budget" className="flex items-center mb-2">
              <Euro className="h-4 w-4 mr-2" />
              Budget (Optional)
            </Label>
            <Input
              id="budget"
              type="number"
              placeholder="Enter your budget in euros"
              value={formData.budget || ''}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="preferredStartDate" className="flex items-center mb-2">
              <Calendar className="h-4 w-4 mr-2" />
              Preferred Start Date (Optional)
            </Label>
            <Input
              id="preferredStartDate"
              type="date"
              value={formData.preferredStartDate || ''}
              onChange={(e) => setFormData({ ...formData, preferredStartDate: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="description" className="flex items-center mb-2">
              <User className="h-4 w-4 mr-2" />
              Additional Details (Optional)
            </Label>
            <textarea
              id="description"
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
              rows={4}
              placeholder="Tell us more about your specific requirements..."
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-terracotta hover:bg-terracotta/90 text-white font-medium py-3 text-lg"
          >
            {loading ? 'Finding Contractors...' : 'Get 3 Contractor Offers'}
          </Button>
        </form>
      </Card>
    </div>
  );
}