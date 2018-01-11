var roleTransfer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.transfering && creep.carry.energy == 0) {
            creep.memory.transfering = false;
        }
        if (!creep.memory.transfering && creep.carry.energy == creep.carryCapacity) {
            creep.memory.transfering = true;
        }
        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_LINK) &&
                    structure.energy < structure.energyCapacity;
            }
        });

        if (creep.memory.transfering) {
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
        else {
            if (target) {
                var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});
                if (dropenergy) {
                if (creep.pickup(dropenergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropenergy)
                }
                }else{
                    var theStorage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_STORAGE);
                        }
                    });
    
                    if (creep.withdraw(theStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(theStorage);
                    }
                }
            } else {
                                var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});
                if (dropenergy) {
                if (creep.pickup(dropenergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropenergy)
                }
                }else{

                const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                if (source) {
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
                }
            }
        }
    }
};

module.exports = roleTransfer;
