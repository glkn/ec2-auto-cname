var aws = require('aws-sdk'),
    route53,
    _ = require('lodash'),
    argv = require('minimist')(process.argv.slice(2));

aws.config.update({
    accessKeyId: argv.key,
    secretAccessKey: argv.secret,
    region: argv.region
});

route53 = new aws.Route53();

route53.listHostedZones({}, function(err, data) {
    if (!err) {
        var domain = _.find(data.HostedZones, {
            Name: argv.domain
        });
        if ( !domain ) {
            console.log('Domain not found:', argv.domain);
            return;
        }
        var params = {
            "HostedZoneId": domain.Id,
            "ChangeBatch": {
                "Changes": [{
                    "Action": "UPSERT",
                    "ResourceRecordSet": {
                        "Name": argv.resourceName,
                        "Type": "CNAME",
                        "TTL": 60,
                        "ResourceRecords": [{
                            "Value": argv.publicDNS
                        }]
                    }
                }]
            }
        };

        route53.changeResourceRecordSets(params, function(err, data) {
            console.log(err, data);
        });
    } else {
        console.error(err);
    }
});
