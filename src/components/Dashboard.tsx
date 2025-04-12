import React from 'react';
import { LineChart, PieChart, Building2 } from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

interface DashboardProps {
  projectData: any;
}

const Dashboard: React.FC<DashboardProps> = ({ projectData }) => {
  if (!projectData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please input project details first.</p>
      </div>
    );
  }

  // Calculate costs (simplified example)
  const materialCosts = {
    concrete: 100,
    steel: 150,
    wood: 80,
    brick: 90
  };

  const laborCost = 50; // per hour
  const overheadRate = 0.15;

  const volume = Number(projectData.length) * Number(projectData.width) * Number(projectData.height) * Number(projectData.floors);
  const materialCost = volume * materialCosts[projectData.material as keyof typeof materialCosts];
  const totalLaborCost = Number(projectData.laborHours) * laborCost;
  const overheadCost = (materialCost + totalLaborCost) * overheadRate;
  const totalCost = materialCost + totalLaborCost + overheadCost;

  // Data for pie chart
  const costDistributionData = [
    { name: 'Materials', value: materialCost },
    { name: 'Labor', value: totalLaborCost },
    { name: 'Overhead', value: overheadCost }
  ];

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // Data for bar chart
  const costBreakdownData = [
    {
      category: 'Materials',
      cost: materialCost,
      percentage: ((materialCost / totalCost) * 100).toFixed(1)
    },
    {
      category: 'Labor',
      cost: totalLaborCost,
      percentage: ((totalLaborCost / totalCost) * 100).toFixed(1)
    },
    {
      category: 'Overhead',
      cost: overheadCost,
      percentage: ((overheadCost / totalCost) * 100).toFixed(1)
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-4">
          <Building2 className="w-6 h-6 text-blue-600 mr-3" />
          <h2 className="text-xl font-bold text-gray-800">Project Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Cost</p>
            <p className="text-2xl font-bold text-gray-900">${totalCost.toFixed(2)}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Material Cost</p>
            <p className="text-2xl font-bold text-gray-900">${materialCost.toFixed(2)}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Labor Cost</p>
            <p className="text-2xl font-bold text-gray-900">${totalLaborCost.toFixed(2)}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Overhead Cost</p>
            <p className="text-2xl font-bold text-gray-900">${overheadCost.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <PieChart className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-800">Cost Distribution</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={costDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <LineChart className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold text-gray-800">Cost Breakdown</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costBreakdownData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cost" fill="#8884d8" name="Cost ($)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;