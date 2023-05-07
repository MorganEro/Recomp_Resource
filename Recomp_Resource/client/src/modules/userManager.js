import { getToken } from "./authManager";

const apiUrl = "/api/user";

export const getAllUsers = () => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get users.",
        );
      }
    });
  });
};

export const ThisUser = () => {
  return getToken().then((token) =>
    fetch(`${apiUrl}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => resp.json()),
  );
}

export const getUserById = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get this user.",
        );
      }
    });
  });
};


export const UpdateUser = (id, user) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`

      },
      body: JSON.stringify(user),
    })
  })
}

export const getUserSearch = (q) => {
    return getToken().then((token) => {
      return fetch(`${apiUrl}/search?q=${q}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error(
            "An unknown error occurred while trying to search users.",
          );
        }
      });
    });
  };