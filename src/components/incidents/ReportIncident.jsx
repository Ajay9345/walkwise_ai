import React, { useState, useRef } from 'react';
import { Camera, MapPin, Calendar, Clock, AlertTriangle, Upload, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';
import { cn } from '../../utils/cn';

export const ReportIncident = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    type: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    description: '',
    images: [],
    severity: 'medium',
  });

  const [errors, setErrors] = useState({});
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const totalFiles = formData.images.length + newFiles.length;

      if (totalFiles > 5) {
        alert('Maximum 5 images allowed');
        return;
      }

      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newFiles]
      }));
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.type) newErrors.type = 'Please select an incident type';
    if (!formData.location) newErrors.location = 'Location is required';
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
    <Card className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="text-warning-500" />
            Report an Incident
          </CardTitle>
          <CardDescription>
            Help keep your community safe by reporting incidents
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Incident Type <span className="text-danger-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={cn(
                  "w-full rounded-md border bg-background-light dark:bg-background-dark px-3 py-2",
                  errors.type ? "border-danger-500" : "border-border-light dark:border-border-dark"
                )}
              >
                <option value="">Select type</option>
                <option value="theft">Theft/Robbery</option>
                <option value="assault">Assault</option>
                <option value="suspicious">Suspicious Activity</option>
                <option value="harassment">Harassment</option>
                <option value="vandalism">Vandalism</option>
                <option value="infrastructure">Infrastructure Issue</option>
                <option value="other">Other</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-danger-500">{errors.type}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Severity Level <span className="text-danger-500">*</span>
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="w-full rounded-md border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark px-3 py-2"
              >
                <option value="low">Low - Minor Issue</option>
                <option value="medium">Medium - Concerning</option>
                <option value="high">High - Immediate Attention</option>
              </select>
            </div>
          </div>

          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location or use current location"
            leftIcon={<MapPin size={18} />}
            error={errors.location}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              leftIcon={<Calendar size={18} />}
              required
            />

            <Input
              label="Time"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              leftIcon={<Clock size={18} />}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description <span className="text-danger-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide detailed description of the incident..."
              className={cn(
                "w-full rounded-md border bg-background-light dark:bg-background-dark px-3 py-2 min-h-[100px]",
                errors.description ? "border-danger-500" : "border-border-light dark:border-border-dark"
              )}
              required
            />
            {errors.description && (
              <p className="mt-1 text-sm text-danger-500">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Images/Photos (Optional)
            </label>
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer",
                "border-border-light dark:border-border-dark hover:border-primary-500 dark:hover:border-primary-500",
                "transition-colors duration-200"
              )}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-text-light-secondary dark:text-text-dark-secondary" />
                <div>
                  <p className="text-sm font-medium">Click to upload</p>
                  <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                    PNG, JPG up to 5MB (max 5 images)
                  </p>
                </div>
              </div>
            </div>

            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-danger-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
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
