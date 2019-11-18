var roleUpgrader = require('role.upgrader');

var roleBuilder = {
    /** @param {Creep} creep **/
    run: function (creep) {
        creep.memory.idle = false;
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvest');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('build');
        }
        let room = creep.room.name;
        /**
        if (room == 'W43N3') {
            creep.say('Remote B');
            var posInAnotherRoom = new RoomPosition(17, 27, 'W44N3');
            creep.moveTo(posInAnotherRoom, {visualizePathStyle: {stroke: '#ffffff'}});
        } else 
        **/
        {
            creep.say('B');
            if(room == 'W44N2'){
                console.log('build ' + room + ' ' + creep.memory.building);

            }

            if (creep.memory.building) {
                var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if (target) {
                    if (creep.build(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#cc2222' } });
                    }
                } else {
                    var roads = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: function (object) {
                            return (object.structureType === STRUCTURE_ROAD && (object.hits < object.hitsMax)) ||
                                (object.structureType === STRUCTURE_CONTAINER && (object.hits < object.hitsMax)) ||
                                (object.structureType == STRUCTURE_WALL && (object.hits < object.hitsMax - WALL_BUILDER_STRENGTH[creep.room.name])) ||
                                (object.structureType == STRUCTURE_RAMPART && (object.hits < object.hitsMax - RAMPART_STRENGTH[creep.room.name]))
                        }
                    });
                    if (roads) {
                        if (creep.repair(roads) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(roads, { visualizePathStyle: { stroke: '#cc2222' } });
                        }
                    } else {
                        creep.say('Idle');
                        creep.memory.idle = true;
                        if (room==='W41.S7' && Game.getObjectById('5982fc38b097071b4adbd086').level === 5) {
                            Game.spawns['Camillaopolis'].room.createConstructionSite( 17, 22, STRUCTURE_TOWER );
                        }
                    }
                }
            }
            else {
                /**
                var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                    filter: (d) => { return (d.resourceType == RESOURCE_ENERGY) }
                });
                if (dropenergy) {
                    creep.say('Dropped');
                    if (creep.pickup(dropenergy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropenergy, { visualizePathStyle: { stroke: '#ffffff' } })
                    }
                } else 
                **/
                {
                    
                    if (room == 'W41.S7') {
                        const preferredSource = Game.getObjectById('5982fc38b097071b4adbd084');
                        if (creep.harvest(preferredSource) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(preferredSource, { visualizePathStyle: { stroke: '#ffaa00' } });
                        }
                    } else 
                    {

                        const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
                        }

                        const link = Game.getObjectById('5bb104c029a30b678e119539');
                        var theStorage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return ((structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > 300) ||
                                    (structure.structureType == STRUCTURE_LINK && structure.energy > 300 && creep.pos.findPathTo(link).length < 5) ||
                                    (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 100));
                            }
                        });

                        if (creep.withdraw(theStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(theStorage);
                        }
                    }
                }
                //}
            }
        }
    }
};
module.exports = roleBuilder;