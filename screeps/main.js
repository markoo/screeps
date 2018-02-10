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
require('./constants');

module.exports.loop = function () {
    var links = Game.rooms['W43N3'].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
    if(links[1].energy == links[1].energyCapacity && links[0].energy == 0){
        links[1].transferEnergy(links[0]);
    }
    links = Game.rooms['W43N2'].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
    if(links[0].energy > 100 && links[1].energy < links[1].energyCapacity){
        links[0].transferEnergy(links[1]);
    }
    if(links[2].energy > 100 && links[0].energy < links[0].energyCapacity){
        links[2].transferEnergy(links[0]);
    }
    links = Game.rooms['W43N1'].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
    if(links[1].energy > 100 && links[0].energy < links[0].energyCapacity){
        links[1].transferEnergy(links[0]);
    }

    towerDefense.defense('W43N3', 'Markopolis');
    towerDefense.defense('W43N2', 'Stevenopolis');
    towerDefense.defense('W43N1', 'Alanopolis');

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    for(const i in Game.spawns) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == Game.spawns[i].name+'Harvester');
        if(harvesters.length < HARVESTERS_DESIRED[Game.spawns[i].name]) {
            var newName = Game.spawns[i].name+'Harvester' + Game.time;
            console.log('Spawning new '+Game.spawns[i].name+' Harvester: ' + newName);
            if(Game.spawns[i].name==='Markopolis' && Game.spawns[Game.spawns[i].name].spawnCreep(HARVESTERS_BODY[Game.spawns[i].name], newName, {memory: {role: Game.spawns[i].name+'Harvester'}}) == ERR_BUSY) {
                Game.spawns['Marktwopolis'].spawnCreep(HARVESTERS_BODY[Game.spawns[i].name], newName, {memory: {role: Game.spawns[i].name+'Harvester'}});
            }else{
                Game.spawns[Game.spawns[i].name].spawnCreep(HARVESTERS_BODY[Game.spawns[i].name], newName, {memory: {role: Game.spawns[i].name+'Harvester'}})
            }
        }

        var remoteHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == Game.spawns[i].name+'RemoteHarvester');
        if(remoteHarvesters.length < REMOTE_HARVESTERS_DESIRED[Game.spawns[i].name]) {
            var newName = Game.spawns[i].name+'RemoteHarvester' + Game.time;
            console.log('Spawning new '+Game.spawns[i].name+' RemoteHarvester: ' + newName);
            Game.spawns[Game.spawns[i].name].spawnCreep(REMOTE_HARVESTERS_BODY[Game.spawns[i].name], newName, {memory: {role: Game.spawns[i].name+'RemoteHarvester'}});
        }

        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == Game.spawns[i].name+'Miner');
        if(miners.length < MINERS_DESIRED[Game.spawns[i].name]) {
            var newName = Game.spawns[i].name+'Miner' + Game.time;
            console.log('Spawning new ' + Game.spawns[i].name+' Miner: ' + newName);
            Game.spawns[Game.spawns[i].name].spawnCreep(MINERS_BODY[Game.spawns[i].name], newName, {memory: {role: Game.spawns[i].name+'Miner'}});
        }

        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == Game.spawns[i].name+'Upgrader');
        if(upgraders.length < UPGRADERS_DESIRED[Game.spawns[i].name]) {
            var newName = Game.spawns[i].name+'Upgrader' + Game.time;
            console.log('Spawning new '+Game.spawns[i].name+' Upgrader: ' + newName);
            Game.spawns[Game.spawns[i].name].spawnCreep(UPGRADERS_BODY[Game.spawns[i].name], newName, {memory: {role: Game.spawns[i].name+'Upgrader'}});
        }

        var megaUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role == Game.spawns[i].name+'MegaUpgrader');
        if(megaUpgraders.length < MEGA_UPGRADERS_DESIRED[Game.spawns[i].name]) {
            var newName = Game.spawns[i].name+'MegaUpgrader' + Game.time;
            console.log('Spawning new '+Game.spawns[i].name+' MegaUpgrader: ' + newName);
            Game.spawns[Game.spawns[i].name].spawnCreep(MEGA_UPGRADERS_BODY[Game.spawns[i].name], newName, {memory: {role: Game.spawns[i].name+'MegaUpgrader'}});
        }

        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == Game.spawns[i].name+'Builder');
        if(builders.length < BUILDERS_DESIRED[Game.spawns[i].name]) {
            var newName = Game.spawns[i].name+'Builder' + Game.time;
            console.log('Spawning new '+Game.spawns[i].name+' Builder: ' + newName);
            Game.spawns[Game.spawns[i].name].spawnCreep(BUILDERS_BODY[Game.spawns[i].name], newName, {memory: {role: Game.spawns[i].name+'Builder'}});
        }

        var remoteUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role == Game.spawns[i].name+'RemoteUpgrader');
        if(remoteUpgraders.length < REMOTE_UPGRADERS_DESIRED[Game.spawns[i].name]) {
            var newName = Game.spawns[i].name+'RemoteUpgrader' + Game.time;
            console.log('Spawning new '+Game.spawns[i].name+' RemoteUpgrader: ' + newName);
            Game.spawns[Game.spawns[i].name].spawnCreep(REMOTE_UPGRADERS_BODY[Game.spawns[i].name], newName, {memory: {role: Game.spawns[i].name+'RemoteUpgrader'}});
        }

        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == Game.spawns[i].name+'Defender');
        if(defenders.length < DEFENDERS_DESIRED[Game.spawns[i].name]) {
            var newName = Game.spawns[i].name+'Defender' + Game.time;
            console.log('Spawning new '+Game.spawns[i].name+'Defender: ' + newName);
            Game.spawns[Game.spawns[i].name].spawnCreep(DEFENDERS_BODY[Game.spawns[i].name], newName, {memory: {role: Game.spawns[i].name+'Defender'}});
        }

        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == Game.spawns[i].name+'Claimer');
        if(claimers.length < CLAIMERS_DESIRED[Game.spawns[i].name]) {
            var newName = Game.spawns[i].name+'Claimer' + Game.time;
            console.log('Spawning new '+Game.spawns[i].name+'Claimer: ' + newName);
            Game.spawns[Game.spawns[i].name].spawnCreep(CLAIMERS_BODY[Game.spawns[i].name], newName, {memory: {role: Game.spawns[i].name+'Claimer'}});
        }
        
        var transferer = _.filter(Game.creeps, (creep) => creep.memory.role == Game.spawns[i].name+'Transferer');
        if(transferer.length < TRANSFERERS_DESIRED[Game.spawns[i].name]) {
            var newName = Game.spawns[i].name+'Transfer' + Game.time;
            console.log('Spawning new '+Game.spawns[i].name+'Transferer: ' + newName);
            Game.spawns[Game.spawns[i].name].spawnCreep(TRANSFERERS_BODY[Game.spawns[i].name], newName, {memory: {role: Game.spawns[i].name+'Transferer'}});
        }

        var megaTransferer = _.filter(Game.creeps, (creep) => creep.memory.role == Game.spawns[i].name+'MegaTransferer');
        if(megaTransferer.length < MEGA_TRANSFERERS_DESIRED[Game.spawns[i].name]) {
            var newName = Game.spawns[i].name+'MegaTransfer' + Game.time;
            console.log('Spawning new '+Game.spawns[i].name+'MegaTransferer: ' + newName);
            Game.spawns[Game.spawns[i].name].spawnCreep(MEGA_TRANSFERERS_BODY[Game.spawns[i].name], newName, {memory: {role: Game.spawns[i].name+'MegaTransferer'}});
        }

    }

    var remoteBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteBuilder');
    if(remoteBuilders.length < 0) {
        var newName = 'Remote Builder' + Game.time;
        console.log('Spawning new remote builder: ' + newName);
        Game.spawns['Markopolis'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'remoteBuilder'}});
    }
    
    if(Game.spawns['Markopolis'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Markopolis'].spawning.name];
        Game.spawns['Markopolis'].room.visual.text(
            '...' + spawningCreep.memory.role,
            Game.spawns['Markopolis'].pos.x + 1, 
            Game.spawns['Markopolis'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    if(Game.spawns['Stevenopolis'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Stevenopolis'].spawning.name];
        Game.spawns['Stevenopolis'].room.visual.text(
            '...' + spawningCreep.memory.role,
            Game.spawns['Stevenopolis'].pos.x + 1, 
            Game.spawns['Stevenopolis'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    if(Game.spawns['Alanopolis'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Alanopolis'].spawning.name];
        Game.spawns['Alanopolis'].room.visual.text(
            '...' + spawningCreep.memory.role,
            Game.spawns['Alanopolis'].pos.x + 1, 
            Game.spawns['Alanopolis'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    if(Game.spawns['Thomasopolis'] && Game.spawns['Thomasopolis'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Thomasopolis'].spawning.name];
        Game.spawns['Thomasopolis'].room.visual.text(
            '...' + spawningCreep.memory.role,
            Game.spawns['Thomasopolis'].pos.x + 1, 
            Game.spawns['Thomasopolis'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    var ticksToLiveSt = 1500;
    var ticksToLiveMa = 1500;
    var ticksToLiveAl = 1500;
    var creepNameSt = '';
    var creepNameMa = '';
    var creepNameAl = '';

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'MarkopolisHarvester' || creep.memory.role == 'StevenopolisHarvester' || creep.memory.role == 'AlanopolisHarvester' || creep.memory.role == 'ThomasopolisHarvester') {
            if(creep.memory.role.toLowerCase().indexOf('steven') > -1){
                if(creep.ticksToLive < ticksToLiveSt){
                    ticksToLiveSt = creep.ticksToLive;
                    creepNameSt = creep.memory.role;
                }
            }else if(creep.memory.role.toLowerCase().indexOf('mark') > -1){
                if(creep.ticksToLive < ticksToLiveMa){
                    ticksToLiveMa = creep.ticksToLive;
                    creepNameMa = creep.memory.role;
                }
            }else if(creep.memory.role.toLowerCase().indexOf('alan') > -1){
                if(creep.ticksToLive < ticksToLiveAl){
                    ticksToLiveAl = creep.ticksToLive;
                    creepNameAl = creep.memory.role;
                }
            }
            roleHarvester.run(creep);
        }
        
        if(creep.memory.role == 'MarkopolisBuilder' || creep.memory.role == 'StevenopolisBuilder' || creep.memory.role == 'AlanopolisBuilder' || creep.memory.role == 'ThomasopolisBuilder') {
            if(creep.memory.role.toLowerCase().indexOf('steven') > -1){
                if(creep.ticksToLive < ticksToLiveSt){
                    ticksToLiveSt = creep.ticksToLive;
                    creepNameSt = creep.memory.role;
                }
            }else if(creep.memory.role.toLowerCase().indexOf('mark') > -1){
                if(creep.ticksToLive < ticksToLiveMa){
                    ticksToLiveMa = creep.ticksToLive;
                    creepNameMa = creep.memory.role;
                }
            }else if(creep.memory.role.toLowerCase().indexOf('alan') > -1){
                creep.say('B1');
                if(creep.ticksToLive < ticksToLiveAl){
                    ticksToLiveAl = creep.ticksToLive;
                    creepNameAl = creep.memory.role;
                }
            }
            roleBuilder.run(creep);
        }
        
        if(creep.memory.role == 'MarkopolisTransferer' || creep.memory.role == 'StevenopolisTransferer' || creep.memory.role == 'AlanopolisTransferer' || creep.memory.role == 'ThomasopolisTransferer') {
            if(creep.memory.role.toLowerCase().indexOf('steven') > -1){
                if(creep.ticksToLive < ticksToLiveSt){
                    ticksToLiveSt = creep.ticksToLive;
                    creepNameSt = creep.memory.role;
                }
            }else if(creep.memory.role.toLowerCase().indexOf('mark') > -1){
                if(creep.ticksToLive < ticksToLiveMa){
                    ticksToLiveMa = creep.ticksToLive;
                    creepNameMa = creep.memory.role;
                }
            }else if(creep.memory.role.toLowerCase().indexOf('alan') > -1){
                if(creep.ticksToLive < ticksToLiveAl){
                    ticksToLiveAl = creep.ticksToLive;
                    creepNameAl = creep.memory.role;
                }
            }
            roleTransferer.run(creep);
        }

        if(creep.memory.role == 'MarkopolisMegaTransferer' || creep.memory.role == 'StevenopolisMegaTransferer' || creep.memory.role == 'AlanopolisMegaTransferer' || creep.memory.role == 'ThomasopolisMegaTransferer') {
            if(creep.memory.role.toLowerCase().indexOf('steven') > -1){
                if(creep.ticksToLive < ticksToLiveSt){
                    ticksToLiveSt = creep.ticksToLive;
                    creepNameSt = creep.memory.role;
                }
            }else if(creep.memory.role.toLowerCase().indexOf('mark') > -1){
                if(creep.ticksToLive < ticksToLiveMa){
                    ticksToLiveMa = creep.ticksToLive;
                    creepNameMa = creep.memory.role;
                }
            }else if(creep.memory.role.toLowerCase().indexOf('alan') > -1){
                if(creep.ticksToLive < ticksToLiveAl){
                    ticksToLiveAl = creep.ticksToLive;
                    creepNameAl = creep.memory.role;
                }
            }
            roleMegaTransferer.run(creep);
        }

        if(creep.memory.role == 'MarkopolisRemoteHarvester' || creep.memory.role == 'StevenopolisRemoteHarvester') {
            if(creep.memory.role.toLowerCase().indexOf('steven') > -1){
                if(creep.ticksToLive < ticksToLiveSt){
                    ticksToLiveSt = creep.ticksToLive;
                    creepNameSt = creep.memory.role;
                }
            }else{
                if(creep.ticksToLive < ticksToLiveMa){
                    ticksToLiveMa = creep.ticksToLive;
                    creepNameMa = creep.memory.role;
                }
            }
            roleRemoteHarvester.run(creep);
        }
        if(creep.memory.role == 'MarkopolisMiner' || creep.memory.role == 'StevenopolisMiner') {
            if(creep.memory.role.toLowerCase().indexOf('steven') > -1){
                if(creep.ticksToLive < ticksToLiveSt){
                    ticksToLiveSt = creep.ticksToLive;
                    creepNameSt = creep.memory.role;
                }
            }else{
                if(creep.ticksToLive < ticksToLiveMa){
                    ticksToLiveMa = creep.ticksToLive;
                    creepNameMa = creep.memory.role;
                }
            }
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'MarkopolisDefender' || creep.memory.role == 'StevenopolisDefender' || creep.memory.role == 'AlanopolisDefender' || creep.memory.role == 'ThomasopolisDefender') {
            if(creep.memory.role.toLowerCase().indexOf('steven') > -1){
                if(creep.ticksToLive < ticksToLiveSt){
                    ticksToLiveSt = creep.ticksToLive;
                    creepNameSt = creep.memory.role;
                }
            }else if(creep.memory.role.toLowerCase().indexOf('mark') > -1){
                if(creep.ticksToLive < ticksToLiveMa){
                    ticksToLiveMa = creep.ticksToLive;
                    creepNameMa = creep.memory.role;
                }
            }else if(creep.memory.role.toLowerCase().indexOf('alan') > -1){
                if(creep.ticksToLive < ticksToLiveAl){
                    ticksToLiveAl = creep.ticksToLive;
                    creepNameAl = creep.memory.role;
                }
            }
            roleDefender.run(creep);
        }
        if(creep.memory.role == 'MarkopolisClaimer' || creep.memory.role == 'StevenopolisClaimer' || creep.memory.role == 'AlanopolisClaimer') {
            if(creep.memory.role.toLowerCase().indexOf('steven') > -1){
                if(creep.ticksToLive < ticksToLiveSt){
                    ticksToLiveSt = creep.ticksToLive;
                    creepNameSt = creep.memory.role;
                }
            }else if(creep.memory.role.toLowerCase().indexOf('mark') > -1){
                if(creep.ticksToLive < ticksToLiveMa){
                    ticksToLiveMa = creep.ticksToLive;
                    creepNameMa = creep.memory.role;
                }
            }else if(creep.memory.role.toLowerCase().indexOf('alan') > -1){
                if(creep.ticksToLive < ticksToLiveAl){
                    ticksToLiveAl = creep.ticksToLive;
                    creepNameAl = creep.memory.role;
                }
            }
            roleClaimer.run(creep);
        }
        if(creep.memory.role == 'remoteBuilder') {
            if(creep.ticksToLive < ticksToLiveMa){
                ticksToLiveMa = creep.ticksToLive;
                creepNameMa = 'remote builder';
            }
            if(creep.room.name != 'W43N1'){
                var posInAnotherRoom = new RoomPosition(26, 11, 'W43N1');
                creep.moveTo(posInAnotherRoom);
            }else{
                //if(!creep.memory.idle){
                    roleBuilder.run(creep);
                //}else{
                //    console.log('builder is idle, so harvesting...');
                //    roleHarvester.run(creep);
                //}
            }
        }
        if(creep.memory.role == 'MarkopolisUpgrader' || creep.memory.role == 'StevenopolisUpgrader' || creep.memory.role == 'AlanopolisUpgrader' || creep.memory.role == 'ThomasopolisUpgrader' ||
           creep.memory.role == 'MarkopolisMegaUpgrader' || creep.memory.role == 'StevenopolisMegaUpgrader' || creep.memory.role == 'AlanopolisMegaUpgrader') {
            if(creep.memory.role.toLowerCase().indexOf('steven') > -1){
                if(creep.ticksToLive < ticksToLiveSt){
                    ticksToLiveSt = creep.ticksToLive;
                    creepNameSt = creep.memory.role;
                }
            }else if(creep.memory.role.toLowerCase().indexOf('mark') > -1){
                if(creep.ticksToLive < ticksToLiveMa){
                    ticksToLiveMa = creep.ticksToLive;
                    creepNameMa = creep.memory.role;
                }
            }else if(creep.memory.role.toLowerCase().indexOf('alan') > -1){
                if(creep.ticksToLive < ticksToLiveAl){
                    ticksToLiveAl = creep.ticksToLive;
                    creepNameAl = creep.memory.role;
                }
            }
            if(creep.memory.role.toLowerCase().indexOf('mega') > -1){
                roleRemoteUpgrader.run(creep);
            } else {
                roleUpgrader.run(creep);
            }
        }
        if(creep.memory.role == 'MarkopolisRemoteUpgrader' || creep.memory.role == 'StevenopolisRemoteUpgrader') {
            if(creep.ticksToLive < ticksToLiveMa){
                ticksToLiveMa = creep.ticksToLive;
                creepNameMa = 'RemoteUpgrader';
            }
            if(creep.room.name != 'W44N1'){
                var posInAnotherRoom = new RoomPosition(26, 11, 'W43N1');
                creep.moveTo(posInAnotherRoom);
            }else{
                roleRemoteUpgrader.run(creep);
            }
        }
    }
    if(ticksToLiveMa>200){
        Memory.upgraders = 2;
    }else{
        Memory.upgraders = 1;
    }
    if(ticksToLiveSt>200){
        Memory.stevenUpgraders = 2;
    }else{
        Memory.stevenUpgraders = 1;
    }
    console.log('Ticks to live Markopolis  : ' + ticksToLiveMa + ', ' + creepNameMa);
    console.log('Ticks to live Stevenopolis: ' + ticksToLiveSt + ', ' + creepNameSt);
    console.log('Ticks to live Alanopolis  : ' + ticksToLiveAl + ', ' + creepNameAl);
    
    /**
    towers = Game.rooms['W43N2'].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    if(Game.rooms['W43N2'].controller.level==5 && towers.length < 2){
        Game.spawns['Stevenopolis'].room.createConstructionSite( 33, 27, STRUCTURE_TOWER );
        Game.notify('Building new tower');
    }
    **/
    towers = Game.rooms['W43N1'].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    if(Game.rooms['W43N1'].controller.level==5 && towers.length == 2){
        Game.spawns['Alanopolis'].room.createConstructionSite( 26, 25, STRUCTURE_LINK );
        Game.spawns['Alanopolis'].room.createConstructionSite( 10, 18, STRUCTURE_LINK );
    }
    
    let extensions = Game.rooms['W43N1'].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}});
    let containers = Game.rooms['W43N1'].find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_STORAGE}});
    if( Game.rooms['W43N1'].controller.level==4 && extensions.length > 105 ){
        Game.spawns['Alanopolis'].room.createConstructionSite( 17, 16, STRUCTURE_EXTENSION );
        Game.notify('Building new extension 12');
        Game.spawns['Alanopolis'].room.createConstructionSite( 17, 17, STRUCTURE_EXTENSION );
        Game.notify('Building new extension 13');
        Game.spawns['Alanopolis'].room.createConstructionSite( 12, 16, STRUCTURE_EXTENSION );
        Game.notify('Building new extension 14');
        Game.spawns['Alanopolis'].room.createConstructionSite( 15, 13, STRUCTURE_EXTENSION );
        Game.notify('Building new extension 15');
    } else if ( Game.rooms['W43N1'].controller.level == 4 && containers.length < 1 ) {
        //Game.spawns['Alanopolis'].room.createConstructionSite( 11, 18, STRUCTURE_STORAGE );
        //Game.notify('Building new storage');
    } else if ( Game.rooms['W43N1'].controller.level == 4 && containers.length == 1 ) {
        //Game.spawns['Alanopolis'].room.createConstructionSite( 18, 14, STRUCTURE_EXTENSION );
        //Game.notify('Building new extension 11');
    }

    if (Game.rooms['W43N3'].find(FIND_MY_CREEPS).length < 3) {
        var newName = 'MarkopolisTransfer' + Game.time;
        Game.spawns['Markopolis'].spawnCreep(EMERGENCY_TRANSFERERS_BODY['Markopolis'], newName, {memory: {role: 'MarkopolisTransferer'}});
        Game.notify('Something is rotten in Markopolis');
    } else if (Game.rooms['W43N2'].find(FIND_MY_CREEPS).length < 3) {
        var newName = 'StevenopolisTransfer' + Game.time;
        Game.spawns['Stevenopolis'].spawnCreep(EMERGENCY_TRANSFERERS_BODY['Stevenopolis'], newName, {memory: {role: 'StevenopolisTransferer'}});
        Game.notify('Something is rotten in Stevenopolis');
    } else if (Game.rooms['W43N1'].find(FIND_MY_CREEPS).length < 3) {
        var newName = 'AlanopolisTransfer' + Game.time;
        Game.spawns['Alanopolis'].spawnCreep(EMERGENCY_TRANSFERERS_BODY['Alanopolis'], newName, {memory: {role: 'AlanopolisTransferer'}});
        Game.notify('Something is rotten in Alanopolis');
    }
}
