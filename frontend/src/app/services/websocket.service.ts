import { Injectable } from "@angular/core"
import { Client, type Message as StompMessage } from "@stomp/stompjs"
import { BehaviorSubject, type Observable } from "rxjs"
import type { Message } from "../models/message.model"
import * as SockJS from "sockjs-client"

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  private client: Client
  private messageSubject = new BehaviorSubject<Message | null>(null)
  private connectionSubject = new BehaviorSubject<boolean>(false)

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      connectHeaders: {},
      debug: (str) => console.log("STOMP: " + str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    })

    this.client.onConnect = () => {
      console.log("Connecté au WebSocket")
      this.connectionSubject.next(true)

      this.client.subscribe("/topic/messages", (message: StompMessage) => {
        const newMessage: Message = JSON.parse(message.body)
        this.messageSubject.next(newMessage)
      })
    }

    this.client.onDisconnect = () => {
      console.log("Déconnecté du WebSocket")
      this.connectionSubject.next(false)
    }

    this.client.onStompError = (frame) => {
      console.error("Erreur STOMP:", frame)
      this.connectionSubject.next(false)
    }
  }

  connect(): void {
    this.client.activate()
  }

  disconnect(): void {
    this.client.deactivate()
  }

  getMessages(): Observable<Message | null> {
    return this.messageSubject.asObservable()
  }

  getConnectionStatus(): Observable<boolean> {
    return this.connectionSubject.asObservable()
  }
}
