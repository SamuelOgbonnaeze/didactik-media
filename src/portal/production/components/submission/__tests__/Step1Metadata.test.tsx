import { render, screen } from '@testing-library/react';
import { Step1Metadata } from '../Step1Metadata';
import { useForm, FormProvider } from 'react-hook-form';

function StepWrapper() {
  const methods = useForm({
    defaultValues: {
      title: '',
      original_title: '',
      asset_type: '',
      production_year: '',
      description: '',
    }
  });

  return (
    <FormProvider {...methods}>
      <Step1Metadata />
    </FormProvider>
  );
}

describe('Step1Metadata', () => {
  it('renders all required fields', () => {
    render(<StepWrapper />);

    expect(screen.getByPlaceholderText('Working or anglicised title')).toBeInTheDocument();
    expect(screen.getByText('Original title')).toBeInTheDocument();
    expect(screen.getByText(/Asset type/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. 2023')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Brief synopsis or description of the content')).toBeInTheDocument();
  });

  it('contains asset type options', () => {
    render(<StepWrapper />);

    expect(screen.getByRole('option', { name: 'Select type…' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Feature Film' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Documentary' })).toBeInTheDocument();
  });
});
