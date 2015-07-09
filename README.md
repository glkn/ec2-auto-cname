# ec2-auto-cname

## Usage example

* Clone or download the repository
* Run ```npm install``` inside the repository directory 

Now to bind your instance to resourceName run the following command from the repository directory

```
node index.js --domain something.ru. --key AAAAAAAAAAAAA  --secret BBBBBBBBBBBBBBBBBBBBB --region eu-west-1 --publicDNS ec2-54-78-182-82.eu-west-1.compute.amazonaws.com --resourceName name.something.ru
```
