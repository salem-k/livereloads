import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HTTP} from "@ionic-native/http/ngx";

import {HttpClient} from '@angular/common/http';
import {LinkedinServiceService} from "../../providers/linkedin-service/linkedin-service.service";

import {AutoCompleteService} from 'ionic4-auto-complete';
import { Observable } from 'rxjs';

@Injectable()
export class AutoCompleteMetiers implements AutoCompleteService {
  
  formValueAttribute = ''
  labelAttribute = ''
  
  constructor(
        private httpNative: HTTP,  
        private linkedinService: LinkedinServiceService
    ) {
  
  }

  getResults(keyword:string) {
      //return  ["Logiciels informatiques","Matériel informatique","Réseaux informatiques","Sécurité informatique et des réseaux","Services d’information","Technologies et services de l’information"]
    let observable

                console.log("this.linkedinService.searchGeo(keyword)",keyword)
                
                return this.linkedinService.searchJob(keyword).then(
                        /*
                      (result) => {
                        return result.filter(
                          (item) => {
                            return item.name.toLowerCase().startsWith(
                                keyword.toLowerCase()
                            );
                          }
                        );
                      }
                      */
                        ((data:any)=>{
                        
                            let tempElements = JSON.parse(data.data)
        
                            console.log("ELEMNTS",tempElements.data.elements)
                            //text:
        //$type: "com.linkedin.pemberly.text.AttributedText"
        //text: "Sfax, Tunisie"
                            let returnElements = []
                            tempElements.data.elements.forEach((element:any) => {
                                returnElements.push(element.text.text)
                            });
                            console.log("returnElements",returnElements)
                            console.log("returnElements",JSON.stringify(returnElements))
        
                            return returnElements
                        })
                    
                  );
              

  }
}