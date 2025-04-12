import React from 'react';
import { Lightbulb, TrendingDown } from 'lucide-react';

interface CostOptimizationProps {
  projectData: any;
}

const CostOptimization: React.FC<CostOptimizationProps> = ({ projectData }) => {
  if (!projectData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please input project details first.</p>
      </div>
    );
  }

  // Example optimization suggestions
  const optimizations = [
    {
      title: 'Alternative Materials',
      description: 'Consider using precast concrete elements instead of traditional concrete for faster construction and reduced labor costs.',
      savings: '15-20%',
      impact: 'Medium',
      complexity: 'Medium',
    },
    {
      title: 'Labor Optimization',
      description: 'Implement modular construction techniques to reduce on-site labor hours.',
      savings: '10-15%',
      impact: 'High',
      complexity: 'High',
    },
    {
      title: 'Design Efficiency',
      description: 'Optimize structural design to reduce material usage while maintaining strength requirements.',
      savings: '8-12%',
      impact: 'Medium',
      complexity: 'Low',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <Lightbulb className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-xl font-bold text-gray-800">Cost Optimization Suggestions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {optimizations.map((opt, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{opt.title}</h3>
              <p className="text-gray-600 mb-4">{opt.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Potential Savings</span>
                  <span className="text-sm font-medium text-green-600">{opt.savings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Impact</span>
                  <span className="text-sm font-medium">{opt.impact}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Complexity</span>
                  <span className="text-sm font-medium">{opt.complexity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <TrendingDown className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-xl font-bold text-gray-800">Comparative Analysis</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Optimized Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Savings
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Materials</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$100,000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$85,000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">15%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Labor</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$50,000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$42,500</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">15%</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Overhead</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$22,500</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$19,125</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">15%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CostOptimization;