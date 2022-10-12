import axios from "axios";
const baseURL = "http://localhost:3001";

export function createNewsService(body, jwt) {
  const response = axios.post(`${baseURL}/posts/create`, body, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return response;
}

export function editNewsService(body, id, jwt) {
  const response = axios.post(`${baseURL}/posts/update/${id}`, body, {
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
