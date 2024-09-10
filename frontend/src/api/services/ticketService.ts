import { api } from "../api";

export const getTickets = async () => {
  try {
    const { data } = await api.get("/api/tickets");
    return data;
  } catch (error) {
    return error;
  }
};

export const getStatus = async () => {
  try {
    const { data } = await api.get("/api/status");
    return data;
  } catch (error) {
    return error;
  }
};

export const getTypes = async () => {
  try {
    const { data } = await api.get("/api/types");
    return data;
  } catch (error) {
    return error;
  }
};

export const getReasons = async () => {
  try {
    const { data } = await api.get("/api/reasons");
    return data;
  } catch (error) {
    return error;
  }
};

export const getClients = async () => {
  try {
    const { data } = await api.get("/api/clients");
    return data;
  } catch (error) {
    return error;
  }
};

export const getVeichles = async () => {
  try {
    const { data } = await api.get("/api/veichles");
    return data;
  } catch (error) {
    return error;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFilteredTickets = async (filters: any) => {
  try {
    const { data } = await api.post("/api/tickets/filter", filters);
    return data;
  } catch (error) {
    return error;
  }
};
