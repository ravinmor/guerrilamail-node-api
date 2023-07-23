import GuerrilaMailService from '../../src/GuerrilaMailApi'

describe('Request Guerrillamail Api data', () => {
    it('request Guerrillamail Api', async () => {
        const fakeMail = new GuerrilaMailService()

        fakeMail.get_email_address();
        console.log(fakeMail);

        expect(2 + 2).toEqual(4)
    })
})