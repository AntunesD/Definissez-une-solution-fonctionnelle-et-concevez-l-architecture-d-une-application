export interface Message {
  id: number
  sender: "client" | "agent"
  content: string
  timestamp: string
}

export interface MessageRequest {
  sender: "client" | "agent"
  content: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}
