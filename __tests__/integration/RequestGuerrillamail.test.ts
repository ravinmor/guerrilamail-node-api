import GuerrilaMailService from '../../src/GuerrilaMailApi'

jest.setTimeout(10000)
describe('Request Guerrillamail Api data', () => {
    it('request Guerrillamail Api to get an email address', async () => {
        const fakeMail = new GuerrilaMailService()

        await fakeMail.get_email_address();

        expect(fakeMail).toHaveProperty('email_address');
    })

    it('request Guerrillamail Api to set user', async () => {
        const fakeMail = new GuerrilaMailService()

        await fakeMail.get_email_address();
        await fakeMail.set_email_user();

        expect(fakeMail).toHaveProperty('site_id', 1);
    })

    it('request Guerrillamail Api to check email', async () => {
        const fakeMail = new GuerrilaMailService()

        await fakeMail.get_email_address();
        await fakeMail.check_email();

        expect(fakeMail).toHaveProperty('email_address');
    })

    it('request Guerrillamail Api to get the inbox', async () => {
        const fakeMail = new GuerrilaMailService()

        await fakeMail.get_email_address();
        await fakeMail.get_email_list();

        expect(fakeMail.inbox[0]).toHaveProperty('mail_id', 1);
    })

    it('request Guerrillamail Api to fetch an specfic email in the inbox', async () => {
        const fakeMail = new GuerrilaMailService()

        await fakeMail.get_email_address();
        await fakeMail.get_email_list();
        const email = await fakeMail.fetch_email(fakeMail.inbox[0].mail_id);

        expect(email).toHaveProperty('mail_id', 1)
    })

    it('request Guerrillamail Api to delete the temporary email', async () => {
        const fakeMail = new GuerrilaMailService()

        await fakeMail.get_email_address();
        await fakeMail.forget_me();

        expect(fakeMail).toHaveProperty('email_address', "")
    })

    it('request Guerrillamail Api to delete an especific email in the inbox', async () => {
        const fakeMail = new GuerrilaMailService()

        await fakeMail.get_email_address();
        await fakeMail.get_email_list();
        await fakeMail.del_email([fakeMail.inbox[0].mail_id]);

        expect(fakeMail.inbox).toEqual([])
    })

    it('request Guerrillamail Api to get the inbox in descent list', async () => {
        const fakeMail = new GuerrilaMailService()

        await fakeMail.get_email_address();
        await fakeMail.get_older_list();

        expect(fakeMail.inboxDsc[0]).toHaveProperty('mail_id', 1);
    })

    it('request Guerrillamail Api to calculate the ramaining time of the temporary account', async () => {
        const fakeMail = new GuerrilaMailService()

        await fakeMail.get_email_address();
        const remaining_time = await fakeMail.remaining_time();

        expect(remaining_time).toEqual(18)
    })
})