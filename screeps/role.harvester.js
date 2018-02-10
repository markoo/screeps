var roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.transfering && creep.carry.energy == 0) {
            creep.memory.transfering = false;
        }
        if (!creep.memory.transfering && creep.carry.energy == creep.carryCapacity) {
            creep.memory.transfering = true;
        }
        if (!creep.memory.transfering) {
            let room = creep.room.name;
            if (room == 'W43N1') {
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'AlanopolisHarvester');
                var sources = creep.room.find(FIND_SOURCES);
                var key = 0;
                _.forEach(harvesters, function (harvester) {
                    harvester.say('H'+ key);
                    if (harvester.harvest(sources[key]) == ERR_NOT_IN_RANGE) {
                        harvester.moveTo(sources[key]);
                    }
                    key = key + 1;
                });
                var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                    filter: (d) => { return (d.resourceType == RESOURCE_ENERGY) }
                });
                if (dropenergy && harvesters[0].pos.findPathTo(dropenergy).length<2) {
                    if (harvesters[0].pickup(dropenergy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(dropenergy, { visualizePathStyle: { stroke: '#ffffff' } })
                    }
                }
            } else {
                const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                if (source) {
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
            }
        }
        else {
            let link = Game.getObjectById('5a750dd26950211c7f075e9e');
            if (creep.room.name == 'W43N1' && creep.pos.findPathTo(link).length < 7) {
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'AlanopolisHarvester');
                if (harvesters[0].transfer(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    harvesters[0].moveTo(link);
                }
            } else {
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_TOWER) &&
                            structure.energy < structure.energyCapacity);
                    }
                });
                if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                } else {
                    var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return ((structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] < structure.storeCapacity));
                        }
                    });
                    if (target) {
                        if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    } else {
                        var theStorage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_STORAGE);
                            }
                        });
                        if (creep.transfer(theStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(theStorage);
                        }
                    }
                }
            }
        }
    }
};
module.exports = roleHarvester;