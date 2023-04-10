import React from 'react';
import styled from '@emotion/styled';
import TypoNotoSans from './TypoNotoSans';

type Props = {
  className?: string;
  border?: boolean;
  error?: boolean;
  errorText?: string;
  onReturn?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, border = true, error = false, errorText = '', onReturn, ...props }: Props) => {
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && onReturn) onReturn();
  }

  return (
    <Container border={border} error={error} className={className}>
      <input onKeyDown={onKeyDown} {...props} />
      <TypoNotoSans className={'error-text ' + (error ? 'show' : 'hide')} textAlign='center' fontSize='0.8rem'>
        {errorText}
      </TypoNotoSans>
    </Container>
  );
};

export default Input;

const Container = styled.div<{ border: boolean; error: boolean }>`
  width: 100%;
  input {
    width: 100%;
    border: none;
    border-bottom: ${(props) =>
      props.border
        ? props.error
          ? '1px solid rgb(var(--error-foreground-rgba))'
          : '1px solid rgb(var(--primary-foreground-rgba))'
        : 'none'};

    color: rgba(var(--primary-foreground-rgba));
    text-align: center;
    background: none;
    font-size: 1rem;
  }

  .error-text {
    position: absolute;
    left: 50%;
    width: 100%;
    transform: translateX(-50%);

    color: rgba(var(--error-foreground-rgba));
    margin-top: 5px;
  }
  .show {
    animation: fadein 0.5s forwards ease-in-out;
    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
  .hide {
    animation: fadeout 0.5s forwards ease-in-out;
    @keyframes fadeout {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  }
`;
