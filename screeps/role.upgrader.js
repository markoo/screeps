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
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[1]);
        }
        if(!sources[1].energy){
            var theStorage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (structure.id == '5a4a4f5561a2956b4526d967' || structure.structureType == STRUCTURE_STORAGE);
                }
            });
            
            if (creep.withdraw(theStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo( theStorage );
            }

        }
    }
    }
};

module.exports = roleUpgrader;
