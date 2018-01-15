import {Component} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import {Observable} from 'rxjs/Observable';
import {pluck} from 'rxjs/operators/pluck';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  node1$: Observable<any>;

  node1Query = {
    query: gql`
    		query {
      nodeById(id:"1", language:en){
        title,
        ... on NodePage {
          body {
            value
          } 
        }
      }
     }
    `
  };

  workshopsViewQuery = {
    query: gql`
      query {
     workshops{
      results {
        ... on NodeWorkshop {
          title
          body {
            value
            format
            processed
            summary
            summaryProcessed
          }
          fieldCoverImage {
            large:derivative(style:large){
              url
              height
              width
            },
             medium:derivative(style:medium){
              url
              height
              width
            }
            targetId
            alt
            title
          }
        }
      }
    	}
     }
      `
  };

  constructor(apollo: Apollo) {

    apollo.query(this.workshopsViewQuery).subscribe(console.log);


    this.node1$ = apollo.query(this.node1Query)
      .pipe(
        pluck('data'),
        pluck('nodeById')
      );

  }
}
