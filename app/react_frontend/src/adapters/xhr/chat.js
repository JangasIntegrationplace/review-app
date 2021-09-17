import { getAuthHeaderAxios } from "./axios";


class ThreadBO {
  constructor(id){
    this.id = id
  }

  static parseFromJSON(json){
    if (!("id" in json)) throw new Error("missing Value in serializer")
    return new ThreadBO(json.id)
  }
}


export class ReceivedMessageBO {
  constructor(id, user, timestamp, body){
    this.id = id
    this.user = user
    this.timestamp = timestamp
    this.body = body
  }

  static parseFromJSON(json){
    if (
      !("id" in json) ||
      !("user" in json) ||
      !("timestamp" in json) ||
      !("body" in json)
    )
      throw new Error("missing Value in serializer")
    return new ReceivedMessageBO(json.id, json.user, json.timestamp, json.body)
  }
}


export class MessageBO {
  constructor(thread, body){
    this.thread = thread
    this.body = body
  }

  static parseFromJSON(json){
    if (
      !("thread" in json) ||
      !("body" in json)
    )
      throw new Error("missing Value in serializer")
    return new MessageBO(json.thread, json.body)
  }

  parseToJson(){
    return {"thread": this.thread, "body": this.body}
  }

  handleUpdate(e){
    const json = this.parseToJson()
    return MessageBO.parseFromJSON({...json, [e.target.name]: e.target.value})
  }

  is_valid(){
    return (this.thread !== "" && this.body !== "")
  }
}


export class ThreadAPI {
  static async post(){
    const promise = await getAuthHeaderAxios().post('/support/chat/')
    return ThreadBO.parseFromJSON(promise.data)
  }

  static async createMessage(form){
    if (!form.is_valid()) throw new Error("Form not valid")
    const promise = await getAuthHeaderAxios().post('support/message/', form.parseToJson())
    return ReceivedMessageBO.parseFromJSON(promise.data)
  }
}
