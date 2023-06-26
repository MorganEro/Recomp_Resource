import { getToken } from "./authManager";

const apiUrl = `${process.env.REACT_APP_API_BASE_URL}api/comment`;

export const getAllCommentsByResourceId = (resourceId) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${resourceId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get Comments.",
        );
      }
    });
  });
};


export const addComment = (comment) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          "An unknown error occurred while trying to save a new comment.",
        );
      }
    });
  });
};

export const DeleteComment = (id) => {
  return getToken().then((token) => {
      return fetch(`${apiUrl}/${id}`, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token}`,
          },
      })
  })
};

