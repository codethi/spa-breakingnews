import axios from "axios";
const baseURL = "http://localhost:3001";

export function createNewsService(body, jwt) {
  const response = axios.post(`${baseURL}/posts/create`, body, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return response;
}

export function editNewsService(body, id, jwt) {
  const response = axios
    .patch(`${baseURL}/posts/update/${id}`, body, {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
}

export function deleteNewsService(newsId, jwt) {
  const response = axios.delete(`${baseURL}/posts/delete/${newsId}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return response;
}

export function createCommentService(id, body, jwt) {
  const response = axios.patch(`${baseURL}/posts/${id}/comment`, body, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return response;
}

export function deleteCommentService(newsId, commentId, jwt) {
  const response = axios.patch(
    `${baseURL}/posts/${newsId}/${commentId}/comment`,
    {
      headers: { Authorization: `Bearer ${jwt}` },
    }
  );
  return response;
}
