interface Sender {
    username: string;
    photo: string;
}

export interface MessageInterface {
    sender: Sender;
    message: string;
}
