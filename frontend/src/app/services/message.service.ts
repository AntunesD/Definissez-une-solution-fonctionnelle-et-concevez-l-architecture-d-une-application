import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { Message, MessageRequest, ApiResponse } from "../models/message.model"

@Injectable({
  providedIn: "root",
})
export class MessageService {
  private apiUrl = "http://localhost:8080/api/messages"

  constructor(private http: HttpClient) { }

  getAllMessages(): Observable<ApiResponse<Message[]>> {
    return this.http.get<ApiResponse<Message[]>>(this.apiUrl)
  }

  createMessage(request: MessageRequest): Observable<ApiResponse<Message>> {
    return this.http.post<ApiResponse<Message>>(this.apiUrl, request)
  }
}
