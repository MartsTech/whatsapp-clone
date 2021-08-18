export interface Chat {
  id: string;
  users: string[];
  lastActive: any;
}

export interface ChatRecipient {
  email: string;
  photoURL?: string;
  lastSeen?: any;
}

export interface ChatMessage {
  id: string;
  message: string;
  user: string;
  timestamp: any;
}
