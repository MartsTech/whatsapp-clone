export interface Chat {
  id: string;
  users: string[];
}

export interface ChatRecipient {
  email: string;
  photoURL?: string;
  lastSeen?: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  user: string;
  timestamp: any;
}
