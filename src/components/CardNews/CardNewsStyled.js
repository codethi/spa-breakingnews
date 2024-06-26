import styled from "styled-components";

export const CardNews = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 0.3rem;
  box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  padding: 2rem;
  margin: 0.5rem 0;
  position: relative;
  transform: scale(0.99);
  transition: all 0.3s ease-in-out;
  max-width: 100%;

  :hover {
    transform: scale(1);
  }
`;

export const Card = styled.div`
  display: flex;
  max-width: 100%;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
`;

/* 

.card {
    display: flex;
    max-width: 100%;
    transition: all .3s ease-in-out;
    cursor: pointer;
}


.card-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-image img {
    width: 15rem;
    height: 10rem;
    object-fit: cover;
    padding: 1rem;
}

.user {
    color: #6d6d6d;
    font-size: .8rem;
}

.card-actions {
    width: 100%;

    display: flex;
    flex-direction: column;
    cursor: pointer;
}

.card-actions-count {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 2rem;

}

.card-actions-count-likes {
    padding: 1rem;
}

.card-actions-count-comments {
    padding: 1rem;
}

.line {
    width: 100%;
    height: .1px;
    border: .1px solid #cccccc10;
    background-color: #cccccc60;
    margin: .5rem auto;
}

.card-actions-btn {
    display: flex;
    align-items: center;
    margin-bottom: .5rem;
}

.card-actions-btn span {
    font-family: Roboto, Arial, Helvetica, sans-serif;
    padding: 1rem;
    transition: background-color .3s ease-in-out;
    border-radius: .3rem;
    cursor: pointer;
}

.like {
    transform: scaleX(-1);
    padding-left: .2rem;
}

.comment {
    transform: scaleX(-1);
}

.card-actions-btn span:hover {
    background-color: #cccccc30;
}

.card-footer {
    display: flex;
    flex-direction: column;
}

.form-comment {
    width: 100%;

    margin-bottom: 1rem;

    display: none;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.form-comment img {
    width: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;

}

.form-comment input {
    width: 100%;
    margin: 0;
    padding: 0.7rem;
    border-radius: 0.3rem 0 0 .3rem;
    margin-left: 1rem;
}

.form-comment button {
    border: 0;
    border-radius: 0 0.3rem .3rem 0;
    font-size: 1rem;
}

.comment-input:focus {
    border: 1px solid #0bade3;
}


.card-top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    grid-gap: 1rem;
    cursor: pointer;
}

.card-body-top {
    width: 100%;
    justify-self: center;
    align-self: center;
}

.card-body-top h2 {
    font-size: 2.5rem;
    padding-bottom: 2rem;
}

.card-body-top p {
    font-size: 1.2rem;
    padding-bottom: 3rem;
    line-height: 2rem;
}

.card-image-top {
    width: 100%;
    height: 100%;
    justify-self: center;
    align-self: center;
}

.card-image-top img {
    height: 100%;
    max-width: 100%;
    object-fit: cover;
    object-position: center;
}

.card-icon-back {
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    padding: .3rem;
    font-size: 1.3rem;
    cursor: pointer;
    transition: all .3s ease-in-out;
    background-color: #0bade3;
    border-radius: .2rem 0 1rem 0;
}

.card-icon-back:hover {
    background-color: #0b7da2;
}

.card-icon-actions {
    position: absolute;
    top: .4rem;
    right: 0;
    color: #0bade3;
    padding: .3rem;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all .3s ease-in-out;
}

.card-icon-actions:hover {
    color: #055773;
}

@media (max-width: 1200px) {
    .card-news {
        padding: 1rem;
        transform: scale(1);
    }

    .card {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        justify-content: space-between;
        max-width: 100%;
        transition: all .3s ease-in-out;
        cursor: pointer;
    }

    .card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        padding: 0;
        margin: 2rem 0;
    }

    .card h2 {
        margin-bottom: 2rem;
    }

    .card p{
        margin-bottom: 2rem;
    }

    .card-image-top img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        padding: 0;
        margin-bottom: 2rem;
    }


    .card-top {
        display: flex;
        flex-direction: column-reverse;
        cursor: pointer;
    }

    
} */
