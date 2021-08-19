export interface Chat {
  id: string;
  users: string[];
  lastActive: Date;
}

export interface ChatRecipient {
  email: string;
  photoURL?: string;
  lastSeen?: Date;
}

export interface ChatMessage {
  id: string;
  message: string;
  user: string;
  timestamp: Date;
}
