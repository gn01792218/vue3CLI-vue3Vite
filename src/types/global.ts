export interface chatMsg{
    content:string,
    textColor:string,
}
export interface chatContent{
    table:string,
    chatMsgArr:chatMsg[],
}
export enum tableName{
    'A',
    'B',
    'VIP',
}