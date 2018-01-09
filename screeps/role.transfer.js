var roleTransfer = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.transfering && creep.carry.energy == 0) {
            creep.memory.transfering = false;
        }
        if(!creep.memory.transfering && creep.carry.energy == creep.carryCapacity) {
            creep.memory.transfering = true;
        }
    
        if(creep.memory.transfering) {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_TOWER || structure.id == '5a4bc9cd5205d31f94eff4a0') &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            var theStorage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE );
                }
            });
            
            if ( creep.withdraw(theStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo( theStorage );
            }
        }
    }
};

module.exports = roleTransfer;
