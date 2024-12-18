// PayPal Strategy
class PayPalPayment {
    pay(amount) {
        console.log(`Paying $${amount} using PayPal.`);
    }
}

// Credit Card Strategy
class CreditCardPayment {
    pay(amount) {
        console.log(`Paying $${amount} using Credit Card.`);
    }
}

// Bank Transfer Strategy
class BankTransferPayment {
    pay(amount) {
        console.log(`Paying $${amount} using Bank Transfer.`);
    }
}


class PaymentContext {
    constructor(strategy) {
        this.strategy = strategy; // Set the strategy dynamically
    }

    setStrategy(strategy) {
        this.strategy = strategy; // Allow changing the strategy at runtime
    }

    processPayment(amount) {
        this.strategy.pay(amount); // Delegate the work to the strategy
    }
}

// // Import the strategies
// const PayPalPayment = new (require('./PayPalPayment'))();
// const CreditCardPayment = new (require('./CreditCardPayment'))();
// const BankTransferPayment = new (require('./BankTransferPayment'))();

// Create the context
const paymentContext = new PaymentContext();

// Example 1: Pay using PayPal
paymentContext.setStrategy(new PayPalPayment());
paymentContext.processPayment(100);

// Example 2: Pay using Credit Card
paymentContext.setStrategy(new CreditCardPayment());
paymentContext.processPayment(200);

// Example 3: Pay using Bank Transfer
paymentContext.setStrategy(new BankTransferPayment());
paymentContext.processPayment(300);