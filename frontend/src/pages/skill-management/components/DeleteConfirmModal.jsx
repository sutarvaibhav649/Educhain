import React from 'react';
import Button from '../../../components/ui/Button';

const DeleteConfirmModal = ({ isVisible, onCancel, onConfirm, itemName = 'Skill' }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-modal p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Delete {itemName}?</h3>
        <p className="mb-6 text-sm text-muted-foreground">
          Are you sure you want to delete this {itemName}? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
