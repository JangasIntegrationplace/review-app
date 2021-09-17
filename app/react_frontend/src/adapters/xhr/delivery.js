import { getAuthHeaderAxios } from "./axios";


class DescriptionBO {
  constructor(description){
    this.description = description
  }

  static parseFromJSON(json){
    if (!("description" in json)) throw new Error("missing Value in serializer")
    return new DescriptionBO(json.description)
  }
}

class EvaluationBO {
  constructor(input, output){
    this.input = input
    this.output = output
  }

  static parseFromJSON(json){
    if (!("input" in json) || !("output" in json)) throw new Error("missing Value in serializer")
    return new EvaluationBO(json.input, json.output)
  }
}


export class DeliveryAPI {
  static async get(delivery){
    const promise = await getAuthHeaderAxios().get(`delivery/${delivery}`)
    return DescriptionBO.parseFromJSON(promise.data)
  }

  static async post(delivery, body){
    const data = {body: body}
    const promise = await getAuthHeaderAxios().post(`delivery/${delivery}`, data)
    return EvaluationBO.parseFromJSON(promise.data)
  }
}
