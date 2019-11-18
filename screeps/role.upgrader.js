var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
        }

        if (creep.memory.upgrading) {
            if (creep.room.name == 'W41.S7') {
                if (creep.room.controller) {
                    if (creep.signController(creep.room.controller, "I am number 9!") == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                }
            } else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        } else {
            if (creep.room.name == 'W44N2') {
                const preferredSource = Game.getObjectById('5982fc13b097071b4adbcc39');
                if (creep.harvest(preferredSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(preferredSource, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else 
            {
                var theStorage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (((structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 300) ||
                            (structure.structureType == STRUCTURE_LINK && structure.energy > 100));
                    }
                });
                if (creep.withdraw(theStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(theStorage);
                }
                if (!theStorage) {
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

module.exports = roleUpgrader;
