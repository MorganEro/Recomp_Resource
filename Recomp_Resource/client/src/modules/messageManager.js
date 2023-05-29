import { getToken } from "./authManager";

const apiUrl = "/api/message";

export const getAllMessagesOfUser = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get Messages.",
        );
      }
    });
  });
};

export const getAllMessagesReceivedByUser = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/recipient`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get Messages.",
        );
      }
    });
  });
};

export const getAllMessagesSentByUser = () => {
  return getToken().then((token) => {
    return fetch(`${apiUrl}/sender`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get Messages.",
        );
      }
    });
  });
};


export const addMessage = (message) => {
  return getToken().then((token) => {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else if (resp.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error(
          "An unknown error occurred while trying to save a new message.",
        );
      }
    });
  });
};

