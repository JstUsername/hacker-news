export interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  placeholder?: string;
  isLoading?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  error?: string;
}
