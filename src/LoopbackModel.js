/**
 * Created by sguilly on 17/11/16.
 */
/**
 * Created by sguilly on 03/11/16.
 */
"use strict";

var rest = require('restler');

class LoopbackModel {
  constructor(model,tokenClient) {

    this.baseUrl = tokenClient.getBaseUrl()

    this.authorization = {authorization: tokenClient.getToken()}

    this.model = model
  }

  get(url, query) {

    var promise = new Promise((resolve, reject) => {

      rest.get(url,
        {
          headers: this.authorization,
          query: query
        }
      ).on('complete', function (result,response) {
        if (result instanceof Error) {
          reject(result.message);

        } else {
          if(response.statusCode != 200)
          {
            reject(result)
          }
          else
          {
            resolve(result);
          }

        }
      });

    })
    return promise
  }

  post(url, data,query) {


    var promise = new Promise( (resolve, reject) => {

      var options = {
        headers: this.authorization
      }

      if(query)
      {
        options.query = query
      }

      rest.postJson(url, data, options

      ).on('complete', function (result,response) {

        if (result instanceof Error) {
          reject(result.message);

        } else {
          if(response.statusCode != 200)
          {
            reject(result)
          }
          else
          {
            resolve(result);
          }

        }
      });

    });

    return promise

  }

  put(url, data) {


    var promise = new Promise( (resolve, reject) => {

      rest.putJson(url, data,
        {
          headers: this.authorization
        }
      ).on('complete', function (result,response) {
        if (result instanceof Error) {
          reject(result.message);

        } else {
          if(response.statusCode != 200)
          {
            reject(result)
          }
          else
          {
            resolve(result);
          }

        }
      });

    });

    return promise

  }

  del(url) {


    var promise = new Promise( (resolve, reject) => {

      rest.del(url,
        {
          headers: this.authorization
        }
      ).on('complete', function (result,response) {
        if (result instanceof Error) {
          reject(result.message);

        } else {
          if(response.statusCode != 200)
          {
            reject(result)
          }
          else
          {
            resolve(result);
          }

        }
      });

    });

    return promise

  }

  findById(data) {

    var url = `${this.baseUrl}/${this.model}/${data.id}`
    return this.get(url,  {filter: data.filter})
  }

  create(data) {
    var url = `${this.baseUrl}/${this.model}`
    return this.post(url,data)
  }

  count(where) {
    var url = `${this.baseUrl}/${this.model}/count`
    return this.get(url,where)
  }

  updateAll(query, data) {
    var url = `${this.baseUrl}/${this.model}/update`
    return this.post(url,data,query)
  }

  updateById(id,data) {
    var url = `${this.baseUrl}/${this.model}/${id}`
    return this.put(url,data)
  }

  find(filter) {
    var url = `${this.baseUrl}/${this.model}`
    return this.get(url,filter)
  }

  findOne(query) {
    var url = `${this.baseUrl}/${this.model}/findOne`
    return this.get(url,query)
  }

  deleteById(id) {
    var url = `${this.baseUrl}/${this.model}/${id}`
    return this.del(url)
  }

}


module.exports = LoopbackModel
