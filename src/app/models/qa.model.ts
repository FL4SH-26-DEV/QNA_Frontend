export interface AskRequest {
  context: string;
  question: string;
}

export interface AskResponse {
  answer: string;
  timestamp: string;
}

export interface QAHistoryItem {
  question: string;
  answer: string;
  timestamp: Date;
}
