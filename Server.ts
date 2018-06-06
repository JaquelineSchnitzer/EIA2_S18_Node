import * as Http from "http";
import * as Url from "url";

namespace Server {
    interface AssocStringString {
        [key: string]: string;
    }

    let port: number = process.env.PORT;
    if (port == undefined)
        port = 8100;

// Studi Interface
    interface Studi {
        name: string;
        firstname: string;
        matrikel: number;
        courseOfStudies: string
        age: number;
        gender: boolean;
    }

    interface Studis {
         [matrikel: string]: Studi;
    }

    let studiHomoAssoc: Studis = {};

// Server
    let server: Http.Server = Http.createServer((_request: Http.IncomingMessage, _response: Http.ServerResponse) => {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
    });
    server.addListener("request", clientRequest);
    server.listen(port);

// Client Request
    function clientRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        let clientQuery: AssocStringString = Url.parse(_request.url, true).query;
        console.log(clientQuery["command"]);

        if (clientQuery["command"] == "insert") {
            insertRequest(clientQuery, _response);
        }
        else if (clientQuery["command"] == "refresh") {
            refreshRequest(_response);
        }
        else if (clientQuery["command"] == "search") {
             searchRequest(clientQuery, _response);
        }
        else {
             errorHandler();
        }

        _response.end();

    }

        function errorHandler(): void {
            alert("Funktion nicht gefunden!");
        }

// Insert Request
        function insertRequest(query: AssocStringString, _response: Http.ServerResponse): void {
                   let obj: Studi = JSON.parse(query["data"]);
                   let _name: string = obj.name;
                   let _firstname: string = obj.firstname;
                   let matrikel: string = obj.matrikel.toString();
                   let _courseOfStudies: string = obj.courseOfStudies;
                   let _age: number = obj.age;
                   let _gender: boolean = obj.gender;
                   let studi: Studi;
            studi = {
                name: _name,
                firstname: _firstname,
                matrikel: parseInt(matrikel),
                courseOfStudies: _courseOfStudies,
                age: _age,
                gender: _gender,
            };
            studiHomoAssoc[matrikel] = studi;
            _response.write("Daten in Datenbank gespeichtert!");
         }

         function refreshRequest(_response: Http.ServerResponse): void {
            console.log(studiHomoAssoc);
            for (let matrikel in studiHomoAssoc) {
                let studi: Studi = studiHomoAssoc[matrikel];
                let line: string = matrikel + ": ";
                line += studi.courseOfStudies + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre, ";
                line += studi.gender ? "Male" : "Female";
                line += "\n";
                _response.write(line);
            }
          }

                  function searchRequest(query: AssocStringString, _response: Http.ServerResponse): void {
                      let studi: Studi = studiHomoAssoc[query["searchFor"]];
                      if (studi) {
                          let line: string = query["searchFor"] + ": ";
                          line += studi.courseOfStudies + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
                          line += studi.gender ? "Male" : "Female";
                          _response.write(line);
                      }
                      else {
                          _response.write("Keine Daten in Datenbank gefunden!");
                      }
                  }

          }
