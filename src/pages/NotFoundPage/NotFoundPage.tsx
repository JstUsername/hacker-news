import { NotFoundWrapper, NotFoundText, NotFoundEmoji, HomeLink } from './NotFoundPage.styled.ts';

export default function NotFoundPage() {
  return (
    <NotFoundWrapper>
      <NotFoundEmoji>(ó﹏ò｡)</NotFoundEmoji>
      <NotFoundText>Page not found</NotFoundText>
      <HomeLink to="/">goHome()</HomeLink>
    </NotFoundWrapper>
  );
}
