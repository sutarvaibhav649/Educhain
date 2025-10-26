import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VerificationStatusCard = ({ verificationStatus }) => {
  const [isResending, setIsResending] = useState(false);

  const mockStatus = {
    emailVerified: true,
    universityVerified: true,
    phoneVerified: false,
    profileComplete: 85,
    ...verificationStatus
  };

  const verificationItems = [
    {
      id: 'email',
      label: 'Email Address',
      description: 'Verify your university email',
      verified: mockStatus?.emailVerified,
      required: true,
      action: 'resend'
    },
    {
      id: 'university',
      label: 'University Affiliation',
      description: 'Confirm your academic institution',
      verified: mockStatus?.universityVerified,
      required: true,
      action: 'verify'
    },
    {
      id: 'phone',
      label: 'Phone Number',
      description: 'Add phone for meeting notifications',
      verified: mockStatus?.phoneVerified,
      required: false,
      action: 'verify'
    }
  ];

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Verification email sent successfully!');
    } catch (error) {
      console.error('Error resending email:', error);
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyAction = (item) => {
    if (item?.id === 'email' && item?.action === 'resend') {
      handleResendEmail();
    } else {
      // Handle other verification actions
      console.log(`Verify ${item?.id}`);
    }
  };

  const getVerificationIcon = (verified) => {
    return verified ? 'CheckCircle' : 'AlertCircle';
  };

  const getVerificationColor = (verified) => {
    return verified ? 'text-success' : 'text-warning';
  };

  const completedItems = verificationItems?.filter(item => item?.verified)?.length;
  const totalItems = verificationItems?.length;
  const completionPercentage = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Verification Status</h3>
        <div className="flex items-center space-x-2">
          <div className="w-12 h-12 relative">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-muted stroke-current"
                strokeDasharray="100, 100"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-primary stroke-current"
                strokeDasharray={`${completionPercentage}, 100`}
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-foreground">{completionPercentage}%</span>
            </div>
          </div>
        </div>
      </div>
      {/* Profile Completion */}
      <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="User" size={16} color="var(--color-primary)" />
          <span className="text-sm font-medium text-foreground">Profile Completion</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mb-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${mockStatus?.profileComplete}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {mockStatus?.profileComplete}% complete • Add more details to improve your visibility
        </p>
      </div>
      {/* Verification Items */}
      <div className="space-y-4">
        {verificationItems?.map((item) => (
          <div key={item?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon
                name={getVerificationIcon(item?.verified)}
                size={20}
                className={getVerificationColor(item?.verified)}
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">{item?.label}</span>
                  {item?.required && (
                    <span className="text-xs px-2 py-1 bg-error/10 text-error rounded-full">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{item?.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {item?.verified ? (
                <span className="text-xs text-success font-medium">Verified</span>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVerifyAction(item)}
                  loading={item?.id === 'email' && isResending}
                  disabled={isResending}
                >
                  {item?.action === 'resend' ? 'Resend' : 'Verify'}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* University Badge */}
      {mockStatus?.universityVerified && (
        <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="GraduationCap" size={24} color="var(--color-success)" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground">University Verified</h4>
              <p className="text-xs text-muted-foreground">
                Your Stanford University affiliation has been confirmed
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={16} color="var(--color-success)" />
              <span className="text-xs text-success font-medium">Trusted</span>
            </div>
          </div>
        </div>
      )}
      {/* Benefits */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="text-sm font-semibold text-foreground mb-3">Verification Benefits</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Check" size={12} color="var(--color-success)" />
            <span>Increased profile visibility</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Check" size={12} color="var(--color-success)" />
            <span>Access to premium features</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Check" size={12} color="var(--color-success)" />
            <span>Higher trust rating from peers</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Check" size={12} color="var(--color-success)" />
            <span>Priority in skill matching</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationStatusCard;