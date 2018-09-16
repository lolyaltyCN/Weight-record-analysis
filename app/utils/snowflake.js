/**
 * User: Kurten
 * Date: 14-3-1
 * Time: 11:24
 * Version: 1.0
 * Description:
 */
var sequence = 0;
var twepoch = 1288834974657;
var workerIdBits = 5;
var dataCenterIdBits = 5;
var maxWrokerId = -1 ^ (-1 << workerIdBits);
var maxDataCenterId = -1 ^ (-1 << dataCenterIdBits);
var sequenceBits = 12;
var workerIdShift = sequenceBits;
var dataCenterIdShift = sequenceBits + workerIdBits;
var timestampLeftShift = sequenceBits + workerIdBits + dataCenterIdBits;
var sequenceMask = -1 ^ (-1 << sequenceBits);
var lastTimestamp = -1;
var BigInteger = require("./jsbn");

function Snowflake(options){
    if(options != undefined){
        if (options.workerId > maxWrokerId || options.workerId < 0) {
            throw new Error('config.worker_id must max than 0 and small than maxWrokerId-[' + maxWrokerId + ']');
        }
        if (options.dataCenterId > maxDataCenterId || options.dataCenterId < 0) {
            throw new Error('config.data_center_id must max than 0 and small than maxDataCenterId-[' + maxDataCenterId + ']');
        }
        this.workerId = options.workerId;
        this.dataCenterId = options.dataCenterId;
    }
}

Snowflake.prototype.nextId = function () {
    var timestamp = timeGen();
    if (timestamp < lastTimestamp) {
        throw new Error('Clock moved backwards. Refusing to generate id for ' + (lastTimestamp - timestamp));
    }
    if (lastTimestamp == timestamp) {
        sequence = (sequence + 1) & sequenceMask;
        if (sequence == 0) {
            timestamp = tilNextMillis(lastTimestamp);
        }
    } else {
        sequence = 0;
    }
    lastTimestamp = timestamp;
    var shiftNum = (this.dataCenterId << dataCenterIdShift) | (this.workerId << workerIdShift) | sequence;
    var nfirst = new BigInteger(String(timestamp - twepoch), 10);
    nfirst = nfirst.shiftLeft(timestampLeftShift);
    var nnextId = nfirst.or(new BigInteger(String(shiftNum), 10));
    var nextId = nnextId.toRadix(10);
    return String(nextId);
};
Snowflake.GetListId = function (num) {
    var id = [];
    for (var i = 0; i < num; i++) {
        id[i] = new Snowflake({"workerId": 1, "dataCenterId": 1});
    }
    var arr = [];
    for (var i = 0; i < id.length; i++) {
        arr.push(id[i].nextId());
    }
    return arr;
};

Snowflake.GetOneId = function () {
    return new Snowflake({"workerId": 1, "dataCenterId": 1}).nextId();
};

function tilNextMillis(lastTimestamp) {
    var timestamp = timeGen();
    while (timestamp <= lastTimestamp) {
        timestamp = timeGen();
    }
    return timestamp;
}

function timeGen() {
    var dt = new Date();
    return dt.getTime();
}

module.exports = Snowflake;