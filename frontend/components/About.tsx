'use client';

import { Target, Users, Award, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Users, value: '500+', label: 'Clients Served' },
  { icon: Award, value: '50+', label: 'Awards Won' },
  { icon: TrendingUp, value: '98%', label: 'Client Satisfaction' },
  { icon: Target, value: '1000+', label: 'Projects Completed' },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            About Hutton Technologies
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            We are a leading technology company specializing in custom software development,
            cloud infrastructure, artificial intelligence, and digital transformation services.
            Our mission is to empower businesses with innovative solutions that drive growth
            and create lasting value.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center"
            >
              <stat.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Values</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-primary-600">Innovation</h4>
                <p className="text-gray-600">
                  We constantly push boundaries and embrace new technologies to deliver
                  cutting-edge solutions.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2 text-primary-600">Excellence</h4>
                <p className="text-gray-600">
                  We maintain the highest standards in everything we do, from code quality
                  to customer service.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2 text-primary-600">Partnership</h4>
                <p className="text-gray-600">
                  We work closely with our clients as trusted partners to achieve their
                  business goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
