var aws = require('aws-sdk'),
    route53,
    _ = require('lodash'),
    request = require('request'),
    argv = require('minimist')(process.argv.slice(2));

aws.config.update({
    accessKeyId: argv.key,
    secretAccessKey: argv.secret,
    region: argv.region
});

if (!argv.publicHostName) {
    request('http://169.254.169.254/latest/meta-data/public-hostname', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('Public hostname:', body);
            argv.publicHostName = body;
            changeRecord();
        } else {
            console.log(error);
        }
    });
} else {
    changeRecord();
}

function changeRecord() {
    route53 = new aws.Route53();

    route53.listHostedZones({}, function(err, data) {
        if (!err) {
            var domain = _.find(data.HostedZones, {
                Name: argv.domain
            });
            if (!domain) {
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
                                "Value": argv.publicHostName
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
}
