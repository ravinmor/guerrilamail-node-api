export interface GuerrillaMailOptionsInterface {
    ip?: string;
    agent?: string;
    lang?: string;
}

export interface GMEmailInterface {
    email_addr: string;
    email_user: string;
	email_timestamp: number;
	alias: string;
	sid_token: string;
}

export interface GMGenericEmailDataInterface {
    email_addr?: string;
    email_user?: string;
    email_timestamp?: number | undefined;
    email_creation?: string;
    email_expiration?: string;
    alias?: string;
    sid_token?: string;
    alias_error?: string;
    site_id?: number | undefined;
    site?: string;
    list?: GMFetchEmailInterface[] | [];
	count?: number | undefined;
	users?: number | undefined;
    deleted_ids?: string[];
    inboxDsc?: GMFetchEmailInterface[] | [];
}

export interface GMSetUserInterface {
    alias_error: string;
	alias: string;
    email_addr: string;
	email_timestamp: number;
	sid_token: string;
	site_id: number;
	site: string;

    auth: AuthResponseInterface;
}

export interface GMCheckEmailInterface {
    list: GMFetchEmailInterface[] | [];
    email: string;
	alias: string;
	ts: number;
	sid_token: string;
	count: number;
	users: number;
	stats: StatsResponseInterface;
    auth: AuthResponseInterface;
}

export interface GMEmailListInterface {
    list: GMFetchEmailInterface[] | [];
	count: number;
    email: string;
	alias: string;
	ts: number;
	sid_token: string;
	stats: StatsResponseInterface;
    auth: AuthResponseInterface;
}

export interface GMFetchEmailInterface {
    mail_from: string;
    mail_timestamp: number;
    mail_read: number;
    mail_date: string;
    reply_to: string;
    mail_subject: string;
    mail_excerpt: string;
    mail_id: number;
    att: number;
    content_type: string;
    mail_recipient: string;
    source_id: number;
    source_mail_id: number;
    mail_body: string;
    size: number;
}

export interface GMDelEmailInterface {
    deleted_ids: string[];
    auth: AuthResponseInterface;
}

export interface GMOlderListInterface {
    list: GMFetchEmailInterface[] | [];
	count: number;
    email: string;
	alias: string;
	ts: number;
	sid_token: string;
    auth: AuthResponseInterface;
}

export interface GMErrorInterface {
    message: string;
    status: number;
}

interface AuthResponseInterface {
    success: boolean;
    error_codes: string[]
}

interface StatsResponseInterface {
    sequence_mail: string;
    created_addresses: number;
    received_emails: string;
    total: string;
    total_per_hour: string;
}