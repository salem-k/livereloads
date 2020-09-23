import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class FilterService {
  constructor() {}
  mostRecent(data) {
    
    return data.sort((a, b) => a.connected_at - b.connected_at);
  }
  oldest(data) {
    return data.sort((a, b) => b.connected_at - a.connected_at);
  }
  alphabetically(data) {
    return data.sort((a, b) => a.first_name.localeCompare(b.first_name));
  }
}
