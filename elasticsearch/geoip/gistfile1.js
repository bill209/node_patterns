/**
 * First download CSV GeoLite Database here:
 * http://geolite.maxmind.com/download/geoip/database/GeoLiteCity_CSV/GeoLiteCity-latest.zip
 **/

var lazy = require("lazy"),
            fs  = require("fs");
var elasticsearch = require('elasticsearch');
    esearch = new elasticsearch.Client( {host: 'localhost:9200',keepAlive: true, log: 'error', requestTimeout: 6000, maxSockets:100, deadTimeout: 6000});
    elasticsearch.Client.apis['master'].ping.spec.requestTimeout = 6000;



        console.log('Start importing GEOIPs...this will certainly take some time...');


      //Delete entries for the next run
        esearch.deleteByQuery({
            index: 'geoip',
            q: '*'
        }, function (error, response) {
            console.log(error,response);
        });

        var location = {};
        var iprange = [];

        function doTrim(string){
            if(string)
                return string.replace(/['"]+/g, '');
        }

        function doNumber(string){
            if(string)
                return parseInt(string.replace(/['"]+/g, ''),10);
        }

        new lazy(fs.createReadStream(__dirname+'/GeoLiteCity-Location.csv'))
            .lines
            .forEach(function(line){
                var loc = line.toString().split(",");
                var obj = {};

                var id = parseInt(loc[0],10);
                obj.id = id;
                obj.country = doTrim(loc[1]);
                obj.region = doTrim(loc[2]);
                obj.city = doTrim(loc[3]);
                obj.postalCode = loc[4];
                obj.latitude = loc[5];
                obj.longitude = loc[6];
                obj.metroCode = loc[7];
                obj.areaCode = loc[8];

                location[id] = obj;

            }).join(function (xs) {
                console.log('Added '+Object.keys(location).length+ 'into memory');
                var l = 0;
                var batch = [];
                // As locations are in memory we can go through IP blocks and extend info with locations.
                new lazy(fs.createReadStream(__dirname+'/GeoLiteCity-Blocks.csv'))
                    .lines
                    .forEach(function(line){
                        l++;

                        var loc = line.toString().split(",");
                        var obj = {};
                        var id = doNumber(loc[2],10);
                        obj.id = doNumber(loc[0],10);
                        obj.startIpNum = doNumber(loc[0],10);
                        obj.endIpNum = doNumber(loc[1],10);
                        obj.location = location[id];

                        iprange.push(obj);

                      /*
                      Do bulk import? Not right now...lets do single inserts...
                      if(l%100 === 0){
                            console.log(l);
                            esearch.bulk(iprange, function( err, response  ){
                                if( err ){
                                    trace.info("Failed Bulk operation", err)
                                } else {
                                    trace.info("Successfull Twitter update: %s tweets", data.length);
                                }
                            });
                            iprange=[];
                        }*/




                    }
                ).join(function (xs) {

                        var len = iprange.length;
                        console.log(iprange.length, ' IPs added, start indexing!' +  len + ' items');

                        function doItem(i){
                            var doc = {};
                            process.stdout.write("Doing " + i + "\r");

                            doc.index = "geoip";
                            doc.type = "location";
                            doc.body = iprange[i];

                            esearch.index(doc, function (err, resp) {
                                if(err)
                                    trace.info(err);
                                i++;

                                if(i < len) {
                                    doItem(i);
                                }
                            });
                        }

                        doItem(1);

                    });
            });
