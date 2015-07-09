# ec2-auto-cname

## Usage example

* Install [nodejs](https://nodejs.org/) for your platform
* Clone or download the repository
* Run ```npm install``` inside the repository directory 

Now to bind your instance to resourceName run the following command from the repository directory

```
node index.js --domain something.ru. --key AAAAAAAAAAAAA  --secret BBBBBBBBBBBBBBBBBBBBB --region eu-west-1 --resourceName name.something.ru
```

## Useful links

* Assign computer startup scripts on windows - (https://technet.microsoft.com/en-us/library/cc770556.aspx)
* Run local group policy editor on windows - (https://technet.microsoft.com/en-us/library/cc731745.aspx)
