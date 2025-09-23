import { ApiYoutubeLinkResponse, AuthResponse, getItems } from "@/types/types";

export const ApiAuthConfig = {
  BASE_URL: process.env.EXPO_PUBLIC_API_AUTH_BASE_URL || "",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const ApiGenerateConfig = (token: string) => ({
  BASE_URL: process.env.EXPO_PUBLIC_API_GENERATE_BASE_URL || "",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const TrancribeYoutubeApi = async (
  { youtubeUrl }: { youtubeUrl: string },
  signal?: AbortSignal
) => {
  const endpoint = `${ApiAuthConfig.BASE_URL}/youtube/transcript`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: ApiAuthConfig.headers,
    body: JSON.stringify({
      youtubeUrl: youtubeUrl,
    }),
    signal,
  });
  console.log("1");

  if (!response.ok) {
    console.log("eror");
    throw new Error(`Creating Transctibe failed : ${response.status}`);
  }
  console.log("2");
  const data = await response.json();
  return data;
};

export const Signup = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const endpoint = `${ApiAuthConfig.BASE_URL}/api/auth/local/register`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: ApiAuthConfig.headers,
    body: JSON.stringify({
      email: email,
      password: password,
      username: email,
    }),
  });

  if (!response.ok) {
    throw new Error(`Something gets wrong : ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const Login = async ({
  identifier,
  password,
}: {
  identifier: string;
  password: string;
}): Promise<AuthResponse> => {
  const endpoint = `${ApiAuthConfig.BASE_URL}/api/auth/local`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: ApiAuthConfig.headers,
    body: JSON.stringify({
      identifier: identifier,
      password: password,
    }),
  });
  if (!response.ok) {
    throw new Error(`Something gets wrong : ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const GenerateFromYoutubeLink = async (
  { youtubeUrl }: { youtubeUrl: string },
  token: string
): Promise<ApiYoutubeLinkResponse | null> => {
  const endpoint = `${
    ApiGenerateConfig(token).BASE_URL
  }/notes/youtube-to-audio`;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: ApiGenerateConfig(token).headers,
      body: JSON.stringify({
        youtubeUrl: youtubeUrl,
        fileName: "test",
      }),
    });
    if (!response.ok) {
      throw new Error(`failed :${response.status}`);
    }
    const data = await response.json();
    return data || null;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
};

export const GetAllItems = async (token: string): Promise<getItems | null> => {
  const endpoint = `${ApiAuthConfig.BASE_URL}/api/generations/user-generations`;
  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: ApiGenerateConfig(token).headers,
    });
    if (!response.ok) {
      throw new Error(`failed :${response.status}`);
    }
    const data = response.json();
    return data || null;
  } catch (err: any) {
    console.log(err.message || "undefiend");
    return null;
  }
};
