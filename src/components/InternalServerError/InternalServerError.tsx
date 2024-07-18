import {
  InternalServerErrorWrapper,
  InternalServerErrorText,
  InternalServerErrorEmoji,
  ButtonLink,
} from './InternalServerError.styled.ts';

export default function InternalServerError() {
  return (
    <InternalServerErrorWrapper>
      <InternalServerErrorEmoji>(╥﹏╥)</InternalServerErrorEmoji>
      <InternalServerErrorText>Internal Server Error</InternalServerErrorText>
      <ButtonLink onClick={() => window.location.reload()}>reloadPage()</ButtonLink>
    </InternalServerErrorWrapper>
  );
}
