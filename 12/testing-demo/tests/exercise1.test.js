const exercise1 = require('../exercise1.js');

describe('fizzBuzz', () => {
    it('should throw an exception if the input is not a number.', () => {
        expect(() => {
            exercise1.fizzBuzz('Hello');
            exercise1.fizzBuzz(null);
            exercise1.fizzBuzz(undefined);
            exercise1.fizzBuzz({});
        }).toThrow();
    });

    it('should return "FizzBuzz" if the input number is modulo by 3 and 5.', () => {
        const result = exercise1.fizzBuzz(15);
        expect(result).toBe("FizzBuzz");
    });

    it('should return "Fizz" if the input number is modulo by 3 only.', () => {
        const result = exercise1.fizzBuzz(3);
        expect(result).toBe("Fizz");
    });

    it('should return "Buzz" if the input number is modulo by 5 only.', () => {
        const result = exercise1.fizzBuzz(5);
        expect(result).toBe("Buzz");
    });

    it('should return the input if is a number that not modulo 3 or 5.', () => {
        const result = exercise1.fizzBuzz(1);
        expect(result).toBe(1);
    });
});