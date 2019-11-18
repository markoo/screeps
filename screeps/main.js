var roleHarvester = require('role.harvester');
var roleRemoteHarvester = require('role.remoteHarvester');
var roleMiner = require('role.miner');
var roleUpgrader = require('role.upgrader');
var roleRemoteUpgrader = require('role.remoteUpgrader');
var roleBuilder = require('role.builder');
var roleTransferer = require('role.transfer');
var roleMegaTransferer = require('role.megaTransfer');
var roleDefender = require('role.defender');
var roleClaimer = require('role.claimer');
var towerDefense = require('tower.defense');
var roleInvader = require('role.invader');
require('./constants');

var ticksToLiveSt = 1500;
var ticksToLiveMa = 1500;
var ticksToLiveAl = 1500;
var ticksToLiveTh = 1500;
var ticksToLiveMi = 1500;
var ticksToLiveJo = 1500;
var ticksToLiveEl = 1500;
var ticksToLiveFi = 1500;
var creepNameSt = '';
var creepNameMa = '';
var creepNameAl = '';
var creepNameTh = '';
var creepNameMi = '';
var creepNameJo = '';
var creepNameEl = '';
var creepNameFi = '';

module.exports.loop = function () {
    var miner;
    var links = Game.rooms['W43N3'].find(FIND_MY_STRUCTURES, {
        filter: {
            structureType: STRUCTURE_LINK
        }
    });
    if (links[1].energy == links[1].energyCapacity && links[0].energy == 0) {
        links[1].transferEnergy(links[0]);
    }
    links = Game.rooms['W43N2'].find(FIND_MY_STRUCTURES, {
        filter: {
            structureType: STRUCTURE_LINK
        }
    });
    if (links[0].energy > 100 && links[1].energy < links[1].energyCapacity) {
        links[0].transferEnergy(links[1]);
    }
    if (links[2].energy > 100 && links[0].energy < links[0].energyCapacity) {
        links[2].transferEnergy(links[0]);
    }
    links = Game.rooms['W43N1'].find(FIND_MY_STRUCTURES, {
        filter: {
            structureType: STRUCTURE_LINK
        }
    });
    if (links[1].energy > 100 && links[0].energy < links[0].energyCapacity) {
        links[1].transferEnergy(links[0]);
    }
    if (links[2].energy > 100 && links[0].energy < links[0].energyCapacity) {
        links[2].transferEnergy(links[0]);
    }

    var containers = Game.rooms['W43N1'].find(FIND_STRUCTURES, {
        filter: {
            structureType: STRUCTURE_CONTAINER
        }
    });
    // if container not full
    if (containers.length > 0 && containers[0].store[RESOURCE_ENERGY] < 2000) {
        links[0].transferEnergy(links[3]);
    }

    links = Game.rooms['W44N3'].find(FIND_MY_STRUCTURES, {
        filter: {
            structureType: STRUCTURE_LINK
        }
    });
    if (links[0].energy > 100 && links[1].energy < links[1].energyCapacity) {
        links[0].transferEnergy(links[1]);
    }

    links = Game.rooms['W39S1'].find(FIND_MY_STRUCTURES, {
        filter: {
            structureType: STRUCTURE_LINK
        }
    });
    if (links[1].energy > 100 && links[0].energy < links[0].energyCapacity) {
        links[1].transferEnergy(links[0]);
    }
    if (links[2].energy > 100 && links[0].energy < links[0].energyCapacity) {
        links[2].transferEnergy(links[0]);
    }
    if (links[0].energy > 100 && links[3].energy < links[3].energyCapacity) {
        links[0].transferEnergy(links[3]);
    }

    links = Game.rooms['W39S3'].find(FIND_MY_STRUCTURES, {
        filter: {
            structureType: STRUCTURE_LINK
        }
    });
    if (links[0].energy > 100 && links[1].energy < links[1].energyCapacity) {
        links[0].transferEnergy(links[1]);
    }

    links = Game.rooms['W39S2'].find(FIND_MY_STRUCTURES, {
        filter: {
            structureType: STRUCTURE_LINK
        }
    });
    if (links[1].energy > 100 && links[0].energy < 777) {
        links[1].transferEnergy(links[0]);
    } else if (links[1].energy > 100 && links[3].energy < 777) {
        links[1].transferEnergy(links[3]);
    }
    if (links[2].energy > 100 && links[3].energy < 777) {
        links[2].transferEnergy(links[3]);
    }

    links = Game.rooms['W41S6'].find(FIND_MY_STRUCTURES, {
        filter: {
            structureType: STRUCTURE_LINK
        }
    });
    if (links.length > 1 && (links[0].energy > 100 && links[1].energy < links[1].energyCapacity)) {
        links[0].transferEnergy(links[1]);
    }
    if (links.length > 1 && (links[2].energy > 100 && links[3].energy < links[3].energyCapacity)) {
        links[2].transferEnergy(links[3]);
    }

    links = Game.rooms['W41S7'].find(FIND_MY_STRUCTURES, {
        filter: {
            structureType: STRUCTURE_LINK
        }
    });
    if (links.length > 1 && (links[0].energy > 100 && links[1].energy < links[1].energyCapacity)) {
        links[0].transferEnergy(links[1]);
    }
    if (links.length > 2 && (links[2].energy > 100 && links[1].energy < links[1].energyCapacity)) {
        links[2].transferEnergy(links[1]);
    }

    links = Game.rooms['W44N2'].find(FIND_MY_STRUCTURES, {
        filter: {
            structureType: STRUCTURE_LINK
        }
    });
    if (links.length > 1 && (links[0].energy > 100 && links[1].energy < links[1].energyCapacity)) {
        links[0].transferEnergy(links[1]);
    }

    towerDefense.defense('W43N3', 'Markopolis');
    towerDefense.defense('W43N2', 'Stevenopolis');
    towerDefense.defense('W43N1', 'Alanopolis');
    towerDefense.defense('W44N3', 'Thomasopolis');
    towerDefense.defense('W39S1', 'Michaelopolis');
    towerDefense.defense('W39S3', 'Josephineopolis');
    towerDefense.defense('W39S2', 'Eliseopolis');
    towerDefense.defense('W41S6', 'Fionaopolis');
    towerDefense.defense('W41S7', 'Camillaopolis');
    towerDefense.defense('W44N2', 'Meinkeopolis');

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    for (const i in Game.spawns) {
        spawnCreep(i, 'Harvester', HARVESTERS_DESIRED, HARVESTERS_BODY);
        spawnCreep(i, 'Upgrader', UPGRADERS_DESIRED, UPGRADERS_BODY);
        spawnCreep(i, 'Builder', BUILDERS_DESIRED, BUILDERS_BODY);
        spawnCreep(i, 'Invader', INVADERS_DESIRED, INVADERS_BODY);

        spawnMarkTwoCreep(i, 'Miner', getDesiredMiners(i), MINERS_BODY);
        spawnMarkTwoCreep(i, 'Defender', DEFENDERS_DESIRED[Game.spawns[i].name], DEFENDERS_BODY);
        spawnMarkTwoCreep(i, 'Transferer', TRANSFERERS_DESIRED[Game.spawns[i].name], TRANSFERERS_BODY);

        spawnRemoteCreep(i, 'RemoteHarvester', REMOTE_HARVESTERS_DESIRED, REMOTE_HARVESTERS_BODY);
        spawnRemoteCreep(i, 'MegaUpgrader', MEGA_UPGRADERS_DESIRED, MEGA_UPGRADERS_BODY);
        spawnRemoteCreep(i, 'RemoteUpgrader', REMOTE_UPGRADERS_DESIRED, REMOTE_UPGRADERS_BODY);
        spawnRemoteCreep(i, 'Claimer', CLAIMERS_DESIRED, CLAIMERS_BODY);
        spawnRemoteCreep(i, 'MegaTransferer', MEGA_TRANSFERERS_DESIRED, MEGA_TRANSFERERS_BODY);

        spawnNotification(i);
        spawnEmergencyTransferer(i);
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role.toLowerCase().indexOf('harvester') > -1) {
            setTicksToLiveAndCreepRole(creep);
            roleHarvester.run(creep);
        }
        if (creep.memory.role.toLowerCase().indexOf('builder') > -1) {
            setTicksToLiveAndCreepRole(creep);
            roleBuilder.run(creep);
        }
        if (creep.memory.role.toLowerCase().indexOf('upgrader') > -1) {
            setTicksToLiveAndCreepRole(creep);
            creep.say('U');
            roleUpgrader.run(creep);
        }
        if (creep.memory.role.toLowerCase().indexOf('transferer') > -1) {
            setTicksToLiveAndCreepRole(creep);
            creep.say('T');
            roleTransferer.run(creep);
        }
        if (creep.memory.role.toLowerCase().indexOf('defender') > -1) {
            setTicksToLiveAndCreepRole(creep);
            creep.say('D');
            roleDefender.run(creep);
        }
        if (creep.memory.role.toLowerCase().indexOf('miner') > -1) {
            setTicksToLiveAndCreepRole(creep);
            creep.say('M');
            roleMiner.run(creep);
        }
        if (creep.memory.role.toLowerCase().indexOf('claimer') > -1) {
            setTicksToLiveAndCreepRole(creep);
            creep.say('C');
            roleClaimer.run(creep);
        }
        if (creep.memory.role.toLowerCase().indexOf('remoteupgrader') > -1) {
            setTicksToLiveAndCreepRole(creep);
            creep.say('RU');
            roleRemoteUpgrader.run(creep);
        }

        if (creep.memory.role == 'AlanopolisInvader') {
            if (creep.memory.role.toLowerCase().indexOf('alan') > -1) {
                if (creep.ticksToLive < ticksToLiveAl) {
                    ticksToLiveAl = creep.ticksToLive;
                    creepNameAl = creep.memory.role;
                }
                roleInvader.run(creep);
            }
        }
        if (creep.memory.role == 'MarkopolisMegaTransferer' || creep.memory.role == 'StevenopolisMegaTransferer' || creep.memory.role == 'AlanopolisMegaTransferer' || creep.memory.role == 'ThomasopolisMegaTransferer') {
            if (creep.memory.role.toLowerCase().indexOf('steven') > -1) {
                if (creep.ticksToLive < ticksToLiveSt) {
                    ticksToLiveSt = creep.ticksToLive;
                    creepNameSt = creep.memory.role;
                }
            } else if (creep.memory.role.toLowerCase().indexOf('mark') > -1) {
                if (creep.ticksToLive < ticksToLiveMa) {
                    ticksToLiveMa = creep.ticksToLive;
                    creepNameMa = creep.memory.role;
                }
            } else if (creep.memory.role.toLowerCase().indexOf('alan') > -1) {
                if (creep.ticksToLive < ticksToLiveAl) {
                    ticksToLiveAl = creep.ticksToLive;
                    creepNameAl = creep.memory.role;
                }
            } else if (creep.memory.role.toLowerCase().indexOf('thomas') > -1) {
                if (creep.ticksToLive < ticksToLiveTh) {
                    ticksToLiveTh = creep.ticksToLive;
                    creepNameTh = creep.memory.role;
                }
            }
            roleMegaTransferer.run(creep);
        }
        if (creep.memory.role == 'MarkopolisRemoteHarvester' || creep.memory.role == 'StevenopolisRemoteHarvester') {
            if (creep.memory.role.toLowerCase().indexOf('steven') > -1) {
                if (creep.ticksToLive < ticksToLiveSt) {
                    ticksToLiveSt = creep.ticksToLive;
                    creepNameSt = creep.memory.role;
                }
            } else {
                if (creep.ticksToLive < ticksToLiveMa) {
                    ticksToLiveMa = creep.ticksToLive;
                    creepNameMa = creep.memory.role;
                }
            }
            roleRemoteHarvester.run(creep);
        }
        if (creep.memory.role == 'remoteBuilder') {
            if (creep.ticksToLive < ticksToLiveMa) {
                ticksToLiveMa = creep.ticksToLive;
                creepNameMa = 'remote builder';
            }
            if (creep.room.name != 'W43N1') {
                var posInAnotherRoom = new RoomPosition(26, 11, 'W43N1');
                creep.moveTo(posInAnotherRoom);
            } else {
                //if(!creep.memory.idle){
                roleBuilder.run(creep);
                //}else{
                //    console.log('builder is idle, so harvesting...');
                //    roleHarvester.run(creep);
                //}
            }
        }
    }
    /**
    console.log('Ticks to live Markopolis  : ' + ticksToLiveMa + ', ' + creepNameMa);
    console.log('Ticks to live Stevenopolis: ' + ticksToLiveSt + ', ' + creepNameSt);
    console.log('Ticks to live Alanopolis  : ' + ticksToLiveAl + ', ' + creepNameAl);
    console.log('Ticks to live Thomasopolis  : ' + ticksToLiveTh + ', ' + creepNameTh);
    console.log('Ticks to live Michaelopolis  : ' + ticksToLiveMi + ', ' + creepNameMi);
    console.log('Ticks to live Josephineopolis  : ' + ticksToLiveJo + ', ' + creepNameJo);
    console.log('Ticks to live Eliseopolis  : ' + ticksToLiveEl + ', ' + creepNameEl);
    console.log('Ticks to live Fionaopolis  : ' + ticksToLiveFi + ', ' + creepNameFi);
    **/
    /**
    towers = Game.rooms['W44N1'].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    if(Game.rooms['W44N1'].controller.level==3 && towers.length < 1){
        Game.spawns['Thomasopolis'].room.createConstructionSite( 38, 36, STRUCTURE_TOWER );
        Game.notify('Building new tower');
    }
    
    towers = Game.rooms['W44N1'].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    if(Game.rooms['W44N1'].controller.level==5 && towers.length < 2){
        Game.spawns['Thomasopolis'].room.createConstructionSite( 36, 5, STRUCTURE_TOWER );
    }
    **/
    // PUT energy in Terminal 1
    /**
    if (miner && 0 == _.sum(miner.carry) && miner.withdraw(storage1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        miner.say('Get $$$');
        miner.moveTo(storage1);
    } else if(miner && miner.carryCapacity >= _.sum(miner.carry) && (miner.transfer(terminal1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE || miner.transfer(terminal1, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE)) {
        miner.say('Dump $$$');
        miner.moveTo(terminal1);
    }
    // PUT energy in Terminal 2
    if (miner && 0 == _.sum(miner.carry) && miner.withdraw(storage1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        miner.say('Get $$$');
        miner.moveTo(storage1);
    } else if(miner && miner.carryCapacity >= _.sum(miner.carry) && (miner.transfer(terminal2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE || miner.transfer(terminal2, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE)) {
        miner.say('Dump $$$');
        miner.moveTo(terminal2);
    }
    // PUT energy in Terminal 3
    if (miner && 0 == _.sum(miner.carry) && miner.withdraw(storage1, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        miner.say('Get $$$');
        miner.moveTo(storage1);
    } else if(miner && miner.carryCapacity >= _.sum(miner.carry) && (miner.transfer(terminal3, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE || miner.transfer(terminal3, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE)) {
        miner.say('Dump $$$');
        miner.moveTo(terminal3, { visualizePathStyle: { stroke: '#ffffff' } });
    }
    **/
    if (Game.time % 5 == 0) {
        // Send O to W43N3
        Game.rooms['W44N3'].terminal.send(RESOURCE_OXYGEN, 5000, 'W43N3', 'trade contract #1');
        //Game.rooms['W43N3'].terminal.send(RESOURCE_OXYGEN, 5000, 'W43N2', 'trade contract #1');
        // Send H to W43N3
        //Game.rooms['W43N2'].terminal.send(RESOURCE_HYDROGEN, 5000, 'W43N3', 'trade contract #1');
        // Send H to W43N2
        //Game.rooms['W43N2'].terminal.send(RESOURCE_HYDROGEN, 5000, 'W43N2', 'trade contract #1');
        // Send OH to W43N1
        Game.rooms['W43N3'].terminal.send(RESOURCE_HYDROXIDE, 5000, 'W43N1', 'trade contract #1');
        // Send L to W43N2
        Game.rooms['W43N1'].terminal.send(RESOURCE_LEMERGIUM, 5000, 'W43N2', 'trade contract #1');
        // Send LO to W43N1
        Game.rooms['W43N2'].terminal.send(RESOURCE_LEMERGIUM_OXIDE, 5000, 'W43N1', 'trade contract #1');
        // Send LO to W43N1
        //Game.rooms['W43N1'].terminal.send(RESOURCE_LEMERGIUM_OXIDE, 3500, 'W44N3', 'trade contract #1');
    }
    // if (Game.time % 5 == 0) {
    //     var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_LEMERGIUM &&
    //         order.type == ORDER_BUY &&
    //         Game.market.calcTransactionCost(100, 'W43N2', order.roomName) < 1000);

    //     console.log('L buy orders found: ', orders.length);
    //     orders.sort(function (a, b) {
    //         return a.price - b.price
    //     });
    //     orders.forEach(order => {
    //         console.log('L buy orders: ' + order.price + ", " + order.remainingAmount + ", " + Game.market.calcTransactionCost(1000, 'W43N2', order.roomName));
    //     });
    //     if (orders.length > 0) {
    //         console.log('Best price: ', orders[0].price);
    //         console.log('Best price: ', orders[orders.length - 1].price);
    //         var result = Game.market.deal(orders[orders.length - 1].id, 1000, 'W43N2');
    //         console.log('result: ', result);
    //         if (result == 0) {
    //             console.log('Order completed successfully');
    //         }
    //     }
    // }
    if (Game.time % 5 == 0) {
        var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_LEMERGIUM_ALKALIDE &&
            order.type == ORDER_BUY &&
            Game.market.calcTransactionCost(100, 'W43N1', order.roomName) < 1000);

        //console.log('LHO2 buy orders found: ', orders.length);
        orders.sort(function (a, b) {
            return a.price - b.price
        });
        orders.forEach(order => {
            //console.log('LHO2 buy orders: ' + order.price + ", " + order.remainingAmount + ", " + Game.market.calcTransactionCost(1000, 'W43N1', order.roomName));
        });
        if (orders.length > 0) {
            //console.log('Best price: ', orders[0].price);
            //console.log('Best price: ', orders[orders.length - 1].price);
            var result = Game.market.deal(orders[orders.length - 1].id, 1000, 'W43N1');
            //console.log('result: ', result);
            if (result == 0) {
                //console.log('Order completed successfully');
            }
        }
    }
    if (Game.time % 5 == 0) {
        var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_LEMERGIUM_OXIDE &&
            order.type == ORDER_BUY &&
            Game.market.calcTransactionCost(100, 'W43N1', order.roomName) < 1000);

        //console.log('LO buy orders found: ', orders.length);
        orders.sort(function (a, b) {
            return a.price - b.price
        });
        orders.forEach(order => {
            //console.log('LO buy orders: ' + order.price + ", " + order.remainingAmount + ", " + Game.market.calcTransactionCost(1000, 'W43N1', order.roomName));
        });
        if (orders.length > 0) {
            //console.log('Best price: ', orders[0].price);
            //console.log('Best price: ', orders[orders.length - 1].price);
            var result = Game.market.deal(orders[orders.length - 1].id, 1000, 'W43N1');
            //console.log('result: ', result);
            if (result == 0) {
                //console.log('Order completed successfully');
            }
        }
    }
    if(Game.getObjectById('5982fc38b097071b4adbd086').level === 4 && !Game.spawns['Camillaopolis'].memory.storageConstructionSiteCreated){
        Game.spawns['Camillaopolis'].room.createConstructionSite( 28, 17, STRUCTURE_ROAD );
        Game.spawns['Camillaopolis'].room.createConstructionSite( 27, 16, STRUCTURE_STORAGE );
        Game.spawns['Camillaopolis'].memory.storageConstructionSiteCreated = true;
    }
}

function spawnCreep(i, creepType, CREEPS_DESIRED, CREEP_BODY) {
    var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == Game.spawns[i].name + creepType);
    if (creeps.length < CREEPS_DESIRED[Game.spawns[i].name]) {
        var newName = Game.spawns[i].name + creepType + Game.time;
        /*console.log('Spawning new ' + Game.spawns[i].name + ' ' + creepType + ': ' + newName);*/
        if (Game.spawns[i].name === 'Stevenopolis') {
            Game.spawns['Steventwopolis'].spawnCreep(CREEP_BODY[Game.spawns[i].name], newName, {
                memory: {
                    role: Game.spawns[i].name + creepType
                }
            });
        }
        else {
            Game.spawns[Game.spawns[i].name].spawnCreep(CREEP_BODY[Game.spawns[i].name], newName, {
                memory: {
                    role: Game.spawns[i].name + creepType
                }
            });
        }
    }
}

function spawnMarkTwoCreep(i, creepType, creepsDesired, CREEP_BODY) {
    var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == Game.spawns[i].name + creepType);
    if (creeps && creeps.length < creepsDesired) {
        var newName = Game.spawns[i].name + creepType + Game.time;
        /*console.log('Spawning new ' + Game.spawns[i].name + ' ' + creepType + ': ' + newName);*/
        if (Game.spawns[i].name === 'Markopolis') {
            Game.spawns['Marktwopolis'].spawnCreep(CREEP_BODY[Game.spawns[i].name], newName, {
                memory: {
                    role: Game.spawns[i].name + creepType
                }
            });
        } else if (Game.spawns[i].name === 'Stevenopolis') {
            Game.spawns['Steventwopolis'].spawnCreep(CREEP_BODY[Game.spawns[i].name], newName, {
                memory: {
                    role: Game.spawns[i].name + creepType
                }
            });
        } else if (Game.spawns[i].name === 'Alanopolis') {
            Game.spawns['Alantwopolis'].spawnCreep(CREEP_BODY[Game.spawns[i].name], newName, {
                memory: {
                    role: Game.spawns[i].name + creepType
                }
            });
        } else {
            Game.spawns[Game.spawns[i].name].spawnCreep(CREEP_BODY[Game.spawns[i].name], newName, {
                memory: {
                    role: Game.spawns[i].name + creepType
                }
            });
        }
    }
}

function spawnRemoteCreep(i, creepType, CREEPS_DESIRED, CREEP_BODY) {
    var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == Game.spawns[i].name + creepType);
    if (creeps.length < CREEPS_DESIRED[Game.spawns[i].name]) {
        var newName = Game.spawns[i].name + creepType + Game.time;
        /*console.log('Spawning new ' + Game.spawns[i].name + ' ' + creepType + ': ' + newName);*/
        Game.spawns[Game.spawns[i].name].spawnCreep(CREEP_BODY[Game.spawns[i].name], newName, {
            memory: {
                role: Game.spawns[i].name + creepType
            }
        });
    }
}

function spawnNotification(i) {
    if (Game.spawns[i].spawning) {
        var spawningCreep = Game.creeps[Game.spawns[i].spawning.name];
        Game.spawns[i].room.visual.text(
            '.' + spawningCreep.memory.role,
            Game.spawns[i].pos.x + 1,
            Game.spawns[i].pos.y, {
                align: 'left',
                opacity: 0.8
            });
    }
}

function spawnEmergencyTransferer(i) {
    if (Game.rooms[Game.spawns[Game.spawns[i].name].room.name].find(FIND_MY_CREEPS).length < 3) {
        var newName = Game.spawns[i].name + 'Transfer' + Game.time;
        Game.spawns[Game.spawns[i].name].spawnCreep(EMERGENCY_TRANSFERERS_BODY[Game.spawns[i].name], newName, {
            memory: {
                role: Game.spawns[i].name + 'Transferer'
            }
        });
        Game.notify('Something is rotten in ' + Game.spawns[i].name);
    }
}

function setTicksToLiveAndCreepRole(creep) {
    if (creep.memory.role.toLowerCase().indexOf('steven') > -1) {
        if (creep.ticksToLive < ticksToLiveSt) {
            ticksToLiveSt = creep.ticksToLive;
            creepNameSt = creep.memory.role;
        }
    } else if (creep.memory.role.toLowerCase().indexOf('mark') > -1) {
        if (creep.ticksToLive < ticksToLiveMa) {
            ticksToLiveMa = creep.ticksToLive;
            creepNameMa = creep.memory.role;
        }
    } else if (creep.memory.role.toLowerCase().indexOf('alan') > -1) {
        if (creep.ticksToLive < ticksToLiveAl) {
            ticksToLiveAl = creep.ticksToLive;
            creepNameAl = creep.memory.role;
        }
    } else if (creep.memory.role.toLowerCase().indexOf('thomas') > -1) {
        if (creep.ticksToLive < ticksToLiveTh) {
            ticksToLiveTh = creep.ticksToLive;
            creepNameTh = creep.memory.role;
        }
    } else if (creep.memory.role.toLowerCase().indexOf('michael') > -1) {
        if (creep.ticksToLive < ticksToLiveMi) {
            ticksToLiveMi = creep.ticksToLive;
            creepNameMi = creep.memory.role;
        }
    } else if (creep.memory.role.toLowerCase().indexOf('josephine') > -1) {
        if (creep.ticksToLive < ticksToLiveJo) {
            ticksToLiveJo = creep.ticksToLive;
            creepNameJo = creep.memory.role;
        }
    } else if (creep.memory.role.toLowerCase().indexOf('elise') > -1) {
        if (creep.ticksToLive < ticksToLiveEl) {
            ticksToLiveEl = creep.ticksToLive;
            creepNameEl = creep.memory.role;
        }
    } else if (creep.memory.role.toLowerCase().indexOf('fiona') > -1) {
        if (creep.ticksToLive < ticksToLiveFi) {
            ticksToLiveFi = creep.ticksToLive;
            creepNameFi = creep.memory.role;
        }
    }
}

function getDesiredMiners(i) {
    if (Game.spawns[i].name === 'Eliseopolis' || Game.spawns[i].name === 'Josephineopolis' || Game.spawns[i].name === 'Michaelopolis') {
        return 0;
    }
    return 0;
    var desiredMiners = 0;
    if (Game.spawns[i].name === 'Markopolis' || Game.spawns[i].name === 'Stevenopolis') {
        return 2;
    }
    if (Game.spawns[i].name === 'Alanopolis') {
        return 1;
    }
    if (Game.spawns[i].name === 'Thomasopolis') {
        var target;
        var mineralId = Game.spawns[Game.spawns[i].name].memory.mineralId;
        if (mineralId) {
            target = Game.getObjectById(mineralId);
        } else {
            var targets = Game.spawns[Game.spawns[i].name].room.find(FIND_MINERALS);
            target = targets[0];
            Game.spawns[Game.spawns[i].name].memory.mineralId = target.id;
            Game.spawns[Game.spawns[i].name].memory.mineralType = target.mineralType;
        }
        if (target.mineralAmount > 0) {
            desiredMiners = 1;
        }
    }
    return desiredMiners;
}