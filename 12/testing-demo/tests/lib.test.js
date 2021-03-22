const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute', () => {
    it('should return a positive number if the input is a positive number.', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it('should return a positive number if the input is a negative number.', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('should return 0 if the input is 0.', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should return the greeting message.', () => {
        const result = lib.greet('Or');
        //expect(result).toMatch(/Or/);
        expect(result).toContain('Or');
    });
});

describe('getCurrencies', () => {
    it('should return supported currencies.', () => {
        const result = lib.getCurrencies();

        // Too general.
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // Too specific.
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('AUD');
        expect(result[2]).toBe('EUR');
        expect(result.length).toBe(3);

        // Proper way.
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');

        // Ideal way.
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));

    });
});

describe('getProduct', () => {
    it('should return the product with the given Id.', () => {
        const result = lib.getProduct(1);
        //expect(result).toEqual({ id: 1, price: 10 });
        expect(result).toMatchObject({ id: 1, price: 10 });
        //expect(result).toHaveProperty('id', '1');
    });
});

describe('registerUser', () => {
    it('should throw if username is falsy.', () => {
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach((cur) => {
            expect(() => {
                lib.registerUser(cur);
            }).toThrow();
        });
    });

    it('should return a user object if valid username is pass.', () => {
        const result = lib.registerUser('Or');
        expect(result).toMatchObject({ username: 'Or' });
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('applyDiscount', () => {
    it('should apply 10% discount if the customer has more than 10 points.', () => {
        db.getCustomerSync = (customerId) => {
            console.log('Fake reading customer...');
            return { id: customerId, points: 20 };
        };

        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

describe('notifyCustomer', () => {
    it('should send an email to the customer.', () => {

        //const mockFunction = jest.fn();
        //mockFunction.mockReturnValue(1);
        //mockFunction.mockResolvedValue(1);
        //mockFunction.mockRejectedValue(new Error(''));
        //const result = await mockFunction();


        /*         db.getCustomerSync = (customerId) => {
                    console.log('Fake reading customer...');
                    return { email: 'a' };
                };

                let mailSent = false;
                mail.send = (email, message) => {
                    mailSent = true;
                };

                lib.notifyCustomer({ customerId: 1 });
                expect(mailSent).toBe(true); */

        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' });
        mail.send = jest.fn();

        lib.notifyCustomer({ customerId: 1 });

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});