Game.spawns['Markopolis'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1' );
Game.spawns['Markopolis'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester2' );



Game.spawns['Markopolis'].spawnCreep( [WORK, CARRY, MOVE], 'Upgrader1' );



Game.creeps['Harvester1'].memory.role = 'harvester';
Game.creeps['Harvester2'].memory.role = 'harvester';
Game.creeps['Upgrader1'].memory.role = 'upgrader';



Game.spawns['Markopolis'].spawnCreep( [WORK, CARRY, MOVE], 'Builder3',
{ memory: { role: 'builder' } } );


Game.spawns['Markopolis'].spawnCreep( [WORK, CARRY, MOVE], 'Upgrader2',
{ memory: { role: 'upgrader' } } );



Game.spawns['Markopolis'].spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],
    'HarvesterBig',
    { memory: { role: 'harvester' } } );

Game.spawns['Markopolis'].spawnCreep( [WORK,WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE], 'UpgraderBig', { memory: { role: 'upgrader' } } );
    

Game.spawns['Markopolis'].spawnCreep([WORK,CARRY,CARRY,MOVE], newName, {memory: {role: 'transfer'}});


Game.creeps['Harvester1'].suicide()



Game.spawns['Markopolis'].room.controller.activateSafeMode();



Game.spawns['Markopolis'].room.createConstructionSite( 20, 20, STRUCTURE_TOWER );



Game.spawns['Markopolis'].room.createConstructionSite( 24, 31, STRUCTURE_WALL );



Game.spawns['Markopolis'].room.createConstructionSite( 20, 41, STRUCTURE_EXTENSION );



Game.spawns['Markopolis'].room.createConstructionSite( 29, 39, STRUCTURE_STORAGE );



Game.spawns['Markopolis'].room.createConstructionSite( 29, 39, STRUCTURE_LINK );



var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;






var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    var tower = Game.getObjectById('5a459bf723e4857334f9fa2f');
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}






var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

    var tower = Game.getObjectById('5626e31889d5a7d2f6a99ccf');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}




var theStorage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
    filter: (structure) => {
        return (structure.structureType == STRUCTURE_STORAGE );
    }
});

if ( creep.transfer( theStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    creep.moveTo( theStorage );
}
