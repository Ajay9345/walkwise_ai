import React, { useState } from 'react';
import { AlertTriangle, Camera, MapPin, Calendar, Clock, FileText, Upload, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';

export const IncidentForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    type: '',
    location: '40.7128° N, 74.0060° W', // Default to NYC
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].substring(0, 5),
    description: '',
    images: [],
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleImageChange = (e) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setFormData(prev => ({ ...prev, images: [...prev.images, ...fileList] }));
    }
  };
  
  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.type) newErrors.type = 'Please select an incident type';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.description) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="text-warning-500" size={24} />
          Report an Incident
        </CardTitle>
        <CardDescription>
          Help improve safety by reporting incidents in your area
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium mb-2">
              Incident Type <span className="text-danger-500">*</span>
            </label>
            <div className="relative">
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full rounded-md border ${
                  errors.type ? 'border-danger-500' : 'border-border-light dark:border-border-dark'
                } bg-background-light dark:bg-background-dark px-4 py-2 text-text-light-primary dark:text-text-dark-primary outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 appearance-none`}
              >
                <option value="" disabled>Select incident type</option>
                <option value="theft">Theft/Robbery</option>
                <option value="assault">Assault</option>
                <option value="suspicious">Suspicious Activity</option>
                <option value="harassment">Harassment</option>
                <option value="vandalism">Vandalism</option>
                <option value="other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <AlertTriangle size={18} className="text-text-light-secondary dark:text-text-dark-secondary" />
              </div>
            </div>
            {errors.type && <p className="mt-1 text-sm text-danger-500">{errors.type}</p>}
          </div>
          
          <Input
            id="location"
            name="location"
            label="Location"
            value={formData.location}
            onChange={handleChange}
            leftIcon={<MapPin size={18} />}
            error={errors.location}
            required
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="date"
              name="date"
              type="date"
              label="Date"
              value={formData.date}
              onChange={handleChange}
              leftIcon={<Calendar size={18} />}
              error={errors.date}
              required
            />
            
            <Input
              id="time"
              name="time"
              type="time"
              label="Time"
              value={formData.time}
              onChange={handleChange}
              leftIcon={<Clock size={18} />}
              error={errors.time}
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description <span className="text-danger-500">*</span>
            </label>
            <div className="relative">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full rounded-md border ${
                  errors.description ? 'border-danger-500' : 'border-border-light dark:border-border-dark'
                } bg-background-light dark:bg-background-dark px-4 py-2 text-text-light-primary dark:text-text-dark-primary outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20`}
                placeholder="Describe what happened in detail..."
                required
              ></textarea>
              <div className="absolute top-3 right-3">
                <FileText size={18} className="text-text-light-secondary dark:text-text-dark-secondary" />
              </div>
            </div>
            {errors.description && <p className="mt-1 text-sm text-danger-500">{errors.description}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Photos or Videos (Optional)
            </label>
            <div className="border border-dashed border-border-light dark:border-border-dark rounded-md p-4 text-center">
              <input
                type="file"
                id="images"
                multiple
                accept="image/*,video/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="images"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload size={24} className="text-text-light-secondary dark:text-text-dark-secondary mb-2" />
                <span className="text-sm text-text-light-secondary dark:text-text-dark-secondary">
                  Click to upload or drag and drop
                </span>
                <span className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">
                  PNG, JPG, GIF, MP4 up to 10MB
                </span>
              </label>
            </div>
            
            {formData.images.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {formData.images.map((file, index) => (
                  <div
                    key={index}
                    className="relative border border-border-light dark:border-border-dark rounded-md p-1"
                  >
                    <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                      <Camera size={24} className="text-text-light-secondary dark:text-text-dark-secondary" />
                    </div>
                    <p className="text-xs truncate mt-1">{file.name}</p>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-danger-500 text-white flex items-center justify-center"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            leftIcon={<AlertTriangle size={18} />}
          >
            Submit Report
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
