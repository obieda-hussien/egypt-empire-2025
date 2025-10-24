import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { organizationsData } from '../../data/organizations';
import { Globe, Users, Flag, Award } from 'lucide-react';

export const OrganizationsHub: React.FC = () => {
  const { organizationMemberships, treasury, joinOrganization } = useGameStore();
  
  const organizations = [
    {
      ...organizationsData[0],
      isMember: organizationMemberships.arabLeague,
      icon: Flag,
    },
    {
      ...organizationsData[1],
      isMember: organizationMemberships.africanUnion,
      icon: Users,
    },
    {
      ...organizationsData[2],
      isMember: organizationMemberships.unitedNations,
      icon: Globe,
    },
  ];
  
  const handleJoin = (orgId: string, cost: number) => {
    if (treasury < cost) {
      return;
    }
    joinOrganization(orgId, cost);
  };
  
  return (
    <div className="space-y-6">
      <Card title="International Organizations">
        <div className="grid grid-cols-1 gap-6">
          {organizations.map(org => {
            const Icon = org.icon;
            return (
              <div key={org.id} className="border-2 border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-egypt-navy rounded-lg">
                      <Icon className="text-egypt-gold" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{org.name}</h3>
                      <p className="text-gray-600">{org.nameAr}</p>
                    </div>
                  </div>
                  
                  {org.isMember ? (
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold flex items-center gap-2">
                      <Award size={16} />
                      Member
                    </span>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleJoin(org.id, org.membershipFee)}
                      disabled={treasury < org.membershipFee}
                    >
                      Join (${(org.membershipFee / 1000000).toFixed(0)}M)
                    </Button>
                  )}
                </div>
                
                <p className="text-gray-700 mb-4">{org.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">✓ Benefits:</h4>
                    <ul className="space-y-1">
                      {org.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm text-gray-700">• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-orange-700 mb-2">⚠ Obligations:</h4>
                    <ul className="space-y-1">
                      {org.obligations.map((obligation, i) => (
                        <li key={i} className="text-sm text-gray-700">• {obligation}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      
      <Card title="Membership Summary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              {Object.values(organizationMemberships).filter(Boolean).length}
            </div>
            <div className="text-sm text-gray-600">Active Memberships</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">
              ${((50 + 30 + 100) / 12).toFixed(0)}M
            </div>
            <div className="text-sm text-gray-600">Monthly Fees</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">
              {organizationMemberships.securityCouncil ? 'Yes' : 'No'}
            </div>
            <div className="text-sm text-gray-600">Security Council</div>
          </div>
        </div>
      </Card>
    </div>
  );
};
