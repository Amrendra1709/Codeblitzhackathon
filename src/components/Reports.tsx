import React from 'react';
import { FileText, Download, Printer } from 'lucide-react';

interface ReportsProps {
  projectData: any;
}

const Reports: React.FC<ReportsProps> = ({ projectData }) => {
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

 

  

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FileText className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-800">Cost Estimation Report</h2>
          </div>
          <div className="space-x-4">
            
            
          </div>
        </div>

        <div className="space-y-6">
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Project Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Project Name</p>
                <p className="font-medium">{projectData.projectName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">{projectData.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Dimensions</p>
                <p className="font-medium">
                  {projectData.length}m × {projectData.width}m × {projectData.height}m
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Number of Floors</p>
                <p className="font-medium">{projectData.floors}</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Cost Summary</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Material Costs</p>
                  <p className="text-lg font-medium">${materialCost.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Labor Costs</p>
                  <p className="text-lg font-medium">${totalLaborCost.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Overhead Costs</p>
                  <p className="text-lg font-medium">${overheadCost.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Cost</p>
                  <p className="text-lg font-medium text-blue-600">${totalCost.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Optimization Recommendations</h3>
            <div className="prose max-w-none">
              <ul className="list-disc pl-5 space-y-2">
                <li>Consider using precast concrete elements to reduce labor costs by up to 20%</li>
                <li>Implement modular construction techniques for faster completion</li>
                <li>Optimize structural design to reduce material usage while maintaining strength requirements</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Notes & Assumptions</h3>
            <div className="prose max-w-none">
              <ul className="list-disc pl-5 space-y-2">
                <li>Cost estimates are based on current market rates as of {new Date().toLocaleDateString()}</li>
                <li>Labor rates are averaged for the specified location</li>
                <li>Material costs may vary based on market fluctuations</li>
                <li>Overhead costs include general contractor fees and insurance</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Reports;