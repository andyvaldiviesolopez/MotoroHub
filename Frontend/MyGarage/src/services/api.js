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

export async function createMotorcycle(motorcycleData) {

  const response = await fetch(`${API_URL}/motorcycles`, {

    method: "POST",

    headers: getAuthHeaders(),

    body: JSON.stringify(motorcycleData)

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