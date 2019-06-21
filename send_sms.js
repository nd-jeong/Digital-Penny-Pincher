const accountSid = 'AC08de3993c50968dd38871a606fbdea36';
const authToken = 'da231c7d667d3a08c986aa53855d63d3';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+16467591403',
     to: '+19174467909'
     
   })
  .then(message => console.log(message.sid));

//   https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages.json

client = Client('AC08de3993c50968dd38871a606fbdea36', 'da231c7d667d3a08c986aa53855d63d3')

notifiy = client.notify.services('IS09127a03b16330de60d578e19aa7eaad')

binding = notify.bindings.create(identity='Ted', address='+19174467909', binding_type='sms', tag='preferred')

notification = notify.notifications.create(identity='Ted', body='You just hit 50% of your maximum budget limit!')