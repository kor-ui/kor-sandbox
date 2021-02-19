export interface Project {
  uid: string,
  name: string,
  thumbnail: string,
  owner: string,
  editors: string[],
  updatedDate: Date,
  createdDate: Date,
}

export interface User {
  uid: string,
  name: string,
  email: string,
  image: string,
}

export interface Page {
  uid: string,
  name: string,
  content: string,
}