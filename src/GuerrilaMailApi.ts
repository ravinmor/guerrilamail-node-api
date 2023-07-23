import axios from "axios"

import {
    GMCheckEmailInterface,
    GMDelEmailInterface,
    GMEmailInterface,
    GMEmailListInterface,
    GMErrorInterface,
    GMFetchEmailInterface,
    GMGenericEmailDataInterface,
    GMOlderListInterface,
    GMSetUserInterface,
    GuerrillaMailOptionsInterface
} from "./interfaces/ApiResponse";

class GuerrilaMailApi {
    private url: string;
    private params: {
        ip: string;
        agent: string;
        lang: string;
    }

    public email_address: string = "";
    public email_user: string = "";
    public email_timestamp: number | undefined = undefined;
    public email_creation: string = "";
    public email_expiration: string = "";
    public alias: string = "";
    public sid_token: string = "";
    public alias_error: string = "";
    public site_id: number | undefined = undefined;
    public site: string = "";
    public inbox: GMFetchEmailInterface[] | [] = [];
	public count: number | undefined = undefined;
	public users: number | undefined = undefined;
    public deleted_ids: string[] = [];
    public inboxDsc: GMFetchEmailInterface[] | [] = [];

    constructor(private options: GuerrillaMailOptionsInterface = {}) { 
        this.url = `http://api.guerrillamail.com/ajax.php?`;
        this.params = {
            ip: options.ip || this.randomIp(),
            agent: options.agent || this.randomAgent(),
            lang: options.lang || "en"
        }
    }

    public async get_email_address(): Promise<GMEmailInterface> {
        const params = {
            ... this.params,
            f: 'get_email_address'
        };

        const emailData = await axios.get(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
            });

        await this.updateProperties(emailData);

        return emailData;
    }

    public async set_email_user(email_user = this.email_user): Promise<GMSetUserInterface | GMErrorInterface> {
        if(!this.sid_token || this.sid_token === "") {
            return { status: 403, message: "No Session Token found. Please, provide one" }
        }

        const params = {
            ... this.params,
            f: 'set_email_user',
            sid_token: this.sid_token,
            email_user: email_user,
        };

        const emailData = await axios.get(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
            });

        await this.updateProperties(emailData);
        if(email_user == this.email_user) 
            this.email_expiration = await this.addMore60minutesToExpiration(this.email_expiration)
         
        return emailData;
    }

    public async check_email(sequency = 1): Promise<GMCheckEmailInterface | GMErrorInterface> {
        if(!this.sid_token || this.sid_token === "") {
            return { status: 403, message: "No Session Token found. Please, provide one" }
        }

        const params = {
            ... this.params,
            f: 'check_email',
            seq: sequency,
            sid_token: this.sid_token,
        };

        const emailData = await axios.get(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
            });
        
        if(emailData.error) {
            return { status: 403, message: emailData.error }
        }

        await this.updateProperties(emailData);

        return emailData;
    }

    public async get_email_list(sequency = "", limit = 20): Promise<GMEmailListInterface | GMErrorInterface> {
        if(!this.sid_token || this.sid_token === "") {
            return { status: 403, message: "No Session Token found. Please, provide one" }
        }

        const params = {
            ... this.params,
            f: 'get_email_list',
            seq: sequency,
            offset: limit,
            sid_token: this.sid_token,
        };

        const emailData = await axios.get(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
            });

        if(!emailData.email) {
            return { status: 403, message: "No Email Found." }
        }

        await this.updateProperties(emailData);

        return emailData;
    }

    public async fetch_email(email_id: number): Promise<GMFetchEmailInterface | GMErrorInterface>  {
        if(!this.sid_token || this.sid_token === "") {
            return { status: 403, message: "No Session Token found. Please, provide one" }
        }

        const params = {
            ... this.params,
            f: 'fetch_email',
            sid_token: this.sid_token,
            email_id: email_id
        };

        const emailData = await axios.get(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
            });

        return emailData;
    }

    public async forget_me(): Promise<boolean | GMErrorInterface>  {
        if(!this.sid_token || this.sid_token === "") {
            return { status: 403, message: "No Session Token found. Please, provide one" }
        }
        if(!this.email_address || this.email_address === "") {
            return { status: 403, message: "No Email Address found. Please, provide one" }
        }

        const params = {
            ... this.params,
            f: 'forget_me',
            sid_token: this.sid_token,
            email_addr: this.email_address
        };

        const emailData = await axios.delete(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
            });


        await this.eraseProperties()

        return emailData;
    }

    public async del_email(email_ids: number[]): Promise<GMDelEmailInterface | GMErrorInterface>  {
        if(!this.sid_token || this.sid_token === "") {
            return { status: 403, message: "No Session Token found. Please, provide one" }
        }

        const params = {
            ... this.params,
            f: 'del_email',
            sid_token: this.sid_token,
            email_ids: email_ids
        };

        const emailData = await axios.delete(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err);
            });

        await this.get_email_list();
        await this.updateProperties(emailData);

        return emailData;
    }

    public async get_older_list(sequency = "", limit = 20): Promise<GMOlderListInterface | GMErrorInterface>  {
        if(!this.sid_token || this.sid_token === "") {
            return { status: 403, message: "No Session Token found. Please, provide one" }
        }

        const params = {
            ... this.params,
            f: 'get_older_list',
            sid_token: this.sid_token,
            seq: sequency,
            limit: limit
        };

        const emailData = await axios.get(this.url, { params })
            .then(result => result.data)
            .catch(err => {
                throw new Error(err); 
            });

        if(!emailData.email) {
            return { status: 403, message: "No Email Found." }
        }

        await this.updateProperties({
            ...emailData,
            inboxDsc: emailData.list 
        });

        return emailData;
    }

    public async remaining_time(): Promise<number | GMErrorInterface> {
        if(!this.email_creation) {
            return { status: 403, message: "No Session Started. Please, start a session." }
        }
        if(!this.email_expiration) {
            return { status: 403, message: "No Session Started. Please, start a session." }
        }
        const creationDate   = new Date(this.email_creation);
        const expirationDate = new Date(this.email_expiration);
        
        const timeDifferenceInMilliseconds = expirationDate.getTime() - creationDate.getTime();

        return timeDifferenceInMilliseconds / (1000 * 60);
    }

    private async updateProperties(emailData: GMGenericEmailDataInterface): Promise<void> {
        this.email_address     = emailData.email_addr ? emailData.email_addr : this.email_address;
        this.email_user        = emailData.email_addr ? emailData.email_addr.split('@')[0] : this.email_user;
        this.email_timestamp   = emailData.email_timestamp ? emailData.email_timestamp : this.email_timestamp;
        this.email_creation    = emailData.email_timestamp ? this.convertTimestampToLocaleDate(emailData.email_timestamp) : this.email_creation;
        this.email_expiration  = emailData.email_timestamp ? this.getEmailExpiration(emailData.email_timestamp) : this.email_expiration;
        this.alias             = emailData.alias ? emailData.alias : this.alias;
        this.sid_token         = emailData.sid_token ? emailData.sid_token : this.sid_token;
        this.site_id           = emailData.site_id ? emailData.site_id : this.site_id;
        this.site              = emailData.site ? emailData.site : this.site;
        this.inbox             = !emailData.inboxDsc && emailData.list ? emailData.list : this.inbox;
        this.count             = emailData.count ? emailData.count : this.count;
        this.users             = emailData.users ? emailData.users : this.users;
        this.deleted_ids       = emailData.deleted_ids ? emailData.deleted_ids : this.deleted_ids;
        this.inboxDsc          = emailData.inboxDsc ? emailData.inboxDsc : this.inboxDsc;
    }
    
    private async eraseProperties(): Promise<void> {
        this.email_address    = "";
        this.email_user       = "";
        this.email_timestamp  = undefined;
        this.email_creation   = "";
        this.email_expiration = ""
        this.email_creation   = ""
        this.alias            = "";
        this.sid_token        = "";
        this.alias_error      = "";
        this.site_id          = undefined;
        this.site             = "";
        this.inbox            = [];
        this.count            = undefined;
        this.users            = undefined;
        this.deleted_ids      = [];
        this.inboxDsc         = [];
    }

    private randomAgent(): string {
        return "Mozilla_foo_bar"
    }

    private randomIp(): string {
        return "127.0.0.1"
    }

    private convertTimestampToLocaleDate(timestamp: number): string {
        return new Date(timestamp * 1000).toISOString();
    }

    private getEmailExpiration(timestamp: number): string {
        return new Date((timestamp + 18 * 60) * 1000).toISOString();
    }

    private async addMore60minutesToExpiration(date: string): Promise<string> {
        const dateObject = new Date(date);
        dateObject.setMinutes(dateObject.getMinutes() + 60);

        return dateObject.toISOString();
    }
}

export default GuerrilaMailApi;