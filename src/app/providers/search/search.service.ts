import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "./../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class SearchService {
  constructor(public http: HttpClient) {}

  postSearch(data) {
    return this.http.post(environment.URL + "network/search", data);
  }
  putSearch(data) {
    return this.http.put(environment.URL + "network/search/"+data.id,data);
  }
  getSearch() {
    return this.http.get(environment.URL + "network/search");
  }
  getSearchById(id) {
    return this.http.get(environment.URL + "network/search/" + id);
  }
  
}
