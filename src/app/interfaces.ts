export interface Project {
  uid: string | undefined,
  name: string | undefined,
  thumbnail: string | undefined,
  owner: string | undefined,
  editors: (string | undefined)[] | undefined,
  updatedDate: Date | undefined,
  createdDate: Date | undefined,
}

export interface User {
  uid: string | undefined,
  name: string | undefined,
  email: string | undefined,
  image: string | undefined,
}

export interface Page {
  uid: string,
  name: string,
  content: string,
}