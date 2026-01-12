import { StyledTextarea, TextareaActions, TextareaButton, TextAreaErrorText, TextareaWrapper } from './Textarea.styled';
import { TextareaProps } from './Textarea.types';
import { ChangeEvent, FormEvent, useEffect, useRef } from 'react';

export const Textarea = ({
  value,
  onChange,
  onSubmit,
  onCancel,
  placeholder = 'Write a comment...',
  isLoading = false,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  error,
}: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) onSubmit();
  };

  return (
    <TextareaWrapper onSubmit={handleSubmit}>
      <StyledTextarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={isLoading}
        rows={6}
      />
      <TextareaActions>
        {error && <TextAreaErrorText $variant="body2">{error}</TextAreaErrorText>}
        <TextareaButton type="button" onClick={onCancel} disabled={isLoading}>
          {cancelLabel}
        </TextareaButton>
        <TextareaButton type="submit" $variant="primary" disabled={!value.trim() || isLoading}>
          {submitLabel}
        </TextareaButton>
      </TextareaActions>
    </TextareaWrapper>
  );
};
