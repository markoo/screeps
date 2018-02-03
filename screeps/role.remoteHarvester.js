var roleRemoteHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.transfering && creep.carry.energy == 0) {
            creep.memory.transfering = false;
        }
        if (!creep.memory.transfering && creep.carry.energy == creep.carryCapacity) {
            creep.memory.transfering = true;
        }
        let room = creep.room.name;
        if(room!=='W43N2'){
            var posInAnotherRoom = new RoomPosition(26, 11, 'W43N2');
            creep.moveTo(posInAnotherRoom);
        }else{
            if (!creep.memory.transfering) {
                const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
                if (source) {
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source);
                    }
                }
            }
            else {
                var theStorage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity);
                    }
                });
                if (creep.transfer(theStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    console.log('3');
                    creep.moveTo(theStorage);
                }
                if(!theStorage){
                    theStorage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_STORAGE);
                    }
                });

                if (creep.transfer(theStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(theStorage, { visualizePathStyle: { stroke: '#ffffff' } });
                }

                }
            }
        }
    }
};

module.exports = roleRemoteHarvester;