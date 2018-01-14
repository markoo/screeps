var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleRemoteUpgrader = require('role.remoteUpgrader');
var roleBuilder = require('role.builder');
var roleRemoteBuilder = require('role.remoteBuilder');
var roleTransfer = require('role.transfer');
var roleDefender = require('role.defender');
require('./constants');

module.exports.loop = function () {

    var links = Game.rooms['W43N3'].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
    if(links[1].energy == links[1].energyCapacity && links[0].energy == 0){
        links[1].transferEnergy(links[0]);
    }
    links = Game.rooms['W43N2'].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
    if(links[0].energy == links[0].energyCapacity && links[1].energy == 0){
        links[0].transferEnergy(links[1]);
    }

    var towers = Game.rooms['W43N3'].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    for(var id in towers) {
        var closestDamagedStructure = towers[id].pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < (structure.hitsMax - WALL_STRENGTH['Markopolis'])
        });
        if(closestDamagedStructure) {
            towers[id].repair(closestDamagedStructure);
        }
        var closestHostile = towers[id].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            towers[id].attack(closestHostile);
            Game.notify('Attacked by hostile in Markopolis: ', closestHostile);
        }
    }

    towers = Game.rooms['W43N2'].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    for(var id in towers) {
        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender' && creep.hits < creep.hitsMax);
        if(defenders[0]) {
            towers[id].heal(defenders[0]);
        }

        var closestDamagedStructure = towers[id].pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < (structure.hitsMax - WALL_STRENGTH['Stevenopolis'])
        });
        if(closestDamagedStructure) {
            towers[id].repair(closestDamagedStructure);
        }

        var closestHostile = towers[id].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            towers[id].attack(closestHostile);
            Game.notify('Attacked by hostile in Stevenopolis: ', closestHostile);
        }
    }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    for(const i in Game.spawns) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == Game.spawns[i].name+'Harvester');
        if(harvesters.length < HARVESTERS_DESIRED[Game.spawns[i].name]) {
            var newName = Game.spawns[i].name+'Harvester' + Game.time;
            console.log('Spawning new '+Game.spawns[i].name+' Harvester: ' + newName);
            Game.spawns[Game.spawns[i].name].spawnCreep(HARVESTERS_BODY[Game.spawns[i].name], newName, {memory: {role: Game.spawns[i].name+'Harvester'}});
        }

        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == Game.spawns[i].name+'Upgrader');
        if(upgraders.length < UPGRADERS_DESIRED[Game.spawns[i].name]) {
            var newName = Game.spawns[i].name+'Upgrader' + Game.time;
            console.log('Spawning new '+Game.spawns[i].name+' Upgrader: ' + newName);
            Game.spawns[Game.spawns[i].name].spawnCreep(UPGRADERS_BODY[Game.spawns[i].name], newName, {memory: {role: Game.spawns[i].name+'Upgrader'}});
        }

        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == Game.spawns[i].name+'Defender');
        if(defenders.length < DEFENDERS_DESIRED[Game.spawns[i].name]) {
            var newName = Game.spawns[i].name+'Defender' + Game.time;
            console.log('Spawning new '+Game.spawns[i].name+'Defender: ' + newName);
            // Attacker/Defender
            Game.spawns[Game.spawns[i].name].spawnCreep(DEFENDERS_BODY[Game.spawns[i].name], newName, {memory: {role: Game.spawns[i].name+'Defender'}});
            // Claimer
            //Game.spawns['Markopolis'].spawnCreep([CLAIM,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'defender'}});
        }
    }

    var remoteUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteUpgrader');
    if(remoteUpgraders.length < 0) {
        var newName = 'RemoteUpgrader' + Game.time;
        console.log('Spawning new remote upgrader: ' + newName);
        Game.spawns['Markopolis'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'remoteUpgrader'}});
    }
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if(builders.length < 1) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Markopolis'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'builder'}});
    }
    
    var stevenBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'stevenBuilder');
    if(stevenBuilders.length < 1) {
        var newName = 'StevenBuilder' + Game.time;
        console.log('Spawning new steven builder: ' + newName);
        Game.spawns['Stevenopolis'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'stevenBuilder'}});
    }
    
    var remoteBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'remoteBuilder');
    if(remoteBuilders.length < 0) {
        var newName = 'Remote Builder' + Game.time;
        console.log('Spawning new remote builder: ' + newName);
        Game.spawns['Markopolis'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'remoteBuilder'}});
    }
    
    var transfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'transfer');
    if(transfers.length < 1) {
        var newName = 'Transfer' + Game.time;
        console.log('Spawning new transfer: ' + newName);
        Game.spawns['Markopolis'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'transfer'}});
    }
    
    
    var stevenTransfers = _.filter(Game.creeps, (creep) => creep.memory.role == 'stevenTransfer');
    if(stevenTransfers.length < 1) {
        var newName = 'StevenTransfer' + Game.time;
        console.log('Spawning new steven transfer: ' + newName);
        Game.spawns['Stevenopolis'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'stevenTransfer'}});
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

    var ticksToLiveSt = 1000;
    var ticksToLiveMa = 1000;
    var creepNameSt = '';
    var creepNameMa = '';

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester' || creep.memory.role == 'Markopolisharvester' || creep.memory.role == 'MarkopolisHarvester' || creep.memory.role == 'stevenHarvester'|| creep.memory.role == 'remoteHarvester' || creep.memory.role == 'Stevenopolisharvester' || creep.memory.role == 'StevenopolisHarvester') {
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
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'defender' || creep.memory.role == 'MarkopolisDefender' || creep.memory.role == 'StevenopolisDefender') {
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
            roleDefender.run(creep);
        }
        if(creep.memory.role == 'builder') {
            if(creep.ticksToLive < ticksToLiveMa){
                ticksToLiveMa = creep.ticksToLive;
                creepNameMa = 'builder';
            }
            //roleTransfer.run(creep);
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'stevenBuilder') {
            if(creep.ticksToLive < ticksToLiveSt){
                ticksToLiveSt = creep.ticksToLive;
                creepNameSt = 'steven builder';
            }
            //roleHarvester.run(creep);
            roleBuilder.run(creep);
            //roleRemoteBuilder.run(creep);
        }
        if(creep.memory.role == 'remoteBuilder') {
            if(creep.ticksToLive < ticksToLiveMa){
                ticksToLiveMa = creep.ticksToLive;
                creepNameMa = 'remote builder';
            }
            if(creep.room.name != 'W43N2'){
                var posInAnotherRoom = new RoomPosition(26, 11, 'W43N2');
                creep.moveTo(posInAnotherRoom);
            }else{
                roleRemoteBuilder.run(creep);
            }
        }
        if(creep.memory.role == 'upgrader' || creep.memory.role == 'stevenUpgrader' || creep.memory.role == 'MarkopolisUpgrader' || creep.memory.role == 'StevenopolisUpgrader' ) {
            if(creep.memory.role.toLowerCase().indexOf('steven') > -1){
                if(creep.ticksToLive < ticksToLiveSt){
                    ticksToLiveSt = creep.ticksToLive;
                    creepNameSt = creep.memory.role;
                }
                    roleRemoteUpgrader.run(creep);
            }else{
                if(creep.ticksToLive < ticksToLiveMa){
                    ticksToLiveMa = creep.ticksToLive;
                    creepNameMa = creep.memory.role;
                }
                    roleUpgrader.run(creep);
            }
        }
        if(creep.memory.role == 'remoteUpgrader') {
            if(creep.ticksToLive < ticksToLiveMa){
                ticksToLiveMa = creep.ticksToLive;
                creepNameMa = 'remoteUpgrader';
            }
            if(creep.room.name != 'W43N2'){
                var posInAnotherRoom = new RoomPosition(26, 11, 'W43N2');
                creep.moveTo(posInAnotherRoom);
            }else{
                roleRemoteUpgrader.run(creep);
            }
        }
        if(creep.memory.role == 'transfer') {
            if(creep.ticksToLive < ticksToLiveMa){
                ticksToLiveMa = creep.ticksToLive;
                creepNameMa = 'transfer';
            }
            roleTransfer.run(creep);
        }
        if(creep.memory.role == 'stevenTransfer') {
            if(creep.ticksToLive < ticksToLiveSt){
                ticksToLiveSt = creep.ticksToLive;
                creepNameSt = 'steven transfer';
            }
            //roleTransfer.run(creep);
            roleTransfer.run(creep);
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

    towers = Game.rooms['W43N2'].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    if(Game.rooms['W43N2'].controller.level==5 && towers.length < 2){
        Game.spawns['Stevenopolis'].room.createConstructionSite( 33, 27, STRUCTURE_TOWER );
        Game.notify('Building new tower');
    }

}
