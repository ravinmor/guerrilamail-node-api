import {
    CheckEmailInterface,
    DelEmailInterface,
    EmailInterface,
    EmailListInterface,
    ErrorInterface,
    FetchEmailType,
    GenericEmailDataInterface,
    OlderListInterface,
    SetUserInterface
} from "./interfaces/Interfaces";

declare module 'guerrillamail-node-api' {
    export class GuerrillamailNodeApi {
        private url: string;
        private params: {
            ip: string;
            agent: string;
            lang: string;
        }

        public email_address: string;
        public email_user: string;
        public email_timestamp: number | undefined;
        public email_creation: string;
        public email_expiration: string;
        public alias: string;
        public sid_token: string;
        public alias_error: string;
        public site_id: number | undefined;
        public site: string;
        public inbox: FetchEmailType[] | [];
        public count: number | undefined;
        public users: number | undefined;
        public deleted_ids: string[];
        public inboxDsc: FetchEmailType[] | [];

        get_email_address(): Promise<EmailInterface>;
        set_email_user(email_user: string): Promise<SetUserInterface | ErrorInterface>;
        check_email(sequency: number): Promise<CheckEmailInterface | ErrorInterface>;
        get_email_list(sequency: string, limit: number): Promise<EmailListInterface | ErrorInterface>;
        fetch_email(email_id: number): Promise<FetchEmailType | ErrorInterface>;
        forget_me(): Promise<boolean | ErrorInterface>;
        del_email(email_ids: number[]): Promise<DelEmailInterface | ErrorInterface>;
        get_older_list(sequency: string, limit: number): Promise<OlderListInterface | ErrorInterface>;
        remaining_time(id: string): Promise<number | ErrorInterface>;
        updateProperties(emailData: GenericEmailDataInterface): Promise<void>;
        eraseProperties(): Promise<void>;
        randomAgent(): string;
        randomIp(): string;
        convertTimestampToLocaleDate(timestamp: number): string;
        getEmailExpiration(timestamp: number): string;
        addMore60minutesToExpiration(date: string): Promise<string>;
    }
}