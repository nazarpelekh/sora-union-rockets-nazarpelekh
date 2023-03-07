export interface iList {
  items: iUser[]
}

export interface iUser {
  login: string,
  avatar_url: string
}

export interface FormValues {
  user: iUser | null
};

export interface iRocket {
  id: string
  title: string
  rocketName: string
  description: string
  githubUsername: string
}