import styled from "styled-components";

export const ModalTitle = styled.h2`
  padding-bottom: 1rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0;
`;
export const Input = styled.input`
  padding: 0.5rem;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 0.2rem;
  margin-bottom: 0.8rem;
`;

export const TextArea = styled.textarea`
  padding: 0.5rem;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 0.2rem;
  margin-bottom: 0.8rem;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;

  background-color: #0bade3;
  color: #fff;
  padding: 0.7rem;
  font-size: 1.1rem;
  border: 1px solid #0bade3;
  cursor: pointer;
  font-weight: bold;
  border-radius: 0.2rem;

  transition: all 0.3s ease-in-out;

  :hover {
    background-color: #0a86af;
  }
`;

export const P = styled.p`
  padding-top: 1.3rem;
  display: flex;
  justify-content: center;
`;

export const A = styled.a`
  background-color: transparent;
  color: #0bade3;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: bold;
  padding-left: 0.4rem;
  transition: all 0.3s ease-in-out;
  text-decoration: none;

  :hover {
    color: #003b4e;
    text-decoration: underline;
  }
`;
