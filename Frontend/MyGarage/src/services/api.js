const API_URL = "http://localhost:9090";


export function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function loginUser(credentials) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

export async function getMotorcycles() {
  const response = await fetch(`${API_URL}/motorcycles`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function getMyMotorcycles() {
  const response = await fetch(`${API_URL}/motorcycles/me`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.motorcycles;
}

export async function getMotorcycleById(id) {
  const response = await fetch(`${API_URL}/motorcycles/${id}`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.motorcycle;
}

export async function createMotorcycle(formData) {

  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/motorcycles`, {

    method: "POST",

    headers: {
      Authorization: `Bearer ${token}`,
    },

    body: formData,

  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.newMotorcycle;
}

export async function updateMotorcycle(id, motorcycleData) {
  const response = await fetch(`${API_URL}/motorcycles/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(motorcycleData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.updatedMotorcycle;
}

export async function deleteMotorcycle(id) {
  const response = await fetch(`${API_URL}/motorcycles/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function registerUser(formData) {

  const response = await fetch(`${API_URL}/users`, {

    method: "POST",

    body: formData

  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.newUser;

}

export async function getUserById(id) {
  const response = await fetch(`${API_URL}/users/${id}`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.getUser;
}

export async function deleteUser(id) {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function updateUser(id, userData) {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.updatedUser;
}

export async function changePassword(id, passwordData) {
  const response = await fetch(`${API_URL}/users/${id}/password`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(passwordData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export const getFavorites = async () => {
    const response = await fetch(`${API_URL}/users/favorites`, {
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Errore nel recupero dei preferiti");
    }

    return response.json();
};

export const addFavorite = async (motorcycleId) => {
    const response = await fetch(
        `${API_URL}/users/favorites/${motorcycleId}`,
        {
            method: "POST",
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Errore nell'aggiunta ai preferiti");
    }

    return response.json();
};

export const removeFavorite = async (motorcycleId) => {
    const response = await fetch(
        `${API_URL}/users/favorites/${motorcycleId}`,
        {
            method: "DELETE",
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Errore nella rimozione dai preferiti");
    }

    return response.json();
};

export const uploadMotorcycleImage = async (id, image) => {

    const formData = new FormData();

    formData.append("image", image);

    const response = await fetch(`${API_URL}/motorcycles/${id}/image`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
};

export const uploadAvatar = async (image) => {

    const formData = new FormData();

    formData.append("avatar", image);

    const response = await fetch(`${API_URL}/users/me/avatar`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data.user;
};

export const contactSeller = async (motorcycleId, message) => {

    const response = await fetch(
        `${API_URL}/motorcycles/${motorcycleId}/contact`,
        {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify({ message })
        }
    );

    if (!response.ok) {
        throw new Error("Errore durante l'invio del messaggio");
    }

    return await response.json();
};