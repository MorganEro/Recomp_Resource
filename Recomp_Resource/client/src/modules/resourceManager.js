import { getToken } from "./authManager";

const apiUrl = `${process.env.REACT_APP_API_BASE_URL}api/resource`;

export const getAllResources = () => {
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
          "An unknown error occurred while trying to get responses.",
        );
      }
    });
  });
};

export const getResourceById = (id) => {
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
          "An unknown error occurred while trying to get this resource.",
        );
      }
    });
  });
};

export const getSavedResourceById = (id) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/saved/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get this resource.",
        );
      }
    });
  });
};


export const getAllResourcesByCategoryId = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/categoryList`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get this resource by categoryId.",
        );
      }
    });
  });
};

export const getAllResourcesSavedByUserId = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/thisUserSavedList`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get the resources of this user.",
        );
      }
    });
  });
};
export const addResource = (resource) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resource),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          "An unknown error occurred while trying to add a new resource.",
        );
      }
    });
  });
};

export const saveResource = (savedResource) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/save`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(savedResource),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          "An unknown error occurred while trying to save a new resource.",
        );
      }
    });
  });
};

export const UpdateResource = (id, resource) => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`

      },
      body: JSON.stringify(resource),
    })
  })
}



export const DeleteResource = (id) => {
  return getToken().then((token) => {
      return fetch(`${apiUrl}/${id}`, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token}`,
          },
      })
  })
};


export const UnSaveResource = (id) => {
  return getToken().then((token) => {
      return fetch(`${apiUrl}/saved/${id}`, {
          method: "DELETE",
          headers: {
              Authorization: `Bearer ${token}`,
          },
      })
  })
};

export const getResourceSearch = (q) => {
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
          "An unknown error occurred while trying to search resources.",
        );
      }
    });
  });
};