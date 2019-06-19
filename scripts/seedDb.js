const {User, 
        // CreditCard, 
        Transaction} = require('../models/index');

const main = async () => {
    await User.destroy({
        where: {}
    });

    // await CreditCard.destroy({
    //     where: {}
    // });

    await Transaction.destroy({
        where: {}
    });

    const andy = await User.create({
        name: "Andy Jeong",
        email: "andyj@fakemail.com",
        phoneNumber: "000-000-0000",
        limit: 1000
    });

    const candice = await User.create({
        name: "Candice Agard",
        email: "candice@fakemail.com",
        phoneNumber: "111-111-1111",
        limit: 10000
    });

    const ted = await User.create({
        name: "Ted Schwartz",
        email: "tedschwartz@fakemail.com",
        phoneNumber: "222-222-2222",
        limit: 19000
    });

    // const creditCardOne = await CreditCard.create({
    //     number: "0000-0000-0000-0000",
    //     expiration: "09/24",
    //     ccv: "000",
    //     balance: 100,
    //     limit: 1000
    // });

    // const creditCardTwo = await CreditCard.create({
    //     number: "1111-1111-1111-1111",
    //     expiration: "02/25",
    //     ccv: "635",
    //     balance: 150,
    //     limit: 500
    // });

    // const creditCardThree = await CreditCard.create({
    //     number: "0101-0101-0101-0101",
    //     expiration: "01/20",
    //     ccv: "001",
    //     balance: 267,
    //     limit: 550
    // });

    // const creditCardFour = await CreditCard.create({
    //     number: "0202-0192-3836-2836",
    //     expiration: "11/23",
    //     ccv: "980",
    //     balance: 0,
    //     limit: 0
    // });

    const andyTransactionOne = await Transaction.create({
        amount: 2.99,
        type: "personal",
        date: "06/02/2019",
        time: "12:00"
    });

    const andyTransactionTwo = await Transaction.create({
        amount: 5.99,
        type: "personal",
        date: "06/06/2019",
        time: "15:014"
    });

    const andyTransactionThree = await Transaction.create({
        amount: 10.99,
        type: "personal", 
        date: "06/15/2019",
        time: "09:00"
    });

    const andyTransactionFour = await Transaction.create({
        amount: 17.89,
        date: "06/16/2019",
        time: "17:00",
        type: "personal" 
    });

    const candiceTransactionOne = await Transaction.create({
        amount: 4.99,
        type: "personal",
        date: "06/01/2019",
        time: "11:00"
    });

    const candiceTransactionTwo = await Transaction.create({
        amount: 3.99,
        type: "personal",
        date: "06/08/2019",
        time: "10:45",
    });

    const candiceTransactionThree = await Transaction.create({
        amount: 8.99,
        type: "personal",
        date: "06/12/2019",
        time: "15:30"
    });

    const tedTransactionOne = await Transaction.create({
        amount: 12.99,
        type: "personal",
        date: "06/03/2019",
        time: "10:05"
    });

    const tedTransactionTwo = await Transaction.create({
        amount: 6.84,
        type: "personal",
        date: "06/04/2019",
        time: "16:25"
    });

    const tedTransactionThree = await Transaction.create({
        amount: 25.99,
        type: "business",
        date: "06/08/2019",
        time: "15:48"
    });

    const tedTransactionFour = await Transaction.create({
        amount: 13.65,
        type: "personal",
        date: "06/10/2019",
        time: "12:05"
    });

    const tedTransactionFive = await Transaction.create({
        amount: 36.37,
        type: "business",
        date: "06/12/2019",
        time: "12:45" 
    });

    const tedTransactionSix = await Transaction.create({
        amount: 12.99,
        type: "personal", 
        date: "06/15/2019",
        time: "16:38"
    });

    // await creditCardOne.setUser(andy);
    // await creditCardTwo.setUser(candice);
    // await creditCardThree.setUser(ted);
    // await creditCardFour.setUser(ted);

    // await andyTransactionOne.setCreditCard(creditCardOne);
    // await andyTransactionTwo.setCreditCard(creditCardOne);
    // await andyTransactionThree.setCreditCard(creditCardOne);
    // await andyTransactionFour.setCreditCard(creditCardOne);

    // await candiceTransactionOne.setCreditCard(creditCardTwo);
    // await candiceTransactionTwo.setCreditCard(creditCardTwo);
    // await candiceTransactionThree.setCreditCard(creditCardTwo);

    // await tedTransactionOne.setCreditCard(creditCardThree);
    // await tedTransactionTwo.setCreditCard(creditCardThree);
    // await tedTransactionThree.setCreditCard(creditCardFour);
    // await tedTransactionFour.setCreditCard(creditCardThree);
    // await tedTransactionFive.setCreditCard(creditCardFour);
    // await tedTransactionSix.setCreditCard(creditCardThree);

    await andyTransactionOne.setUser(andy);
    await andyTransactionTwo.setUser(andy);
    await andyTransactionThree.setUser(andy);
    await andyTransactionFour.setUser(andy);

    await candiceTransactionOne.setUser(candice);
    await candiceTransactionTwo.setUser(candice);
    await candiceTransactionThree.setUser(candice);

    await tedTransactionOne.setUser(ted);
    await tedTransactionTwo.setUser(ted);
    await tedTransactionThree.setUser(ted);
    await tedTransactionFour.setUser(ted);
    await tedTransactionFive.setUser(ted);
    await tedTransactionSix.setUser(ted);

    process.exit();
};

main();