var roleRemoteUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
        }
        let room = creep.room.name;
        if (room == 'W43N2' || room == 'W44N2' && creep.memory.upgrading) {
            const posInAnotherRoom = new RoomPosition(5, 36, 'W44N2');
            creep.moveTo(posInAnotherRoom);
        } else if (room === 'W44.N2') {

            creep.memory.idle = false;
            if (creep.memory.building && creep.carry.energy == 0) {
                creep.memory.building = false;
                creep.say('harvest');
            }
            if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
                creep.memory.building = true;
                creep.say('build');
            }
            {
                creep.say('B');

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
                                    (object.structureType == STRUCTURE_WALL && (object.hits < object.hitsMax - WALL_BUILDER_STRENGTH[creep.room.name]))
                            }
                        });
                        if (roads) {
                            if (creep.repair(roads) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(roads, { visualizePathStyle: { stroke: '#cc2222' } });
                            }
                        } else {
                            creep.say('Idle');
                            creep.memory.idle = true;
                        }
                    }
                }
                else {
                    {
                        const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
                        }

                        let link = Game.getObjectById('5bb104c029a30b678e119539');
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
                    //}
                }
            }
        }


        else {
            if (creep.memory.upgrading) {
                creep.say('upgrade!!!');
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            else {
                const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                            var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                filter: (d) => { return (d.resourceType == RESOURCE_ENERGY) }
            });
            if (dropenergy) {
                creep.say('Dropped');
                if (creep.pickup(dropenergy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropenergy, { visualizePathStyle: { stroke: '#ffffff' } })
                }
            } else if (source) {
                    creep.say('source???');
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                } else {
                    var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return ((structure.structureType == STRUCTURE_LINK && structure.energy > 0) ||
                                (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0));
                        }
                    });
                    if (target) {
                        if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    } else {
                        var theStorage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_STORAGE);
                            }
                        });

                        if (creep.withdraw(theStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(theStorage);
                        }

                    }
                }
            }
        }
    }
};

module.exports = roleRemoteUpgrader;
