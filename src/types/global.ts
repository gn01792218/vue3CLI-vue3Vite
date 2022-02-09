interface chatMsh{
    content:string,
    textColor:string,
}
export interface chatContent{
    table:string,
    chatMsgArr:chatMsh[],
}
export enum tableName{
    'A',
    'B',
    'VIP',
}