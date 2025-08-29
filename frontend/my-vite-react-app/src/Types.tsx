export type message_t = {
    content: string;
    sender: {id: number};
    recipient: {id: number};
    timestamp: string;
};

export type user_t = {
    id: number;
    username: string;
    friends: Array<number>;
    onlineStatus: boolean;
    passwrd?: string;
    displayName?: string;
};