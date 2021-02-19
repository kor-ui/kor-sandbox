export interface Project {
  uid: string,
  name: string,
  owner: string,
  editors: string[],
  thumbnail: string,
  updatedDate: Date,
  createdDate: Date,
}

export interface User {
  name: string,
  email: string,
  image: string,
  uid: string,
}