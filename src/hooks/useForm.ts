/**
 * Custom Form Hook
 * 
 * Reusable hook for form management with validation
 * Follows DRY principle and provides consistent form handling
 */

import { useState, useCallback } from 'react';
import { ValidationRules, ValidationErrors } from '../lib/types';
import { validateForm } from '../lib/utils';

/**
 * Generic form hook with validation
 * Manages form state, validation, and submission
 */
export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validationRules?: ValidationRules
) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  /**
   * Handle input change
   * Updates form values and clears field-specific errors
   */
  const handleChange = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name as string]) {
      setErrors(prev => ({
        ...prev,
        [name as string]: ''
      }));
    }
  }, [errors]);

  /**
   * Handle input blur
   * Marks field as touched and validates if rules exist
   */
  const handleBlur = useCallback((name: keyof T) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field if rules exist
    if (validationRules && validationRules[name as string]) {
      const fieldRules = { [name as string]: validationRules[name as string] };
      const fieldErrors = validateForm({ [name]: values[name] }, fieldRules);
      
      if (fieldErrors[name as string]) {
        setErrors(prev => ({
          ...prev,
          [name as string]: fieldErrors[name as string]
        }));
      }
    }
  }, [values, validationRules]);

  /**
   * Validate entire form
   * Performs validation on all fields
   */
  const validate = useCallback((): boolean => {
    if (!validationRules) return true;

    const formErrors = validateForm(values, validationRules);
    setErrors(formErrors);
    setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    return Object.keys(formErrors).length === 0;
  }, [values, validationRules]);

  /**
   * Reset form to initial values
   * Clears all form state
   */
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  /**
   * Set form values
   * Updates multiple form values at once
   */
  const setFormValues = useCallback((newValues: Partial<T>) => {
    setValues(prev => ({
      ...prev,
      ...newValues
    }));
  }, []);

  /**
   * Set field error
   * Manually set error for specific field
   */
  const setFieldError = useCallback((name: keyof T, error: string) => {
    setErrors(prev => ({
      ...prev,
      [name as string]: error
    }));
  }, []);

  /**
   * Clear field error
   * Remove error for specific field
   */
  const clearFieldError = useCallback((name: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name as string];
      return newErrors;
    });
  }, []);

  /**
   * Check if form is valid
   * Returns true if no validation errors exist
   */
  const isValid = Object.keys(errors).length === 0;

  /**
   * Check if form has been modified
   * Returns true if current values differ from initial values
   */
  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  /**
   * Get field error
   * Returns error message for specific field
   */
  const getFieldError = (name: keyof T): string => {
    return errors[name as string] || '';
  };

  /**
   * Check if field has error
   * Returns true if field has validation error
   */
  const hasFieldError = (name: keyof T): boolean => {
    return !!(errors[name as string] && touched[name as string]);
  };

  /**
   * Check if field is touched
   * Returns true if field has been interacted with
   */
  const isFieldTouched = (name: keyof T): boolean => {
    return !!touched[name as string];
  };

  /**
   * Handle form submission
   * Validates form and prevents default submission
   */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const isValidForm = validate();
    if (isValidForm) {
      setIsSubmitting(true);
    }
    return isValidForm;
  }, [validate]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    handleChange,
    handleBlur,
    handleSubmit,
    validate,
    reset,
    setFormValues,
    setFieldError,
    clearFieldError,
    getFieldError,
    hasFieldError,
    isFieldTouched,
    setIsSubmitting
  };
};

/**
 * Contact form hook with specific validation rules
 * Pre-configured for contact form validation
 */
export const useContactForm = () => {
  const initialValues = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  const validationRules: ValidationRules = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    subject: {
      required: true,
      minLength: 5,
      maxLength: 100
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 1000
    }
  };

  return useForm(initialValues, validationRules);
};

/**
 * Search form hook
 * Pre-configured for search functionality
 */
export const useSearchForm = (initialQuery: string = '') => {
  const initialValues = {
    query: initialQuery,
    category: 'all',
    sortBy: 'relevance'
  };

  const validationRules: ValidationRules = {
    query: {
      maxLength: 100
    }
  };

  return useForm(initialValues, validationRules);
};
