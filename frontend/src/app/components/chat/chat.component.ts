import {
  Component,
  type OnInit,
  type OnDestroy,
  ViewChild,
  type ElementRef,
  type AfterViewChecked,
} from "@angular/core"
import { MessageService } from "../../services/message.service"
import { WebSocketService } from "../../services/websocket.service"
import type { Message, MessageRequest } from "../../models/message.model"
import type { Subscription } from "rxjs"

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild("messagesContainer") private messagesContainer!: ElementRef

  messages: Message[] = []
  newMessage = ""
  userRole: "client" | "agent" = "client"
  isConnected = false

  private subscriptions: Subscription[] = []

  constructor(
    private messageService: MessageService,
    private webSocketService: WebSocketService,
  ) { }

  ngOnInit(): void {
    this.loadMessages()
    this.connectWebSocket()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe())
    this.webSocketService.disconnect()
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom()
  }

  private loadMessages(): void {
    const sub = this.messageService.getAllMessages().subscribe({
      next: (response) => {
        if (response.success) {
          this.messages = response.data || []
        }
      },
      error: (error) => {
        console.error("Erreur lors du chargement des messages:", error)
      },
    })
    this.subscriptions.push(sub)
  }

  private connectWebSocket(): void {
    this.webSocketService.connect()

    const messageSub = this.webSocketService.getMessages().subscribe({
      next: (message) => {
        if (message) {
          this.messages.push(message)
        }
      },
    })

    const connectionSub = this.webSocketService.getConnectionStatus().subscribe({
      next: (status) => {
        this.isConnected = status
      },
    })

    this.subscriptions.push(messageSub, connectionSub)
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || !this.isConnected) return

    const request: MessageRequest = {
      sender: this.userRole,
      content: this.newMessage.trim(),
    }

    const sub = this.messageService.createMessage(request).subscribe({
      next: (response) => {
        if (response.success) {
          this.newMessage = ""
        }
      },
      error: (error) => {
        console.error("Erreur lors de l'envoi du message:", error)
      },
    })

    this.subscriptions.push(sub)
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      this.sendMessage()
    }
  }

  setUserRole(role: "client" | "agent"): void {
    this.userRole = role
  }

  formatTime(timestamp: string): string {
    return new Date(timestamp).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight
    } catch (err) { }
  }
}
