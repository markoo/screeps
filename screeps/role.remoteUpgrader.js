var roleRemoteUpgrader = {
    
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
        var theStorage = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER);
            }
        });
        if(theStorage[2].store[RESOURCE_ENERGY] > 0 || theStorage[4].store[RESOURCE_ENERGY] > 0){
            if(theStorage[2].store[RESOURCE_ENERGY] > 0){
                if (creep.withdraw( theStorage[2], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo( theStorage[2] );
                }
            }
            if(theStorage[4].store[RESOURCE_ENERGY] > 0){
                if (creep.withdraw( theStorage[4], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo( theStorage[4] );
                }
            }
        }else{
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        }
    }
    }
};

module.exports = roleRemoteUpgrader;
