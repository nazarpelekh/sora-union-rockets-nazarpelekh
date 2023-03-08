export interface iList {
  items: iUser[]
}

export interface iUser {
  id: string
  login: string,
  avatar_url: string
}

export interface FormValues {
  user: iUser | null
};

export interface iRocket {
  key: number
  title: string
  name: string
  description: string
  github: string
}