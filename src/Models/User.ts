export type UserProfileToken = {
  username: string;
  email: string;
  token: string;
  tokenExpiry: number;
};

export type UserProfile = {
  username: string;
};

export type UserDetails = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
};
