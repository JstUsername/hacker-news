import { SignUpFormData, signUpSchema } from './schemas/signUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  FormContainer,
  FormField,
  FormFooter,
  FormInput,
  FormLabel,
  FormTitle,
  FormWrapper,
  Loader,
  StyledEyeCloseIcon,
  StyledEyeIcon,
  StyledForm,
  StyledLink,
  SubmitButton,
  Text,
} from '~/commons';
import { PASSWORD_INPUT_MODE } from '~/constants/passwords';
import { useSelectorRegister } from '~/store';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const register = useSelectorRegister();

  const [serverError, setServerError] = useState<string | null>(null);
  const [passwordInputMode, setPasswordInputMode] = useState<PASSWORD_INPUT_MODE>(PASSWORD_INPUT_MODE.PASSWORD);

  const [confirmPasswordInputMode, setConfirmPasswordInputMode] = useState<PASSWORD_INPUT_MODE>(
    PASSWORD_INPUT_MODE.PASSWORD,
  );

  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    mode: 'onTouched',
    resolver: zodResolver(signUpSchema),
  });

  const handleTogglePasswordMode = (inputVariant: 'password' | 'confirmPassword') => {
    const inputModeHandler = inputVariant === 'password' ? setPasswordInputMode : setConfirmPasswordInputMode;

    inputModeHandler((prev) => {
      if (prev === PASSWORD_INPUT_MODE.PASSWORD) return PASSWORD_INPUT_MODE.TEXT;
      return PASSWORD_INPUT_MODE.PASSWORD;
    });
  };

  const onSubmit = async (data: SignUpFormData) => {
    setServerError(null);

    try {
      await register(data.username, data.password);
      navigate('/', { replace: true });
    } catch (err) {
      if (err instanceof Error) {
        setServerError(err.message);
        return;
      }

      setServerError('An unexpected error occurred');
    }
  };

  return (
    <FormContainer>
      <FormWrapper>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>
            <Text $variant="h1" color="green">
              Sign Up
            </Text>
          </FormTitle>
          <FormField>
            <FormLabel>
              <Text $variant="body2" color="green">
                Username
              </Text>
            </FormLabel>
            <FormInput {...registerField('username')} placeholder="Username" />
            {errors.username && (
              <Text $variant="body2" color="error">
                {errors.username.message}
              </Text>
            )}
          </FormField>
          <FormField>
            <FormLabel>
              <Text $variant="body2" color="green">
                Password
              </Text>
            </FormLabel>
            <FormInput {...registerField('password')} type={passwordInputMode} placeholder="Password" />
            {passwordInputMode === PASSWORD_INPUT_MODE.PASSWORD ? (
              <StyledEyeIcon onClick={() => handleTogglePasswordMode('password')} />
            ) : (
              <StyledEyeCloseIcon onClick={() => handleTogglePasswordMode('password')} />
            )}
            {errors.password && (
              <Text $variant="body2" color="error">
                {errors.password.message}
              </Text>
            )}
          </FormField>
          <FormField>
            <FormLabel>
              <Text $variant="body2" color="green">
                Confirm Password
              </Text>
            </FormLabel>
            <FormInput
              {...registerField('confirmPassword')}
              type={confirmPasswordInputMode}
              placeholder="Confirm Password"
            />
            {confirmPasswordInputMode === PASSWORD_INPUT_MODE.PASSWORD ? (
              <StyledEyeIcon onClick={() => handleTogglePasswordMode('confirmPassword')} />
            ) : (
              <StyledEyeCloseIcon onClick={() => handleTogglePasswordMode('confirmPassword')} />
            )}
            {errors.confirmPassword && (
              <Text $variant="body2" color="error">
                {errors.confirmPassword.message}
              </Text>
            )}
          </FormField>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader width={24} height={24} />
            ) : (
              <Text $variant="body1" color="backgroundDark">
                Sign Up
              </Text>
            )}
          </SubmitButton>
          {serverError && (
            <Text $variant="body2" color="error">
              {serverError}
            </Text>
          )}
          <FormFooter>
            <Text $variant="body2" color="green">
              Already have an account?{' '}
            </Text>
            <StyledLink to="/signin" color="yellow">
              <Text $variant="body2" color="yellow">
                Sign in
              </Text>
            </StyledLink>
          </FormFooter>
        </StyledForm>
      </FormWrapper>
    </FormContainer>
  );
};
