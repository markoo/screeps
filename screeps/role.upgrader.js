var roleUpgrader = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
    if(creep.memory.upgrading && creep.carry.energy == 0) {
        creep.memory.upgrading = false;
    }
    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
        creep.memory.upgrading = true;
    }

    if(creep.memory.upgrading) {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
    else {
        var theStorage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return ( (structure.structureType == STRUCTURE_LINK && structure.energy > 100)  || 
                        ((structure.structureType == STRUCTURE_STORAGE || structure.structureType == STRUCTURE_CONTAINER) && structure.store[RESOURCE_ENERGY] > 300 ));
            }
        });
        if (creep.withdraw(theStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo( theStorage );
        }
    }
    }
};

module.exports = roleUpgrader;
