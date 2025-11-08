'use client';

import { useEffect, useState } from 'react';
import { Code, Cloud, Brain, Smartphone, Settings, Shield } from 'lucide-react';
import api, { Service } from '@/lib/api';

const iconMap: { [key: string]: any } = {
  code: Code,
  cloud: Cloud,
  brain: Brain,
  mobile: Smartphone,
  settings: Settings,
  shield: Shield,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await api.getServices();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">Loading services...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive technology solutions tailored to your business needs.
            From concept to deployment, we&apos;re with you every step of the way.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Code;
            return (
              <div
                key={service.id}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors">
                  <Icon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
