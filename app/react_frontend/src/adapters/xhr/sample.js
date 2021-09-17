import { getAuthHeaderAxios } from "./axios";
import { ReviewBO } from "./auth";


export class SampleBO {
  constructor(id, title, body){
    this.id = id
    this.title = title
    this.body = body
  }

  static parseFromJSON(json){
    if (!("id" in json) || !("title" in json) || !("body" in json)) throw new Error("missing Value in serializer")
    return new SampleBO(json.id, json.title, json.body)
  }

  parseToJson(){
    return {"id": this.id, "title": this.title, "body": this.body}
  }
}


export class CreateReviewBO {
  constructor(sample, body){
    this.sample = sample
    this.body = body
  }
  static parseFromJSON(json){
    if (!("sample" in json) || !("body" in json)) throw new Error("missing Value in serializer")
    return new CreateReviewBO(json.sample, json.body)
  }

  parseToJson(){
    return {"sample": this.sample, "body": this.body}
  }

  handleUpdate(e){
    const json = this.parseToJson()
    return CreateReviewBO.parseFromJSON({...json, [e.target.name]: e.target.value})
  }

  is_valid(){
    return (this.sample !== "" && this.body !== "")
  }
}

export class CreateCommentBO {
  constructor(sample, review, body){
    this.sample = sample
    this.review = review
    this.body = body
  }
  static parseFromJSON(json){
    if (!("sample" in json) || !("body" in json) || !("review" in json)) throw new Error("missing Value in serializer")
    return new CreateCommentBO(json.sample, json.review, json.body)
  }

  parseToJson(){
    return {"sample": this.sample, "review": this.review, "body": this.body}
  }

  handleUpdate(e){
    const json = this.parseToJson()
    return CreateCommentBO.parseFromJSON({...json, [e.target.name]: e.target.value})
  }

  is_valid(){
    return (this.sample !== "" && this.review !== "" && this.body !== "")
  }
}

class CommentBO {
  constructor(id, author, body, timestamp){
    this.id = id
    this.author = author
    this.body = body
    this.timestamp = timestamp
  }
  static parseFromJSON(json){
    if (
      !("id" in json) ||
      !("author" in json) ||
      !("body" in json) ||
      !("timestamp" in json)
    )
      throw new Error("missing Value in serializer")
    return new CommentBO(json.id, json.author, json.body, json.timestamp)
  }
}


class SampleDetailBO {
  constructor(id, author, body, timestamp, comments, sample){
    this.id = id
    this.author = author
    this.body = body
    this.timestamp = timestamp
    this.comments = comments
    this.sample = sample
  }
  static parseFromJSON(json){
    if (
      !("id" in json) ||
      !("author" in json) ||
      !("body" in json) ||
      !("timestamp" in json) ||
      !("comments" in json) ||
      !("sample" in json)
    )
      throw new Error("missing Value in serializer")
    const sample = SampleBO.parseFromJSON(json.sample)
    const comments = json.comments.map(comment => CommentBO.parseFromJSON(comment))
    return new SampleDetailBO(json.id, json.author, json.body, json.timestamp, comments, sample)
  }
}

export class SampleAPI {
  static async get(){
    const promise = await getAuthHeaderAxios().get("/review/sample")
    return SampleBO.parseFromJSON(promise.data)
  }

  static async createReview(form){
    if (!form.is_valid()) throw new Error("Form not valid")
    const promise = await getAuthHeaderAxios().post(`/review/sample/${form.sample}/create`, form.parseToJson())
    return ReviewBO.parseFromJSON(promise.data)
  }
}


export class SampleDetailAPI {
  static async get(sampleId, reviewId){
    const promise = await getAuthHeaderAxios().get(`/review/sample/${sampleId}/${reviewId}`)
    return SampleDetailBO.parseFromJSON(promise.data)
  }
  static async createComment(form){
    if (!form.is_valid()) throw new Error("Form not valid")
    const promise = await getAuthHeaderAxios().post(`/review/sample/${form.sample}/${form.review}`, form.parseToJson())
    return ReviewBO.parseFromJSON(promise.data)
  }
}
