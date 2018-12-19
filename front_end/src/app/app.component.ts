import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
              <div class="main-container"> 
                <nav></nav><router-outlet></router-outlet>
              </div>
            `
            ,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
}
