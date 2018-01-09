var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleRemoteUpgrader = require('role.remoteUpgrader');
var roleBuilder = require('role.builder');
var roleRemoteBuilder = require('role.remoteBuilder');
var roleTransfer = require('role.transfer');
var roleDefender = require('role.defender');

module.exports.loop = function () {

    var link1 = Game.getObjectById('5a4bc9cd5205d31f94eff4a0');
    var link2 = Game.getObjectById('5a4a4f5561a2956b4526d967');
    if(link1.energy == link1.energyCapacity && link2.energy == 0){
        link1.transferEnergy(link2);
    }

    var tower = Game.getObjectById('5a459bf723e4857334f9fa2f');
    var tower2 = Game.getObjectById('5a4a90ae1ecdb2318ade003a');
    var tower3 = Game.getObjectById('5a50f5995a6691658f702230');
    const wallEnergy = 299880000;

    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < (structure.hitsMax - wallEnergy)
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
            Game.notify('Attacked by hostile in Markopolis: ', closestHostile);
        }
    }

    if(tower2) {
        var closestDamagedStructure = tower2.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < (structure.hitsMax - wallEnergy)
        });
        if(closestDamagedStructure) {
            tower2.repair(closestDamagedStructure);
        }

        var closestHostile = tower2.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower2.attack(closestHostile);
            Game.notify('Attacked by hostile in Markopolis: ', closestHostile);
        }
    }

    if(tower3) {
        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
        if(defenders[0]) {
            //tower3.heal(defenders[0]);
        }

        var closestDamagedStructure = tower3.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < (structure.hitsMax - 299968000)
        });
        if(closestDamagedStructure) {
            tower3.repair(closestDamagedStructure);
        }

        var closestHostile = tower3.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
        console.log('hostile: ', tower.attack(closestHostile));
            tower.attack(closestHostile);
            Game.notify('Attacked by hostile in Stevenopolis: ', closestHostile);
        }
    }


    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if(harvesters.length < 1) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Markopolis'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'harvester'}});
    }
    
    var remoteHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'stevenHarvester');
    if(remoteHarvesters.length < 3) {
        var newName = 'StevenHarvester' + Game.time;
        console.log('Spawning new steven harvester: ' + newName);
        Game.spawns['Stevenopolis'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'stevenHarvester'}});
    }
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if(upgraders.length < Memory.upgraders) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Markopolis'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'upgrader'}});
    }
    
    var stevenUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'stevenUpgrader');
    if(stevenUpgraders.length < 2) {
        var newName = 'StevenUpgrader' + Game.time;
        console.log('Spawning new steven upgrader: ' + newName);
        Game.spawns['Stevenopolis'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'stevenUpgrader'}});
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
        Game.spawns['Stevenopolis'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'stevenBuilder'}});
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
        Game.spawns['Stevenopolis'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'stevenTransfer'}});
    }
    
    
    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');

    if(defenders.length < 2) {
        var newName = 'Defender' + Game.time;
        console.log('Spawning new defender: ' + newName);
        // Attacker/Defender
        Game.spawns['Markopolis'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'defender'}});
        // Claimer
        //Game.spawns['Markopolis'].spawnCreep([CLAIM,CLAIM,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, {memory: {role: 'defender'}});
    }
    
    
    if(Game.spawns['Markopolis'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Markopolis'].spawning.name];
        Game.spawns['Markopolis'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Markopolis'].pos.x + 1, 
            Game.spawns['Markopolis'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    var ticksToLive = 1500;
    var creepName = '';
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            if(creep.ticksToLive < ticksToLive){
                ticksToLive = creep.ticksToLive;
                creepName = 'harvester';
            }
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'stevenHarvester'|| creep.memory.role == 'remoteHarvester') {
            if(creep.ticksToLive < ticksToLive){
                ticksToLive = creep.ticksToLive;
                creepName = 'steven harvester';
            }
            roleHarvester.run(creep);
            //roleUpgrader.run(creep);
            //roleRemoteBuilder.run(creep);
        }
        if(creep.memory.role == 'builder') {
            if(creep.ticksToLive < ticksToLive){
                ticksToLive = creep.ticksToLive;
                creepName = 'builder';
            }
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'stevenBuilder') {
            if(creep.ticksToLive < ticksToLive){
                ticksToLive = creep.ticksToLive;
                creepName = 'steven builder';
            }
            //roleHarvester.run(creep);
            roleBuilder.run(creep);
            //roleRemoteBuilder.run(creep);
        }
        if(creep.memory.role == 'remoteBuilder') {
            if(creep.ticksToLive < ticksToLive){
                ticksToLive = creep.ticksToLive;
                creepName = 'remote builder';
            }
            if(creep.room.name != 'W43N2'){
                var posInAnotherRoom = new RoomPosition(26, 11, 'W43N2');
                creep.moveTo(posInAnotherRoom);
            }else{
                roleRemoteBuilder.run(creep);
            }
        }
        if(creep.memory.role == 'upgrader') {
            if(creep.ticksToLive < ticksToLive){
                ticksToLive = creep.ticksToLive;
                creepName = 'upgrader';
            }
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'stevenUpgrader') {
            if(creep.ticksToLive < ticksToLive){
                ticksToLive = creep.ticksToLive;
                creepName = 'steven upgrader';
            }
            //roleHarvester.run(creep);
            roleRemoteUpgrader.run(creep);
        }
        if(creep.memory.role == 'remoteUpgrader') {
            if(creep.ticksToLive < ticksToLive){
                ticksToLive = creep.ticksToLive;
                creepName = 'remoteUpgrader';
            }
            if(creep.room.name != 'W43N2'){
                var posInAnotherRoom = new RoomPosition(26, 11, 'W43N2');
                creep.moveTo(posInAnotherRoom);
            }else{
                roleRemoteUpgrader.run(creep);
            }
        }
        if(creep.memory.role == 'transfer') {
            if(creep.ticksToLive < ticksToLive){
                ticksToLive = creep.ticksToLive;
                creepName = 'transfer';
            }
            roleTransfer.run(creep);
        }
        if(creep.memory.role == 'stevenTransfer') {
            if(creep.ticksToLive < ticksToLive){
                ticksToLive = creep.ticksToLive;
                creepName = 'steven transfer';
            }
            //roleTransfer.run(creep);
            roleTransfer.run(creep);
        }
        if(creep.memory.role == 'defender') {
            if(creep.ticksToLive < ticksToLive){
                ticksToLive = creep.ticksToLive;
                creepName = 'defender';
            }
            //creep.moveTo(26,32);
            
            var posInAnotherRoom = new RoomPosition(21, 27, 'W43N2');
            creep.moveTo(posInAnotherRoom);

            roleDefender.run(creep);
        }
    }
    if(ticksToLive>300){
        Memory.upgraders = 1;
    }else{
        Memory.upgraders = 1;
    }
    console.log('ticksToLive: ' + ticksToLive + ', ' + creepName);
}
