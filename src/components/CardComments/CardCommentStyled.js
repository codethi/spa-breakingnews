import styled from "styled-components";

export const CardCommentContainer = styled.section`
  padding: 1rem;

  display: flex;
  align-items: flex-start;

  max-width: 100%;

  img {
    width: 2.5rem;
    border-radius: 50%;
    margin-right: 0.5rem;
  }

  div {
    background-color: #e9e9e9;
    padding: 1rem;
    border-radius: 0 1rem 1rem 1rem;

    display: flex;
    flex-direction: column;
    align-items: space-around;
    max-width: 8rem;
    overflow-wrap: break-word;

    h4 {
      padding-bottom: 1rem;
    }
  }

  .delete-comment {
    color: #000;
    margin-left: 0.5rem;
    margin-top: 0.2rem;
    transition: all 0.2s ease-in-out;
  }

  .delete-comment:hover {
    color: #ff0000;
  }
`;
