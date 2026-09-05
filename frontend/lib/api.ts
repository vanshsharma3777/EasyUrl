import axios from 'axios';

export const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

export interface ShortenUrlResponse {
  ID: string;
  Msg: string;
  ShortUrl: string;
  OriginalUrl: string;
  QrCode?: string;
}

export const shortenUrl = async (longUrl: string): Promise<ShortenUrlResponse> => {
  const response = await api.post<ShortenUrlResponse>('/url', { url: longUrl });
  return response.data;
};

export const getRecentUrls = async (): Promise<ShortenUrlResponse[]> => {
  const response = await api.get<ShortenUrlResponse[]>('/get-urls');
  return response.data;
};