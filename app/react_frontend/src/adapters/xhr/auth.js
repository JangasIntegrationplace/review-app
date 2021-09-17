import { getBaseAxios, getAuthHeaderAxios } from "./axios";


export class AuthBO {
  constructor(username, password){
    this.username = username
    this.password = password
  }

  static parseFromJSON(json){
    if (!("username" in json) || !("password" in json)) throw new Error("missing Value in serializer")
    return new AuthBO(json.username, json.password)
  }

  handleUpdate(e){
    const json = this.parseToJson()
    return AuthBO.parseFromJSON({...json, [e.target.name]: e.target.value})
  }

  parseToJson(){
    return {"username": this.username, "password": this.password}
  }

  is_valid(){
    return (this.username !== "" && this.password !== "")
  }
}

class TokenBO {
  constructor(token){
    this.token = token
  }

  static parseFromJSON(json){
    if (!("token" in json)) throw new Error()
    return new TokenBO(json.token)
  }

  parseToJson(){
    return {"token": this.token}
  }

  is_valid(){
    return this.token !== ""
  }
}

class SampleBO {
  constructor(id, title, body){
    this.id = id
    this.title = title
    this.body = body
  }

  static parseFromJSON(json){
    if (!("id" in json) || !("title" in json) || !("body" in json))
      throw new Error()
    return new SampleBO(json.id, json.title, json.body)
  }
}

export class ReviewBO {
  constructor(id, sample, timestamp){
    this.id = id
    this.sample = sample
    this.timestamp = timestamp
  }
  static parseFromJSON(json){
    if (!("id" in json) || !("sample" in json) || !("timestamp" in json))
      throw new Error()
    const sample = SampleBO.parseFromJSON(json.sample)
    return new ReviewBO(json.id, sample, json.timestamp)
  }
}

class DashboardBO {
  constructor(username, reviews){
    this.username = username
    this.reviews = reviews
  }
  static parseFromJSON(json){
    if (!("username" in json) || !("reviews" in json))
      throw new Error()
    const reviews = json.reviews.map(review => ReviewBO.parseFromJSON(review))
    return new DashboardBO(json.username, reviews)
  }
}


export class SignUpAPI {
  static async post(form){
    if (!form.is_valid()) throw new Error("Form not valid")
    const promise = await getBaseAxios().post("/auth/sign-up", form.parseToJson())
    return TokenBO.parseFromJSON(promise.data)
  }
}


export class SignInAPI {
  static async post(form){
    if (!form.is_valid()) throw new Error("Form not valid")
    const promise = await getBaseAxios().post("/auth/sign-in", form.parseToJson())
    return TokenBO.parseFromJSON(promise.data)
  }
}

export class DashboardAPI{
  static async get(){
    const promise = await getAuthHeaderAxios().get("/auth/dashboard");
    return DashboardBO.parseFromJSON(promise.data)
  }
}
