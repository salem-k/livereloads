import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-param",
  templateUrl: "./param.component.html",
  styleUrls: ["./param.component.scss"]
})
export class ParamComponent implements OnInit {
  focused: boolean = false;
  valueInput = "";
  user: any = [];
  constructor(private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("User"));
    console.log(this.user);
  }
  onFocus() {
    this.focused = true;
  }
  onBlur() {
    this.focused = false;
  }
  goSecurityPage() {
    this.router.navigate(["/security-and-connection"]);
  }
}
