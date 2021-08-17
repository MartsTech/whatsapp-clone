export interface Chat {
  id: string;
  users: string[];
}

export interface ChatRecipient {
  email: string;
  displayName?: string;
  photoURL?: string;
}
