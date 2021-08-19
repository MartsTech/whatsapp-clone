export interface Chat {
  id: string;
  users: string[];
  unseenMessages: [{ user: string; count: number }];
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
