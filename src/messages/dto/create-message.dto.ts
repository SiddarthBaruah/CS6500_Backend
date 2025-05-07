export class CreateMessageDto {
    sender: string;
    receiver: string;
    signedMessage: Record<string, any>;
}
