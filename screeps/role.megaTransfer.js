var roleMegaTransfer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.transfering && creep.carry.energy == 0) {
            creep.memory.transfering = false;
        }
        if (!creep.memory.transfering && creep.carry.energy == creep.carryCapacity) {
            creep.memory.transfering = true;
        }
        if (creep.memory.transfering) {
            if (creep.room.name != 'W44N3') {
                var posInAnotherRoom = new RoomPosition(14, 14, 'W44N3');
                creep.moveTo(posInAnotherRoom);
            } else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
        else {
            if (creep.room.name != 'W43N3' && creep.memory.role == 'MarkopolisMegaTransferer') {
                var posInAnotherRoom = new RoomPosition(29, 39, 'W43N3');
                creep.moveTo(posInAnotherRoom);
            } else if (creep.room.name != 'W43N2' && creep.memory.role == 'StevenopolisMegaTransferer') {
                var posInAnotherRoom = new RoomPosition(25, 8, 'W43N2');
                creep.moveTo(posInAnotherRoom);
            } else {
                var theStorage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_STORAGE) && structure.store[RESOURCE_ENERGY] > 500000);
                    }
                });
                if (creep.withdraw(theStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(theStorage, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};

module.exports = roleMegaTransfer;
