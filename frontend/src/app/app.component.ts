import { Component } from "@angular/core"

@Component({
  selector: "app-root",
  template: `
    <div class="app-container">
      <app-chat></app-chat>
    </div>
  `,
  styles: [
    `
    .app-container {
      min-height: 100vh;
      background-color: #f5f5f5;
      padding: 16px;
    }
  `,
  ],
})
export class AppComponent {
  title = "Chat PoC - Angular"
}
