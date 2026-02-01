export interface Message {
    id: number;
    subject: string;
    text: string;
    date: string; 
}

export interface CreateMessageRequest {
    subject: string;
    text: string;
}