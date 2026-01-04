import { SignInFormData, signInSchema } from './schemas/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
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
import { useSelectorLogin } from '~/store';

export const SignInPage = () => {
  const navigate = useNavigate();
  const login = useSelectorLogin();

  const [serverError, setServerError] = useState<string | null>(null);
  const [passwordInputMode, setPasswordInputMode] = useState<PASSWORD_INPUT_MODE>(PASSWORD_INPUT_MODE.PASSWORD);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    mode: 'onTouched',
    resolver: zodResolver(signInSchema),
  });

  const handleTogglePasswordMode = () => {
    setPasswordInputMode((prev) => {
      if (prev === PASSWORD_INPUT_MODE.PASSWORD) return PASSWORD_INPUT_MODE.TEXT;
      return PASSWORD_INPUT_MODE.PASSWORD;
    });
  };

  const onSubmit = useCallback(
    async (data: SignInFormData) => {
      setServerError(null);

      try {
        await login(data.username, data.password);
        navigate('/', { replace: true });
      } catch (error) {
        if (error instanceof Error) {
          setServerError(error.message);
          return;
        }

        setServerError('An unexpected error occurred');
      }
    },
    [login, navigate],
  );

  return (
    <FormContainer>
      <FormWrapper>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>
            <Text $variant="h1" color="green">
              Sign In
            </Text>
          </FormTitle>
          <FormField>
            <FormLabel>
              <Text $variant="body2" color="green">
                Username
              </Text>
            </FormLabel>
            <FormInput {...register('username')} placeholder="Username" />
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
            <FormInput $withIcon {...register('password')} type={passwordInputMode} placeholder="Password" />
            {passwordInputMode === PASSWORD_INPUT_MODE.PASSWORD ? (
              <StyledEyeIcon onClick={handleTogglePasswordMode} />
            ) : (
              <StyledEyeCloseIcon onClick={handleTogglePasswordMode} />
            )}
            {errors.password && (
              <Text $variant="body2" color="error">
                {errors.password.message}
              </Text>
            )}
          </FormField>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader width={24} height={24} />
            ) : (
              <Text $variant="body1" color="backgroundDark">
                Sign In
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
              Don&#39;t have an account?{' '}
            </Text>
            <StyledLink to="/signup" color="yellow">
              <Text $variant="body2" color="yellow">
                Sign up
              </Text>
            </StyledLink>
          </FormFooter>
        </StyledForm>
      </FormWrapper>
    </FormContainer>
  );
};
