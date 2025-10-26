import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfilePhotoSection = ({ currentPhoto, onPhotoUpdate }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (event) => {
    event?.preventDefault();
    setIsDragging(false);
    const file = event?.dataTransfer?.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes?.includes(file?.type)) {
      alert('Please upload a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file?.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // Create preview URL
          const previewUrl = URL.createObjectURL(file);
          onPhotoUpdate(previewUrl);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleDragOver = (event) => {
    event?.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removePhoto = () => {
    onPhotoUpdate(null);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Profile Photo</h3>
      <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* Current Photo Display */}
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-muted border-4 border-border">
            {currentPhoto ? (
              <Image
                src={currentPhoto}
                alt="Current profile photo showing user's face"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <Icon name="User" size={48} color="var(--color-muted-foreground)" />
              </div>
            )}
            {currentPhoto && (
              <button
                onClick={removePhoto}
                className="absolute -top-2 -right-2 w-8 h-8 bg-error text-error-foreground rounded-full flex items-center justify-center hover:bg-red-600 transition-smooth"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Upload Section */}
        <div className="flex-1 w-full">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-smooth ${
              isDragging
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {isUploading ? (
              <div className="space-y-3">
                <Icon name="Upload" size={32} color="var(--color-primary)" className="mx-auto" />
                <div>
                  <p className="text-sm font-medium text-foreground">Uploading...</p>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{uploadProgress}%</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Icon name="Upload" size={32} color="var(--color-muted-foreground)" className="mx-auto" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Drop your photo here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPEG, PNG, or WebP • Max 5MB • Recommended: 400x400px
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="photo-upload"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('photo-upload')?.click()}
                >
                  <Icon name="Camera" size={16} />
                  Choose Photo
                </Button>
              </div>
            )}
          </div>

          {/* Photo Guidelines */}
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <h4 className="text-sm font-medium text-foreground mb-2">Photo Guidelines</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Use a clear, recent photo of yourself</li>
              <li>• Face should be clearly visible and centered</li>
              <li>• Professional or casual attire recommended</li>
              <li>• Avoid group photos or heavily filtered images</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoSection;